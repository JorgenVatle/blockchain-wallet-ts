import { ServiceMyWalletApi } from './Interfaces/ServiceMyWalletApi';
import BlockchainHDWallet from './BlockchainHDWallet';
import ApiClient, { ApiClientConfig } from './Providers/ApiClient';

export default class BlockchainWallet extends ApiClient {

    /**
     * Blockchain.com wallet ID.
     */
    public readonly guid: string;

    /**
     * Blockchain.com wallet password.
     */
    private readonly password: string;

    /**
     * API Base path.
     */
    protected get basePath() {
        return `/merchant/${this.guid}`
    }

    /**
     * Parameters to be included in every API request.
     */
    protected get baseParams() {
        return { password: this.password }
    }

    /**
     * Blockchain Wallet constructor.
     */
    public constructor(config: BlockchainWalletConfig) {
        super(config);
        this.guid = config.guid;
        this.password = config.password;
    }

    /**
     * Initiate a payment to the given address.
     */
    public pay(params: ServiceMyWalletApi.Params.makePayment) {
        return this.request<ServiceMyWalletApi.Response.makePayment>(`/payment`, params);
    }

    /**
     * Initiate a payment to multiple recipients.
     */
    public payMany(params: ServiceMyWalletApi.Params.sendToMany) {
        return this.request<ServiceMyWalletApi.Response.sendToMany>(`/sendmany`, {
            ...this.requestParams(params),
            recipients: JSON.stringify(params.recipients),
        });
    }

    /**
     * Wallet balance in satoshis.
     */
    public get balance() {
        return this.request<ServiceMyWalletApi.Response.fetchBalance>(`/balance`);
    }

    /**
     * Enable HD wallet functionality for the current wallet.
     */
    public async enableHD() {
        await this.request<ServiceMyWalletApi.Response.enableHD>(`/enableHD`).then((data) => {
            return new BlockchainHDWallet({
                guid: this.guid,
                password: this.password,
                http: this.http,
                apiKey: this.apiKey,
                xpub: data.extendedPublicKey,
                index: data.index,
            })
        });
    }

    /**
     * Active HD accounts connected to this wallet.
     *
     * Todo: Document return type.
     */
    public get accounts() {
        return this.http.get(`/accounts`);
    }

    /**
     * Fetch HD xPubs for this wallet.
     *
     * Todo: Document return type.
     */
    public get xpubs() {
        return this.http.get(`/accounts/xpubs`);
    }

    /**
     * Create HD account.
     *
     * Todo: Document return type.
     */
    public createHD(params?: ServiceMyWalletApi.Params.createHDAccount) {
        return this.request(`/accounts/create`, params);
    }

}

export interface BlockchainWalletConfig extends ApiClientConfig {
    /**
     * Wallet GUID.
     */
    guid: string;

    /**
     * Wallet password.
     */
    password: string;

}