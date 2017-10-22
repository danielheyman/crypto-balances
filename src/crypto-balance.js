const Bluebird = require("bluebird");
const services = require('./services');

module.exports = (addr) =>
    Bluebird
    .settle((() => {
        const result = [];
        for (let s in services) {
            const service = services[s];
            if (service.check(addr)) { 
                result.push(
                    service.fetch(addr).catch(e => [{ error: `${s}: ${e.message}` }])
                );
            }
        }
        return result;
    })())
    .timeout(10000)
    .cancellable()
    .map(asset => asset.isFulfilled() && asset.value())
    .reduce((a, b) => a.concat(b), [])
    .then(items => {
        let obj = {};
        items.forEach(item => {
            if (item.error) throw new Error(item.error);
            obj[item.asset] = item.quantity;
        });
        return obj;
    });
;
