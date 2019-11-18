import Axios, { AxiosInstance } from 'axios';
import { ServiceMyWalletApi } from './Interfaces/ServiceMyWalletApi';
import BlockchainWallet from './BlockchainWallet';

export default class BlockchainApi {

    /**
     * Blockchain.com API key
     */
    private readonly apiKey?: string;

    /**
     * Service client.
     */
    protected http: AxiosInstance;

    /**
     * Blockchain Wallet constructor
     */
    public constructor(config: BlockchainApiConfig) {
        this.apiKey = config.apiKey;
        this.http = Axios.create({
            baseURL: config.apiUrl,
        });
    }

    /**
     * Create a new wallet.
     */
    public createWallet(params: ServiceMyWalletApi.Params.createWallet) {
        params.api_code = params.api_code || this.apiKey;

        return this.http.get<ServiceMyWalletApi.Response.createWallet>('/api/v2/create', {
            params,
        }).then(({ data }) => {
            return new BlockchainWallet({
                guid: data.guid,
                password: params.password,
                http: this.http,
                apiKey: this.apiKey,
            })
        });
    }

}

/**
 * Constructor options.
 */
export interface BlockchainApiConfig {
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