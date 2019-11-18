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
            password?: string;

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

        /**
         * Create a transaction with multiple recipients.
         *
         * @link https://github.com/blockchain/service-my-wallet-v3#send-to-many
         */
        export interface sendToMany {
            /**
             * List of Bitcoin addresses to send to and the amount in satoshis.
             * Key being the address, and value being the amount of satoshis to send.
             * E.g. { '1A8JiWcwvpY7tAopUkSnGuEYHmzGYfZPiq': 100000, '18fyqiZzndTxdVo7g9ouRogB4uFj86JJiy': 50000 }
             */
            recipients: { [address: string]: number };

            /**
             * Main wallet password.
             */
            password?: string;

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

        /**
         * Create new HD wallet.
         *
         * @link https://github.com/blockchain/service-my-wallet-v3#create-new-hd-account
         */
        export interface createHDAccount {
            /**
             * Blockchain.com wallet password.
             */
            password?: string;

            /**
             * Blockchain.com API Key.
             */
            api_code?: string;

            /**
             * Label to assign to the HD wallet.
             */
            label?: string;
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

        /**
         * Wallet make payment response.
         */
        export interface makePayment {
            /**
             * Bitcoin address you sent a payment to.
             */
            to: [string];

            /**
             * Bitcoin address you sent a payment from.
             */
            from: string[];

            /**
             * Number of satoshis to each 'to[]' address. (in satoshis)
             */
            amounts: [number];

            /**
             * Bitcoin transaction fee. (in satoshis)
             */
            fee: number;

            /**
             * Bitcoin transaction hash.
             */
            txid: string;

            /**
             * Whether or not the payment was successful.
             */
            success: boolean;
        }

        /**
         * Wallet make payment response.
         */
        export interface sendToMany {
            /**
             * Bitcoin addresses you sent Bitcoin to.
             */
            to: string[];

            /**
             * Bitcoin addresses you sent Bitcoin from.
             */
            from: string[];

            /**
             * Number of satoshis to each 'to[]' address. (in satoshis)
             */
            amounts: number[];

            /**
             * Bitcoin transaction fee. (in satoshis)
             */
            fee: number;

            /**
             * Bitcoin transaction hash.
             */
            txid: string;

            /**
             * Whether or not the payment was successful.
             */
            success: boolean;
        }

        export interface fetchBalance {
            /**
             * Bitcoin wallet balance in satoshis.
             */
            balance: number;
        }
    }

}
