import { AxiosInstance } from 'axios';

export default class BlockchainWallet {

    /**
     * Wallet GUID.
     */
    public readonly guid: string;

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
    }

}

interface BlockchainWalletConfig {

    /**
     * Wallet GUID.
     */
    guid: string;

    /**
     * API Client.
     */
    http: AxiosInstance;

    /**
     * Blockchain.com API Key.
     */
    apiKey?: string;
}