// Backup in case etherscan fails
const Bluebird = require("bluebird");
const req = Bluebird.promisify(require("request"));

module.exports = {
    supported_address: [ "ETH" ],

    check(addr) {
        return RegExp('^(0x)?[0-9a-fA-F]{40}$').test(addr);
    },
    
    symbol(addr) {
        return "ETH";
    },

    fetch(addr) {
        const url = `https://api.ethplorer.io/getAddressInfo/${addr}?apiKey=freekey`;

        return req(url, {json: true})
        .timeout(10000)
        .cancellable()
        .spread((resp, json) => {
            if (resp.statusCode < 200 || resp.statusCode >= 300) throw new Error(JSON.stringify(resp));
            if (json.error) throw new Error(json.error.message);
            let results = [];
            if (json.tokens) {
                results = json.tokens.map(token => ({
                    asset: token.tokenInfo.symbol,
                    quantity: parseFloat(token.balance) / Math.pow(10, parseInt(token.tokenInfo.decimals) || 0)
                }));
            }
            if (json.ETH) {
                results.push({
                    asset: "ETH",
                    quantity: parseFloat(json.ETH.balance)
                });
            }
            return results;
        });
    }
}