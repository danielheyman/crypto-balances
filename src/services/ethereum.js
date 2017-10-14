const Promise = require("bluebird");
const req = Promise.promisify(require("request"));
const { InvalidResponseError } = require("../errors");
const converter = require("./../converter");

module.exports = {
    check(addr) {
        return RegExp('^(0x)?[0-9a-fA-F]{40}$').test(addr);
    },

    fetch(addr) {
        const url = `http://api.etherscan.io/api?module=account&action=balance&address=${addr}&tag=latest`;

        return req(url, {json: true})
        .timeout(2000)
        .cancellable()
        .spread((resp, json) => {
            if (resp.statusCode < 200 || resp.statusCode >= 300) throw new InvalidResponseError({service: url, response: resp});
            return {
                asset: "ETH",
                quantity: parseFloat(converter.toCoin(json.result, "ETH"))
            };
        })
        .catch(Promise.TimeoutError, e => [{status: 'error', service: url, message: e.message, raw: e}])
        .catch(InvalidResponseError, e => [{status: "error", service: e.service, message: e.message, raw: e.response}]);
    }
}