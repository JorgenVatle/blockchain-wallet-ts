# Blockchain.com Wallet API
A Node.js wrapper around Blockchain.com's [Service-My-Wallet](https://github.com/blockchain/service-my-wallet-v3) API.
Written in TypeScript to provide you with all that autocomplete niceness.

## Prerequisites
- A running instance of [Service-My-Wallet](https://github.com/blockchain/service-my-wallet-v3).
- Some features are limited to users with a [Blockchain.com](https://blockchain.com) API key.
    - See [Service-My-Wallet](https://github.com/blockchain/service-my-wallet-v3) for more info.

## Installation
```bash
npm i blockchain-wallet-ts
```

## Usage
Import and initialize the Blockchain API.
```typescript
import BlockchainApi from 'blockchain-wallet-ts';

const Blockchain = BlockchainApi({
    apiUrl: 'http://localhost:3035', // URL to your locally running instance of Service-My-Wallet.
    apiKey: 'c889f326-e94a-47a3-a475-6c1ea5e9d232' // Optional Blockchain.com API key.
})
```

##### Create a wallet.
```typescript
const Wallet = await Blockchain.createWallet({
    password: 'some-secure-wallet-password.'
});
```
Returns an instance of [`BlockchainWallet`](src/BlockchainWallet.ts).

##### Fetch wallet addresses
```typescript
const accounts = await Wallet.accounts;
```
Returns an array of accounts attached to your wallet.
```typescript
[{
  balance: 0,
  index: 12,
  archived: false,
  extendedPublicKey: 'xpub6CcWKuBb3XZK3PLpM...',
  extendedPrivateKey: 'xprv9yd9vPehDA11puGM...',
  receiveIndex: 0,
  lastUsedReceiveIndex: null,
  receiveAddress: '1H5rvJbGNK7gmyR28pknmj...'
}]
```

##### Check balance
```typescript
const account = await Wallet.balance;  
```
Returns the overall balance of your wallet.
```typescript
{ balance: 0 }
```

##### Create a payment
```typescript
Wallet.pay({
    to: '1H5rvJbGNK7gmyR28pknmj...', // Recipient address.
    amount: 100000000,               // Amount to send in satoshis. (100000000 = 1 BTC)
})
```

##### Send Bitcoin to multiple recipients
```typescript
Wallet.payMany({
    recipients: { 
        '1FBkNpMubKM9Y89aVv6JQXAQfYSPLc2fn7': 100000,
        '12EQPNFpao2Gu1xAQvjkfd8vQYmwpP9Eiz': 250000,
    }
})
```

## License
This repository is licensed under the ISC license.

Copyright (c) 2019, Jørgen Vatle.
