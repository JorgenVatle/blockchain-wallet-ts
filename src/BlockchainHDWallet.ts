import BlockchainWallet, { BlockchainWalletConfig } from './BlockchainWallet';
import { ServiceMyWalletApi } from './Interfaces/ServiceMyWalletApi';

export default class BlockchainHDWallet extends BlockchainWallet {

    /**
     * HD account xPub.
     */
    protected readonly xpub: string;

    /**
     * HD account index.
     */
    protected readonly index: number;

    /**
     * Blockchain HD Wallet constructor.
     */
    public constructor(config: BlockchainHDWalletConfig) {
        super(config);
        this.xpub = config.xpub;
        this.index = config.index;
    }

    /**
     * Fetch balance for current wallet.
     */
    public get balance() {
        return this.http.get<ServiceMyWalletApi.Response.fetchBalance>(`/merchant/${this.guid}/accounts/${this.xpub}/balance`, {
            params: this.requestParams()
        }).then(({ data }) => data);
    }

}

interface BlockchainHDWalletConfig extends BlockchainWalletConfig {
    /**
     * Account xPub
     */
    xpub: string;

    /**
     * Address index.
     */
    index: number;
}