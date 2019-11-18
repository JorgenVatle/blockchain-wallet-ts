import Axios, { AxiosInstance } from 'axios';
import { ServiceMyWalletApi } from './Interfaces/ServiceMyWalletApi';

export default class BlockchainWallet {

    /**
     * Blockchain.com API key
     */
    private apiKey?: string;

    /**
     * Service client.
     */
    protected http: AxiosInstance;

    /**
     * Blockchain Wallet constructor
     */
    public constructor(config: BlockchainWalletConfig) {
        this.apiKey = config.apiKey;
        this.http = Axios.create({
            baseURL: config.apiUrl,
        });
    }

    /**
     * Create a new wallet.
     */
    public create(params: ServiceMyWalletApi.Params.createWallet) {
        params.api_code = params.api_code || this.apiKey;

        return this.http.get<ServiceMyWalletApi.Response.createWallet>('/api/v2/create', {
            params,
        }).then(({ data }) => data);
    }

    /**
     * Initiate a payment to the given address.
     *
     * @param guid      // Wallet ID
     * @param params    // Request parameters.
     */
    public pay(guid: string, params: ServiceMyWalletApi.Params.makePayment) {
        params.api_code = params.api_code || this.apiKey;

        return this.http.get<ServiceMyWalletApi.Response.makePayment>(`/merchant/${guid}/payment`, {
            params,
        }).then(({ data }) => data);
    }

    /**
     * Initiate a payment to multiple recipients.
     *
     * @param guid      // Wallet ID
     * @param params    // Request parameters.
     */
    public payMany(guid: string, params: ServiceMyWalletApi.Params.sendToMany) {
        params.api_code = params.api_code || this.apiKey;

        return this.http.get<ServiceMyWalletApi.Response.sendToMany>(`/merchant/${guid}/payment`, {
            params: {
                ...params,
                recipients: JSON.stringify(params.recipients),
            }
        }).then(({ data }) => data);
    }

}

/**
 * Constructor options.
 */
export interface BlockchainWalletConfig {
    /**
     * URL to running 'service-my-wallet', include port!
     * E.g. http://localhost:3000
     *
     * @link https://github.com/blockchain/service-my-wallet-v3
     */
    apiUrl: string;

    /**
     * Your API Key
     */
    apiKey?: string;
}