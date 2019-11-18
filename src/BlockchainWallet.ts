import { AxiosInstance } from 'axios';

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