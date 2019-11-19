import BlockchainWallet from './BlockchainWallet';
import BlockchainApi from './BlockchainApi';
import LocalConfig from './Interfaces/LocalConfig';
import BlockchainHDWallet from './BlockchainHDWallet';

describe('BlockchainHDWallet', () => {
    let wallet: BlockchainWallet;
    let hdWallet: BlockchainHDWallet;
    const blockchain = new BlockchainApi({
        apiKey: LocalConfig.blockchain.apiKey,
        apiUrl: LocalConfig.blockchain.apiUrl,
    });

    beforeAll(async () => {
        wallet = await blockchain.getWallet({
            guid: LocalConfig.wallet.guid,
            password: LocalConfig.wallet.password,
        });
        hdWallet = await wallet.createHD();
    });

    test('can fetch metadata', async () => {
        const data = await hdWallet.data;
        expect(data).toBeDefined();
        expect(data.lastUsedReceiveIndex).toBeDefined();
        expect(data.extendedPrivateKey).toBeDefined();
        expect(data.extendedPublicKey).toBeDefined();
        expect(data.receiveAddress).toBeDefined();
        expect(data.receiveIndex).toBeDefined();
        expect(data.balance).toBeDefined();
        expect(data.index).toBeDefined();
        expect(data.archived).toBeDefined();
        expect(data.label).toBeDefined();
    });

    test('can fetch receiving addresses', async () => {
        const wallet = await hdWallet.receivingAddress;
        expect(wallet.address).toBeInstanceOf(String);
    });

});