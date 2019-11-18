import Config from 'config';

export namespace LocalConfig {
    export interface blockchain {
        apiKey: string;
        apiUrl: string;
    }
    export interface wallet {
        guid: string;
        password: string;
    }
}

export default {
    blockchain: Config.get<LocalConfig.blockchain>('blockchain'),
    wallet: Config.get<LocalConfig.wallet>('wallet'),
};