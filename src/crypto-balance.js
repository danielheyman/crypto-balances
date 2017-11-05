const Bluebird = require("bluebird");
const services = require('./services');

module.exports = (addr) => {
    let address_type = "";
    return Bluebird
    .settle((() => {
        const result = [];
        for (let s in services) {
            const service = services[s];
            if (service.check(addr)) {
                result.push(
                    service.fetch(addr).catch(e => [{ error: `${s}: ${e.message}` }])
                );
                if (!address_type) address_type = service.symbol(addr);
            }
        }
        if(result.length === 0) return [[{ error: `no matches found` }]]
        return result;
    })())
    .timeout(10000)
    .cancellable()
    .map(asset => asset.isFulfilled() && asset.value())
    .reduce((a, b) => a.concat(b), [])
    .then(items => {
        let obj = {
            address_type,
            balances: {},
        };
        items.forEach(item => {
            if (item.error) throw new Error(item.error);
            if (item.quantity) obj.balances[item.asset] = item.quantity;
        });
        if (Object.keys(obj.balances).length === 1) obj.address_type = Object.keys(obj.balances)[0]
        return obj;
    });
}
;
