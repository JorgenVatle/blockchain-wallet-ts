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
    public constructor(config: BlockchainWallet.config) {
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

}

export namespace BlockchainWallet {

    /**
     * Constructor options.
     */
    export interface config {
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

}