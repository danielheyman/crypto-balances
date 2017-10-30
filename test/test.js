const chai = require('chai');
expect = chai.expect;
chai.config.includeStack = true;
const balance = require("../src/crypto-balance");

// Tests use the addresses from the richest addresses at https://bitinfocharts.com to ensure longlivity of the address balance

describe("Balance", function() {
    it("has a BTC balance", done =>
        balance("3D2oetdNuZUqQHPJmcMDDHYoqkyNVsFk9r").then((result) => {
            expect(result.address_type).to.equal("BTC");
            expect(result.balances.BTC).to.exist;
            return done();
        })
    );
    
    it("has an LTC balance", done =>
        balance("LdP8Qox1VAhCzLJNqrr74YovaWYyNBUWvL").then((result) => {
            expect(result.address_type).to.equal("LTC");
            expect(result.balances.LTC).to.exist;
            return done();
        })
    );
    
    it("has an DASH balance", done =>
        balance("XekiLaxnqpFb2m4NQAEcsKutZcZgcyfo6W").then((result) => {
            expect(result.address_type).to.equal("DASH");
            expect(result.balances.DASH).to.exist;
            return done();
        })
    );
    
    it("has an DOGE balance", done =>
        balance("D8EyEfuNsfQ3root9R3ac54mMcLmoNBW6q").then((result) => {
            expect(result.address_type).to.equal("DOGE");
            expect(result.balances.DOGE).to.exist;
            return done();
        })
    );

    it("has an ETH & ERC20 balance", done =>
        balance("0x1ebacb7844fdc322f805904fbf1962802db1537c").then((result) => {
            expect(result.address_type).to.equal("ETH");
            expect(result.balances.ETH && result.balances.OMG).to.exist;
            return done();
        })
    );
});