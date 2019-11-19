import { AxiosInstance } from 'axios';

export default abstract class ApiClient {

    /**
     * HTTP API Client.
     */
    protected readonly http: AxiosInstance;

    /**
     * Blockchain.com API Key.
     */
    protected readonly apiKey?: string;

    /**
     * API Base path.
     */
    protected basePath!: string;

    /**
     * Parameters to be included in every API request.
     */
    protected baseParams!: KeyVal;

    /**
     * API Client constructor.
     */
    protected constructor(config: ApiClientConfig) {
        this.http = config.http;
        this.apiKey = config.apiKey;
    }

    /**
     * Attach default request parameters.
     */
    protected requestParams(params?: KeyVal) {
        return {
            ...this.baseParams,
            api_code: this.apiKey,
            ...params,
        }
    }

    /**
     * Send an API request.
     */
    protected request<T>(path: string, params?: KeyVal) {
        const endpoint = this.basePath.replace(/\/+$/, '') + '/' + path.replace(/^\/+/, '');
        return this.http.get<T>(endpoint, { params: this.requestParams(params) }).then(({data}) => data);
    }

}

export interface ApiClientConfig {
    /**
     * API Client.
     */
    http: AxiosInstance;

    /**
     * Blockchain.com API Key.
     */
    apiKey?: string;
}

export interface KeyVal {
    [key: string]: any;
}