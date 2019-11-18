import Axios, { AxiosInstance } from 'axios';

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
    public create(params: BlockchainWallet.createParams) {
        return this.http.get<BlockchainWallet.Response.create>('/api/v2/create', {
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

    /**
     * Create wallet query parameters.
     *
     * @link https://github.com/blockchain/service-my-wallet-v3#creating-a-new-blockchain-wallet
     */
    export interface createParams {
        /**
         * Main wallet password.
         */
        password: string;

        /**
         * Blockchain.com API key.
         */
        api_code?: string;

        /**
         * Private key to import into wallet as first address.
         */
        priv?: string;

        /**
         * Label to give the first address generated in the wallet.
         */
        label?: string;

        /**
         * Email address to associate with the newly created wallet.
         */
        email?: string;
    }

    /**
     * API Responses.
     */
    export namespace Response {

        /**
         * Wallet create request response.
         */
        export interface create {
            /**
             * Wallet ID.
             */
            guid: string;

            /**
             * Bitcoin wallet address.
             */
            address: string;

            /**
             * Label you associated with your wallet.
             */
            label?: string;
        }

    }
}