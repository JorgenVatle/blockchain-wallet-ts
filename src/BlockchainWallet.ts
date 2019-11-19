import { AxiosInstance } from 'axios';
import { ServiceMyWalletApi } from './Interfaces/ServiceMyWalletApi';
import BlockchainHDWallet from './BlockchainHDWallet';

interface KeyVal {
    [key: string]: any;
}

export default class BlockchainWallet {

    /**
     * Blockchain.com wallet ID.
     */
    public readonly guid: string;

    /**
     * Blockchain.com wallet password.
     */
    private readonly password: string;

    /**
     * HTTP API Client.
     */
    protected readonly http: AxiosInstance;

    /**
     * Blockchain.com API Key.
     */
    private readonly apiKey?: string;

    /**
     * Blockchain Wallet constructor.
     */
    public constructor(config: BlockchainWalletConfig) {
        this.guid = config.guid;
        this.http = config.http;
        this.apiKey = config.apiKey;
        this.password = config.password;
    }

    /**
     * Attach default request parameters.
     */
    protected requestParams(params?: KeyVal) {
        return {
            password: this.password,
            api_code: this.apiKey,
            ...params,
        }
    }

    /**
     * Send an API request.
     */
    protected request<T>(path: string, params?: KeyVal) {
        return this.http.get<T>(path, { params: this.requestParams(params) }).then(({data}) => data);
    }

    /**
     * Initiate a payment to the given address.
     */
    public pay(params: ServiceMyWalletApi.Params.makePayment) {
        return this.request<ServiceMyWalletApi.Response.makePayment>(`/merchant/${this.guid}/payment`, params);
    }

    /**
     * Initiate a payment to multiple recipients.
     */
    public payMany(params: ServiceMyWalletApi.Params.sendToMany) {
        return this.request<ServiceMyWalletApi.Response.sendToMany>(`/merchant/${this.guid}/sendmany`, {
            ...this.requestParams(params),
            recipients: JSON.stringify(params.recipients),
        });
    }

    /**
     * Wallet balance in satoshis.
     */
    public get balance() {
        return this.request<ServiceMyWalletApi.Response.fetchBalance>(`/merchant/${this.guid}/balance`);
    }

    /**
     * Enable HD wallet functionality for the current wallet.
     */
    public async enableHD() {
        await this.request<ServiceMyWalletApi.Response.enableHD>(`/merchant/${this.guid}/enableHD`).then((data) => {
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
        return this.http.get(`/merchant/${this.guid}/accounts`);
    }

    /**
     * Fetch HD xPubs for this wallet.
     *
     * Todo: Document return type.
     */
    public get xpubs() {
        return this.http.get(`/merchant/${this.guid}/accounts/xpubs`);
    }

    /**
     * Create HD account.
     *
     * Todo: Document return type.
     */
    public createHD(params?: ServiceMyWalletApi.Params.createHDAccount) {
        return this.request(`/merchant/${this.guid}/accounts/create`, params);
    }

}

export interface BlockchainWalletConfig {
    /**
     * Wallet GUID.
     */
    guid: string;

    /**
     * Wallet password.
     */
    password: string;

    /**
     * API Client.
     */
    http: AxiosInstance;

    /**
     * Blockchain.com API Key.
     */
    apiKey?: string;
}