import { ServiceMyWalletApi } from './Interfaces/ServiceMyWalletApi';
import ApiClient, { ApiClientConfig } from './Providers/ApiClient';

export default class BlockchainHDWallet extends ApiClient {

    /**
     * HD account xPub.
     */
    protected readonly xpub: string;

    /**
     * HD account index.
     */
    protected readonly index: number;

    /**
     * Blockchain.com wallet ID.
     */
    protected readonly guid: string;

    /**
     * Blockchain.com wallet password.
     */
    protected readonly password: string;

    /**
     * API path root.
     */
    protected readonly basePath = `/merchant/${this.guid}/accounts/${this.xpub}`;

    /**
     * Parameters to be included in every API request.
     */
    protected readonly baseParams = { password: this.password };

    /**
     * Blockchain HD Wallet constructor.
     */
    public constructor(config: BlockchainHDWalletConfig) {
        super(config);
        this.xpub = config.xpub;
        this.index = config.index;
        this.guid = config.guid;
        this.password = config.password;
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

    /**
     * Fetch receiving Bitcoin address for current wallet.
     */
    public get receivingAddress() {
        return this.request('/receiveAddress');
    }

    /**
     * Archive the current address/account.
     */
    public archive() {
        return this.request('/archive');
    }

    /**
     * Remove the current address/account from the archive, making it active again.
     */
    public unarchive() {
        return this.request('/unarchive');
    }

}

interface BlockchainHDWalletConfig extends ApiClientConfig {
    /**
     * Wallet GUID.
     */
    guid: string;

    /**
     * Wallet password.
     */
    password: string;

    /**
     * Account xPub
     */
    xpub: string;

    /**
     * Address index.
     */
    index: number;
}