import BlockchainWallet from './BlockchainWallet';
import BlockchainApi from './BlockchainApi';
import LocalConfig from './Interfaces/LocalConfig';

describe('BlockchainWallet', () => {
    let wallet: BlockchainWallet;

    beforeAll(async () => {
        wallet = await new BlockchainApi({
            apiKey: LocalConfig.blockchain.apiKey,
            apiUrl: LocalConfig.blockchain.apiUrl,
        }).getWallet({
            guid: LocalConfig.wallet.guid,
            password: LocalConfig.wallet.password,
        })
    });

    test('Can convert current wallet to HD wallet', async () => {
        await wallet.enableHD();
    });

    test('Can get balance', async () => {
        const { balance } = await wallet.balance;
        expect(balance).toBeDefined();
        expect(balance).toBeGreaterThanOrEqual(0);
    });
});