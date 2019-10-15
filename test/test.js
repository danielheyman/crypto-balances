const chai = require('chai');
expect = chai.expect;
chai.config.includeStack = true;
const balance = require("../src/crypto-balance");

// Tests use the addresses from the richest addresses at https://bitinfocharts.com to ensure longlivity of the address balance

describe("Balance", function() {
    // blockchain-info
    it("has an xpub balance", () =>
        balance("xpub6CUGRUonZSQ4TWtTMmzXdrXDtypWKiKrhko4egpiMZbpiaQL2jkwSB1icqYh2cfDfVxdx4df189oLKnC5fSwqPfgyP3hooxujYzAu3fDVmz").then((result) => {
            expect(result.address_type).to.equal("BTC");
            expect(result.balances.BTC).to.exist;
        })
    );

    // neoscan
    it("has a NEO & GAS balance", () =>
        balance("AKDVzYGLczmykdtRaejgvWeZrvdkVEvQ1X").then((result) => {
            expect(result.address_type).to.equal("NEO");
            expect(result.balances.NEO).to.exist;
            expect(result.balances.GAS).to.exist;
        })
    );

    // blockcypher
    it("has a BTC balance", () =>
        balance("3D2oetdNuZUqQHPJmcMDDHYoqkyNVsFk9r").then((result) => {
            expect(result.address_type).to.equal("BTC");
            expect(result.balances.BTC).to.exist;
        })
    );
    
    it("has an LTC balance", () =>
        balance("LdP8Qox1VAhCzLJNqrr74YovaWYyNBUWvL").then((result) => {
            expect(result.address_type).to.equal("LTC");
            expect(result.balances.LTC).to.exist;
        })
    );
    
    it("has a DASH balance", () =>
        balance("XekiLaxnqpFb2m4NQAEcsKutZcZgcyfo6W").then((result) => {
            expect(result.address_type).to.equal("DASH");
            expect(result.balances.DASH).to.exist;
        })
    );
    
    it("has a DOGE balance", () =>
        balance("D8EyEfuNsfQ3root9R3ac54mMcLmoNBW6q").then((result) => {
            expect(result.address_type).to.equal("DOGE");
            expect(result.balances.DOGE).to.exist;
        })
    );

    // ethplorer
    it("has an ETH & ERC20 balance", () =>
        balance("0x1ebacb7844fdc322f805904fbf1962802db1537c").then((result) => {
            expect(result.address_type).to.equal("ETH");
            expect(result.balances.ETH && result.balances.OMG).to.exist;
        })
    );

    // Chainz
    it("has a LTC Sewgit balance", () =>
        balance("MJejLHNVJLdkp9RM97AyFE85qmpPzh8PYw").then((result) => {
            expect(result.address_type).to.equal("LTC");
            expect(result.balances.LTC).to.exist;
        })
    );

    it("has a Stratus balance", () =>
        balance("SN7bBW1RRpu3PsSwcKWF74ZDL9UNG32edd").then((result) => {
            expect(result.address_type).to.equal("STRAT");
            expect(result.balances.STRAT).to.exist;
        })
    );

    it("has a DigiByte balance", () =>
        balance("DCo1dbnnwWB4cucwSduXMdTV1tDErZHNfx", "DGB").then((result) => {
            expect(result.address_type).to.equal("DGB");
            expect(result.balances.DGB).to.exist;
        })
    );

    // specific coins
    it("supports a specific coin type - invalid", () => 
        balance("0x1ebacb7844fdc322f805904fbf1962802db1537c", "BTC").then(result => {
            expect(result.address_type).to.equal("unknown");
        })
    );

    it("supports a specific coin type - valid", () =>
        balance("0x1ebacb7844fdc322f805904fbf1962802db1537c", "ETH").then((result) => {
            expect(result.address_type).to.equal("ETH");
            expect(result.balances.ETH && result.balances.OMG).to.exist;
        })
    );
});