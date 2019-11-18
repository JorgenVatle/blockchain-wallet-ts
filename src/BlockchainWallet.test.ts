import Config from 'config';
import BlockchainWallet from './BlockchainWallet';
import BlockchainApi from './BlockchainApi';
import { LocalConfig } from './Interfaces/LocalConfig';

describe('BlockchainWallet', () => {
    const config = {
        blockchain: Config.get<LocalConfig.blockchain>('blockchain'),
        wallet: Config.get<LocalConfig.wallet>('wallet'),
    };
    const Wallet = new BlockchainApi({
        apiKey: config.blockchain.apiKey,
        apiUrl: config.blockchain.walletUrl,
    })
});