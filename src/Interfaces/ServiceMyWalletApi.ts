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

        /**
         * Create a transaction.
         *
         * @link https://github.com/blockchain/service-my-wallet-v3#make-payment
         */
        export interface makePayment {
            /**
             * Bitcoin address to send to.
             */
            to: string;

            /**
             * Amount _in satoshis_ to send to the given address.
             */
            amount: number;

            /**
             * Main wallet password.
             */
            password: string;

            /**
             * Second wallet password. Required only if enabled by the wallet.
             */
            second_password?: string;

            /**
             * Blockchain.com API Key.
             */
            api_code?: string;

            /**
             * Bitcoin address or account-index to send from.
             */
            from?: string;

            /**
             * Overall transaction fee. (in satoshis)
             */
            fee?: number;

            /**
             * Transaction fee per transaction byte. (in satoshis)
             */
            fee_per_byte?: number;
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
