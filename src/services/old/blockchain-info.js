const Bluebird = require("bluebird");
const req = Bluebird.promisify(require("request"));

module.exports = {
    supported_address: [ "BTC" ],

    check(addr) {
        return RegExp('^xpub[a-km-zA-HJ-NP-Z0-9]{107}$').test(addr);
    },
    
    symbol() {
        return "BTC";
    },

    fetch(addr) {
        const url = `https://blockchain.info/xpub/${addr}`;

        return req(url)
        .timeout(5000)
        .cancellable()
        .spread(function(resp, body) {
            if (resp.statusCode < 200 || resp.statusCode >= 300) throw new Error(JSON.stringify(resp));

            const match  = body.match(/id="final_balance">[^0-9.]+\d+[^0-9.]+([^ ]+)/);
            
            return {
                quantity: parseFloat(match && match[1]),
                asset: "BTC"
            };
        });
    }
};