const Bluebird = require("bluebird");
const req = Bluebird.promisify(require("request"));

const decimals = 8;
const multiplier = Math.pow(10, decimals);

module.exports = {
    supported_address: [ "BTC", "LTC", "DASH", "DOGE" ],

    check(addr) {
        return RegExp('^[LXD13][a-km-zA-HJ-NP-Z0-9]{26,33}$').test(addr);
    },

    symbol(addr) {
        return ({
            1: "BTC",
            3: "BTC",
            L: "LTC",
            X: "DASH",
            D: "DOGE"
        })[addr[0]];
    },

    fetch(addr) {
        const network = this.symbol(addr);

        const url = `https://api.blockcypher.com/v1/${network.toLowerCase()}/main/addrs/${addr}`;

        return req(url, {json: true})
        .timeout(5000)
        .cancellable()
        .spread(function(resp, json) {
            if (resp.statusCode < 200 || resp.statusCode >= 300) throw new Error(JSON.stringify(resp));
            return {
                quantity: parseFloat(json.balance) / multiplier,
                asset: network
            };
        });
    }
};