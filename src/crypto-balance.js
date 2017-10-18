const Promise = require("bluebird");
const services = require('./services');

module.exports = (addr) =>
    Promise
    .settle((() => {
        const result = [];
        for (let s in services) {
            const service = services[s];
            if (service.check(addr)) { 
                result.push(service.fetch(addr));
            }
        }
        return result;
    })())
    .timeout(10000)
    .cancellable()
    .map(asset => asset.isFulfilled() && asset.value())
    .reduce((a, b) => a.concat(b), [])
    .filter(asset => asset.status != "error")
    .filter(asset => asset.quantity != 0)
    .then(items => {
        let obj = {};
        items.forEach(item => obj[item.asset] = item.quantity);
        return obj;
    });
;
