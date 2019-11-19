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

    test('can fetch receiving addresses', async () => {
        const wallet = await hdWallet.receivingAddress;
        expect(wallet.address).toBeInstanceOf(String);
    });

});