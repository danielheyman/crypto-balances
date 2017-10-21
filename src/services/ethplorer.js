const Bluebird = require("bluebird");
const req = Bluebird.promisify(require("request"));
const { InvalidResponseError } = require("../errors");

module.exports = {
    check(addr) {
        return RegExp('^(0x)?[0-9a-fA-F]{40}$').test(addr);
    },

    fetch(addr) {
        const url = `https://api.ethplorer.io/getAddressInfo/${addr}?apiKey=freekey`;

        return req(url, {json: true})
        .timeout(10000)
        .cancellable()
        .spread((resp, json) => {
            if (resp.statusCode < 200 || resp.statusCode >= 300) throw new InvalidResponseError({service: url, response: resp});
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
        })
        .catch(Bluebird.TimeoutError, e => [{status: 'error', service: url, message: e.message, raw: e}])
        .catch(InvalidResponseError, e => [{status: "error", service: e.service, message: e.message, raw: e.response}]);
    }
}