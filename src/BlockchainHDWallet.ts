import BlockchainWallet, { BlockchainWalletConfig } from './BlockchainWallet';

export default class BlockchainHDWallet extends BlockchainWallet {

    /**
     * HD account xPub.
     */
    protected readonly xpub: string;

    /**
     * HD account index.
     */
    protected readonly index: string;

    /**
     * Blockchain HD Wallet constructor.
     */
    public constructor(config: BlockchainHDWalletConfig) {
        super(config);
        this.xpub = config.xpub;
        this.index = config.index;
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
    index: string;
}