Extended from the original package by [@litvintech](https://github.com/litvintech/crypto-balances) to provide API services and DB tracking.

# Crypto-balances

Easily check address balances of various crypto tokens. Script automaticaly recognizes a protocol by address and returns balances of tokens associated with it.

## As a dependency
Require the package and use it as any other promise.

```javascript
const balance = require('crypto-balances');
balance("0xfc30a6c6d1d61f0027556ed25a670345ab39d0cb")
.then(result => console.log(result))
.catch(error => console.log(`OH NO! ${error}`));

// logs: [{"quantity":"0.29","asset":"ETH"}]
```

## As an API

Run `npm start` to get the service running.

An API call can be made to port 8888 with a given address such as to http://127.0.0.71:8888/0x1ebacb7844fdc322f805904fbf1962802db1537c.

It will return a json response such as `[{"quantity":"0.29","asset":"ETH"}]`.

## As a DB-connected API using Docker

Keep a running history of all the balances of a given address.

By running another project alongside, an API call can be made on port 8888 with a given address such as to http://0.0.0.0:8888/0x1ebacb7844fdc322f805904fbf1962802db1537c.

The balances will be returned in addition to updating the database table with the balances. A cache period can be set within the environment variables.

- Update `docker-compose.yaml` with environment variables
- Run `docker-compose up` to get the container up

## Supported Protocols

- Using http://tokenbalance.com: ERC20 Tokens
- Using http://etherscan.io: Ethereum

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
