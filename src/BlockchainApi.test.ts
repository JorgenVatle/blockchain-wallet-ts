import BlockchainApi from './BlockchainApi';
import LocalConfig from './Interfaces/LocalConfig';
import BlockchainWallet from './BlockchainWallet';

describe('BlockchainApi', () => {
    const api = new BlockchainApi({
        apiKey: LocalConfig.blockchain.apiKey,
        apiUrl: LocalConfig.blockchain.apiUrl,
    });

    test('Can create wallets', async () => {
        const wallet = await api.createWallet({
            password: 'some-random=password',
        });

        expect(wallet).toBeInstanceOf(BlockchainWallet);
    })
});