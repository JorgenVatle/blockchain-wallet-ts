import Axios, { AxiosInstance } from 'axios';

interface BlockchainWalletConfig {
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

}