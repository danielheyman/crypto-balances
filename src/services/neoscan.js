const Bluebird = require("bluebird");
const req = Bluebird.promisify(require("request"));

module.exports = {
    supported_address: [ "NEO" ],

    check(addr) {
        return RegExp('^A[0-9a-zA-Z]{33}$').test(addr);
    },
    
    symbol() {
        return "NEO";
    },

    fetch(addr) {
        const url = `https://api.neoscan.io/api/main_net/v1/get_balance/${addr}`;

        return req(url, {json: true})
        .timeout(10000)
        .cancellable()
        .spread((resp, json) => {
            if (resp.statusCode < 200 || resp.statusCode >= 300) throw new Error(JSON.stringify(resp));
            if (json.error) throw new Error(json.error.message);
            return json.balance.map(b => ({
                asset: b.asset_symbol,
                quantity: b.amount,
            }));
        });
    }
};