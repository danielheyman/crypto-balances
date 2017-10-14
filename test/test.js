const chai = require('chai');
expect = chai.expect;
chai.config.includeStack = true;
const balance = require("../src/crypto-balance");

// Tests use the addresses from the richest addresses at https://bitinfocharts.com to ensure longlivity of the address balance

describe("Balance", function() {
    it("has a BTC balance", done =>
        balance("3D2oetdNuZUqQHPJmcMDDHYoqkyNVsFk9r").then((result) => {
            const found = result.find(r => r.asset === "BTC");
            expect(found).to.exist;
            return done();
        })
    );
    
    it("has an LTC balance", done =>
        balance("LdP8Qox1VAhCzLJNqrr74YovaWYyNBUWvL").then((result) => {
            const found = result.find(r => r.asset === "LTC");
            expect(found).to.exist;
            return done();
        })
    );
    
    it("has an DASH balance", done =>
        balance("XekiLaxnqpFb2m4NQAEcsKutZcZgcyfo6W").then((result) => {
            const found = result.find(r => r.asset === "DASH");
            expect(found).to.exist;
            return done();
        })
    );
    
    it("has an DOGE balance", done =>
        balance("D8EyEfuNsfQ3root9R3ac54mMcLmoNBW6q").then((result) => {
            const found = result.find(r => r.asset === "DOGE");
            expect(found).to.exist;
            return done();
        })
    );

    it("has an ETH & ERC20 balance", done =>
        balance("0x1ebacb7844fdc322f805904fbf1962802db1537c").then((result) => {
            const found = result.find(r => r.asset === "ETH");
            const found2 = result.find(r => r.asset === "OMG");
            expect(found && found2).to.exist;
            return done();
        })
    );
});