const Bluebird = require("bluebird");
const req = Bluebird.promisify(require("request"));

module.exports = {
    check(addr) {
        return RegExp('^(0x)?[0-9a-fA-F]{40}$').test(addr);
    },
    
    symbol(addr) {
        return "ETH";
    },

    fetch(addr) {
        const url = `http://api.etherscan.io/api?module=account&action=balance&address=${addr}&tag=latest`;
        const conversion = 1000000000000000000;

        return req(url, {json: true})
        .timeout(2000)
        .cancellable()
        .spread((resp, json) => {
            if (resp.statusCode < 200 || resp.statusCode >= 300) throw new Error(JSON.stringify(resp));
            return {
                asset: "ETH",
                quantity: json.result / conversion
            };
        });
    }
}