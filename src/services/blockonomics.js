const Bluebird = require("bluebird");
const post = Bluebird.promisify(require("request").post);
const bs58check = require('bs58check')

const decimals = 8;
const multiplier = Math.pow(10, decimals);

// See: https://www.blockonomics.co/views/segwit_xpub_convert.html
function xpubSegwitConverter(xpub, generate = 'ypub') {
    function hexToBytes(hex) {
		for (var bytes = [], c = 0; c < hex.length; c += 2)
			bytes.push(parseInt(hex.substr(c, 2), 16));
		return new Uint8Array(bytes);
    }
    if (!xpub.startsWith("xpub"))  {
      throw error("Incorrect xpub");
    }
    xpub_bin = bs58check.decode(xpub);
    if (generate == 'ypub'){
      prefix = "049d7cb2";
    } else if (generate == 'zpub'){
      prefix = "04b24746";
    }
    prefix_bin = hexToBytes(prefix);
    xpub_bin.set(prefix_bin, 0)
    return bs58check.encode(xpub_bin);
}

const blockonomics = module.exports = {
    supported_address: [ "BTC" ],

    check(addr) {
        return RegExp('^[xy]pub[a-km-zA-HJ-NP-Z0-9]{107}$').test(addr);
    },
    
    symbol() {
        return "BTC";
    },

    fetch(addr) {
        const url = `https://www.blockonomics.co/api/balance`;

        return post(url, { json: true, body: { addr } })
        .timeout(5000)
        .cancellable()
        .spread(function(resp, body) {
            if (resp.statusCode < 200 || resp.statusCode >= 300) throw new Error(JSON.stringify(resp));

            const balance = body.response.reduce((agg, x) => parseInt(x.confirmed) + agg, 0) / multiplier;

            // try converting xpub segwit to ypub
            if (balance == 0 && addr[0] == "x") {
                return blockonomics.fetch(xpubSegwitConverter(addr));
            }
            
            return {
                quantity: balance,
                asset: "BTC"
            };
        });
    }
};