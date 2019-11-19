import BlockchainWallet from './BlockchainWallet';
import BlockchainApi from './BlockchainApi';
import LocalConfig from './Interfaces/LocalConfig';

describe('BlockchainWallet', () => {
    let wallet: BlockchainWallet;
    const blockchain = new BlockchainApi({
        apiKey: LocalConfig.blockchain.apiKey,
        apiUrl: LocalConfig.blockchain.apiUrl,
    });

    beforeAll(async () => {
        wallet = await blockchain.getWallet({
            guid: LocalConfig.wallet.guid,
            password: LocalConfig.wallet.password,
        })
    });

    test('Can convert current wallet to HD wallet', async () => {
        const wallet = await blockchain.createWallet({ password: 'some-placeholder-password' });
        await wallet.enableHD();
    });

    test('Can get balance', async () => {
        const { balance } = await wallet.balance;
        expect(balance).toBeDefined();
        expect(balance).toBeGreaterThanOrEqual(0);
    });

    test('Can create HD accounts', async () => {
        const account = await wallet.createHD();
        expect(account).toBeDefined();
    });

    test('Can list HD accounts', async () => {
        const accounts = await wallet.accounts;
        expect(accounts.length).toBeGreaterThan(0);
    });

    test('Can list xPubs', async () =>{
        const xpubs = await wallet.xpubs;
        expect(xpubs.length).toBeGreaterThan(0);
    });
});