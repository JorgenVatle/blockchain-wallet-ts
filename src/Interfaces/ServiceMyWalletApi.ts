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

            /**
             * Whether or not to create a HD wallet.
             */
            hd?: boolean;
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

        /**
         * Fetch balance for current wallet.
         */
        export interface fetchBalance {
            /**
             * Bitcoin wallet balance in satoshis.
             */
            balance: number;
        }

        /**
         * HD wallet account list.
         */
        export type accounts = HDAccount[];

        /**
         * Wallet xpub list.
         */
        export type xpubs = string[];

        /**
         * Enable HD wallet functionality.
         */
        export interface enableHD extends HDAccount {
            /**
             * Wallet label.
             */
            label: string;
        }

        /**
         * HD wallet creation response.
         */
        export interface createHD {
            /**
             * Whether or not the account has been archived. (can be un-archived at any time)
             */
            archived: boolean;

            /**
             * xPriv of HD account.
             */
            xpriv: string;

            /**
             * xPub of HD account.
             */
            xpub: string;

            /**
             * Labels assigned to account addresses.
             */
            addressLabels: string[];

            /**
             * Wallet account cache.
             * Contains two xPubs, each are different and not matching the xPub provided at the root of the response.
             */
            cache: {
                /**
                 * xPub (purpose unknown, not documented by Blockchain.com)
                 */
                receiveAccount: string;

                /**
                 * xPub (purpose unknown, not documented by Blockchain.com).
                 */
                changeAccount: string;
            }
        }

        /**
         * Single HD wallet fetch response.
         */
        export interface getHD extends enableHD {}
    }

}

export interface HDAccount {
    /**
     * Bitcoin account balance.
     */
    balance: null | number;

    /**
     * Address index.
     */
    index: number;

    /**
     * Whether or not the wallet address has been archived.
     */
    archived: boolean;

    /**
     * xPub for current wallet.
     */
    extendedPublicKey: string;

    /**
     * xPriv for current wallet.
     */
    extendedPrivateKey: string;

    /**
     * Address receive index. (todo: determine difference between 'index')
     */
    receiveIndex: number;

    /**
     * Index of address with most recent send/receive activity.
     */
    lastUsedReceiveIndex: null | number;

    /**
     * Wallet Bitcoin address.
     */
    receiveAddress: string;
}
