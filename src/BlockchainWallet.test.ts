import BlockchainWallet from './BlockchainWallet';
import BlockchainApi from './BlockchainApi';
import LocalConfig from './Interfaces/LocalConfig';

describe('BlockchainWallet', () => {
    const Wallet = new BlockchainApi({
        apiKey: LocalConfig.blockchain.apiKey,
        apiUrl: LocalConfig.blockchain.apiUrl,
    })
});