import { AxiosInstance } from 'axios';
import { ServiceMyWalletApi } from './Interfaces/ServiceMyWalletApi';

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
    protected requestParams(params?: { [key: string]: any }) {
        return {
            password: this.password,
            api_code: this.apiKey,
            ...params,
        }
    }

    /**
     * Initiate a payment to the given address.
     */
    public pay(params: ServiceMyWalletApi.Params.makePayment) {
        return this.http.get<ServiceMyWalletApi.Response.makePayment>(`/merchant/${this.guid}/payment`, {
            params: this.requestParams(params),
        }).then(({ data }) => data);
    }

    /**
     * Initiate a payment to multiple recipients.
     */
    public payMany(params: ServiceMyWalletApi.Params.sendToMany) {
        params.api_code = params.api_code || this.apiKey;

        return this.http.get<ServiceMyWalletApi.Response.sendToMany>(`/merchant/${this.guid}/sendmany`, {
            params: {
                ...this.requestParams(params),
                recipients: JSON.stringify(params.recipients),
            }
        }).then(({ data }) => data);
    }

    /**
     * Wallet balance in satoshis.
     */
    public get balance() {
        return this.http.get<ServiceMyWalletApi.Response.fetchBalance>(`/merchant/${this.guid}/balance`, {
            params: this.requestParams(),
        }).then(({data}) => data);
    }

    /**
     * Enable HD wallet functionality for the current wallet.
     */
    public async enableHD() {
        await this.http.get(`/merchant/${this.guid}/enableHD`);
    }

}

interface BlockchainWalletConfig {
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