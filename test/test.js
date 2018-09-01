const chai = require('chai');
expect = chai.expect;
chai.config.includeStack = true;
const balance = require("../src/crypto-balance");

// Tests use the addresses from the richest addresses at https://bitinfocharts.com to ensure longlivity of the address balance

describe("Balance", function() {
    // Xpub
    it("has an xpub balance", done =>
        balance("xpub6CUGRUonZSQ4TWtTMmzXdrXDtypWKiKrhko4egpiMZbpiaQL2jkwSB1icqYh2cfDfVxdx4df189oLKnC5fSwqPfgyP3hooxujYzAu3fDVmz").then((result) => {
            expect(result.address_type).to.equal("BTC");
            expect(result.balances.BTC).to.exist;
            return done();
        })
    );

    // Chain-so
    it("has a BTC balance", done =>
        balance("3D2oetdNuZUqQHPJmcMDDHYoqkyNVsFk9r").then((result) => {
            expect(result.address_type).to.equal("BTC");
            expect(result.balances.BTC).to.exist;
            return done();
        })
    );

    it("has a NEO & GAS balance", done =>
        balance("AKDVzYGLczmykdtRaejgvWeZrvdkVEvQ1X").then((result) => {
            expect(result.address_type).to.equal("NEO");
            expect(result.balances.NEO).to.exist;
            expect(result.balances.GAS).to.exist;
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
    
    it("has a DASH balance", done =>
        balance("XekiLaxnqpFb2m4NQAEcsKutZcZgcyfo6W").then((result) => {
            expect(result.address_type).to.equal("DASH");
            expect(result.balances.DASH).to.exist;
            return done();
        })
    );
    
    it("has a DOGE balance", done =>
        balance("D8EyEfuNsfQ3root9R3ac54mMcLmoNBW6q").then((result) => {
            expect(result.address_type).to.equal("DOGE");
            expect(result.balances.DOGE).to.exist;
            return done();
        })
    );

    // ethplorer
    it("has an ETH & ERC20 balance", done =>
        balance("0x1ebacb7844fdc322f805904fbf1962802db1537c").then((result) => {
            expect(result.address_type).to.equal("ETH");
            expect(result.balances.ETH && result.balances.OMG).to.exist;
            return done();
        })
    );

    // Chainz
    it("has a LTC Sewgit balance", done =>
        balance("MJejLHNVJLdkp9RM97AyFE85qmpPzh8PYw").then((result) => {
            expect(result.address_type).to.equal("LTC");
            expect(result.balances.LTC).to.exist;
            return done();
        })
    );

    it("has a Stratus balance", done =>
        balance("SQXV89VgTyW7FGZEVB3qDT7NGegpJ41p5k").then((result) => {
            expect(result.address_type).to.equal("STRAT");
            expect(result.balances.STRAT).to.exist;
            return done();
        })
    );

    it("has a DigiByte balance", done =>
        balance("DCo1dbnnwWB4cucwSduXMdTV1tDErZHNfx").then((result) => {
            expect(result.address_type).to.equal("DGB");
            expect(result.balances.DGB).to.exist;
            return done();
        })
    );

    it("supports a specific coin type - invalid", done => 
        balance("0x1ebacb7844fdc322f805904fbf1962802db1537c", "BTC").then(result => {
            expect(result.address_type).to.equal("unknown");
            return done();
        })
    );

    it("supports a specific coin type - valid", done =>
        balance("0x1ebacb7844fdc322f805904fbf1962802db1537c", "ETH").then((result) => {
            expect(result.address_type).to.equal("ETH");
            expect(result.balances.ETH && result.balances.OMG).to.exist;
            return done();
        })
    );
});