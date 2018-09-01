Extended from the original deprecated package by [@litvintech](https://github.com/litvintech/crypto-balances) to provide API services and re-formatted results.

# Crypto-balances

Easily check address balances of various crypto tokens. Script automaticaly recognizes a protocol by address and returns balances of tokens associated with it.

## As a dependency
Require the package and use it as any other promise:

```
~ » npm install --save https://github.com/danielheyman/crypto-balances.git
```

```javascript
const balance = require('crypto-balances');

balance("0xfc30a6c6d1d61f0027556ed25a670345ab39d0cb")
.then(result => console.log(result))
.catch(error => console.log(`OH NO! ${error}`));

// logs: { "address_type": "ETH", balances: {"ETH": 0.29, "OMG": 124.448} }
```

## As an API

Run `npm start` to get the service running.

An API call can be made to port 8888 with a given address to http://127.0.0.71:8888/address_to_check.

It will return a json response such as `{ "address_type": "ETH", balances: {"ETH": 0.29, "OMG": 124.448} }`.

If an error occurs, it will return a json response such as `{ "error": "ethplorer: Invalid API key" }`

# As an API using Docker

Useful when running on a machine with multiple node applications, each requiring different specifications.

Run `docker-compose up` to get the container up.

An API call can be made on port 8888 with a given address to http://0.0.0.0:8888/address_to_check.

## Supported Protocols

- Using https://chain.so: Bitcoin, Litecoin, Dash, Dogecoin
- Using https://blockchain.info: Bitcoin Xpub
- Using https://etherscan.io: Ethereum, ERC20 Tokens
- Using https://chainz.cryptoid.info: LTC Segwit, Stratis, DigiByte
- Using https://neotracker.io: NEO, NEP5 Tokens

## Installation

```
~ » git clone https://github.com/danielheyman/crypto-balances
~ » cd crypto-balances
~ » npm install
~ » npm start
```

## Tests
```
~ » npm run test
```

## License

Under MIT License

## Contributing
1. Fork it
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request
