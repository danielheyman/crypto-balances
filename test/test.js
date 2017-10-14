const chai = require('chai');
expect = chai.expect;
chai.config.includeStack = true;
const balance = require("../src/crypto-balance");


describe("Balance", function() {
    it("has an ETH & ERC20 balance", done =>
        balance("0x1ebacb7844fdc322f805904fbf1962802db1537c").then((result) => {
            const found = result.find(r => r.asset === "ETH");
            const found2 = result.find(r => r.asset === "SUB");
            expect(found && found2).to.exist;
            return done();
        })
    );
});