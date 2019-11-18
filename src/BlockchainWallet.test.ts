import Config from 'config';
import BlockchainWallet from './BlockchainWallet';
import BlockchainApi from './BlockchainApi';

describe('BlockchainWallet', () => {
    const config = {
        blockchain: Config.get<{ apiKey: string, walletUrl: string }>('blockchain'),
        wallet: Config.get<{ guid: string, password: string }>('wallet'),
    };
    const Wallet = new BlockchainApi({
        apiKey: config.blockchain.apiKey,
        apiUrl: config.blockchain.walletUrl,
    })
});