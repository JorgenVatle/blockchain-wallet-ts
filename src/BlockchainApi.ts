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

        // This works around an issue that breaks the API when passing hd=false.
        if (params.hd) {
            params.hd = true;
        } else {
            delete params.hd;
        }

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

    /**
     * Fetch an existing wallet using the given guid and password.
     */
    public getWallet(wallet: { guid: string, password: string }) {
        return new BlockchainWallet({
            guid: wallet.guid,
            password: wallet.password,
            http: this.http,
            apiKey: this.apiKey,
        })
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