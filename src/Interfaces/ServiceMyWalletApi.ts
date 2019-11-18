export namespace ServiceMyWalletApi {

    /**
     * Request parameters.
     */
    export namespace Params {
        /**
         * Create wallet.
         *
         * @link https://github.com/blockchain/service-my-wallet-v3#creating-a-new-blockchain-wallet
         */
        export interface createWallet {
            /**
             * Main wallet password.
             */
            password: string;

            /**
             * Blockchain.com API key.
             */
            api_code?: string;

            /**
             * Private key to import into wallet as first address.
             */
            priv?: string;

            /**
             * Label to give the first address generated in the wallet.
             */
            label?: string;

            /**
             * Email address to associate with the newly created wallet.
             */
            email?: string;
        }
    }

    /**
     * Responses.
     */
    export namespace Response {
        /**
         * Wallet create request response.
         */
        export interface createWallet {
            /**
             * Wallet ID.
             */
            guid: string;

            /**
             * Bitcoin wallet address.
             */
            address: string;

            /**
             * Label you associated with your wallet.
             */
            label?: string;
        }
    }

}
