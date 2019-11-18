import Config from 'config';

export namespace ConfigContent {
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
    blockchain: Config.get<ConfigContent.blockchain>('blockchain'),
    wallet: Config.get<ConfigContent.wallet>('wallet'),
};