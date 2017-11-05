const Bluebird = require("bluebird");
const req = Bluebird.promisify(require("request"));

module.exports = {
    check(addr) {
        return RegExp('^[SMD][a-km-zA-HJ-NP-Z0-9]{26,33}$').test(addr);
    },

    symbol(addr) {
        return ({
            M: "LTC",
            S: "STRAT",
            D: "DGB",
        })[addr[0]];
    },

    fetch(addr) {
        const network = this.symbol(addr);

        const url = `https://chainz.cryptoid.info/${network.toLowerCase()}/api.dws?q=getbalance&a=${addr}`;

        return req(url)
        .timeout(5000)
        .cancellable()
        .spread(function(resp, body) {
            if (resp.statusCode < 200 || resp.statusCode >= 300) throw new Error(JSON.stringify(resp));
            return {
                quantity: parseFloat(body),
                asset: network
            };
        });
    }
};