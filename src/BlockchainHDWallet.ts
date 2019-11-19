import BlockchainWallet, { BlockchainWalletConfig } from './BlockchainWallet';
import { ServiceMyWalletApi } from './Interfaces/ServiceMyWalletApi';

export default class BlockchainHDWallet extends BlockchainWallet {

    /**
     * HD account xPub.
     */
    protected readonly xpub: string;

    /**
     * HD account index.
     */
    protected readonly index: number;

    /**
     * API path root.
     */
    protected readonly basePath = `/merchant/${this.guid}/accounts/${this.xpub}`;

    /**
     * Blockchain HD Wallet constructor.
     */
    public constructor(config: BlockchainHDWalletConfig) {
        super(config);
        this.xpub = config.xpub;
        this.index = config.index;
    }

    /**
     * Wallet metadata.
     */
    public get data() {
        return this.request<ServiceMyWalletApi.Response.getHD>('');
    }

    /**
     * Fetch balance for current wallet.
     */
    public get balance() {
        return this.request<ServiceMyWalletApi.Response.fetchBalance>(`/balance`);
    }

}

interface BlockchainHDWalletConfig extends BlockchainWalletConfig {
    /**
     * Account xPub
     */
    xpub: string;

    /**
     * Address index.
     */
    index: number;
}