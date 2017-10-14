const Big = require('big.js');

const conversion = {
    "ETH": 1000000000000000000,
    "NXT": 100000000,
    "FCT": 100000000,
    "XEM": 1000000
};

module.exports = {
    toCoin(basicAmount, type) {
        if (typeof basicAmount === 'string') {
            basicAmount = Number(basicAmount);
        }
        const bigBasicAmount = new Big(basicAmount);
        return Number(bigBasicAmount.div(conversion[type])).toString();
    }
};