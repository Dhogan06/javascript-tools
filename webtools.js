import DauigiEncryption from "./encryption/encryption.js";

class DauigiWebTools {
    
    constructor() {
        this.encryption = new DauigiEncryption();
        this.cookies = new this.#Cookies(this.encryption);
    }

    #Cookies = class {

        #encryptionPattern;
        #passphrase = "Q29va2llRW5jcnlwdGlvbg==";

        /**
         * Use this to handle cookies.
         * @param {DauigiEncryption} encryption The ecryption class used for encrypting cookies.
         */
        constructor(encryption) {
            let key = encryption.generateKey(atob(this.#passphrase));
            let shift = Math.floor(Math.random() * (26 - 0 + 1)) + 0;
            let algorithm = 2;
            let pattern = key + '-' + shift + '-' + algorithm;
            this.#encryptionPattern = new this.#EncryptionPattern(pattern, atob(this.#passphrase), encryption);
        }

        /** 
         * Function to set a cookie
         * @param {string} name - The name of the cookie
         * @param {string} value - The value to set for the cookie
         * @param {number} [daysToExpire] - Optional. The number of days until the cookie expires
         */
        setCookie(name, value, daysToExpire) {
            name = this.#encryptionPattern.encrypt(name);
            value = this.#encryptionPattern.encrypt(value);
            var expires = "";
            /** If daysToExpire is provided, calculate expiry date */
            if (daysToExpire) {
                var date = new Date();
                date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000)); // Convert days to milliseconds
                expires = "; expires=" + date.toUTCString(); // Set expiry date in UTC format
            }
            /** Set the cookie with provided name, value, and expiry date (if any), and set path to root ("/") */
            document.cookie = name + "=" + value + expires + "; path=/";
        }

        /** 
         * Function to get a cookie by name
         * @param {string} name - The name of the cookie to retrieve
         * @returns {string|null} The value of the cookie if found, or null if not found
         */
        getCookie(name) {
            name = this.#encryptionPattern.encrypt(name);
            var nameEQ = name + "=";
            var cookies = document.cookie.split(';'); // Split cookies string into individual cookies
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                while (cookie.charAt(0) == ' ') {
                    cookie = cookie.substring(1, cookie.length); // Remove leading whitespace
                }
                if (cookie.indexOf(nameEQ) == 0) {
                    // If the cookie's name matches the requested name, return its value
                    return this.#encryptionPattern.decrypt(cookie.substring(nameEQ.length, cookie.length));
                }
            }
            // Return null if the cookie with the specified name is not found
            return null;
        }

        #EncryptionPattern = class {

            /**
             * 
             * @param {string} pattern The pattern to use for encryption.
             * @param {string} passphrase The passphrase to use for encryption and decryption.
             * @param {DauigiEncryption} encryption Used for encryption.
             */
            constructor(pattern, passphrase, encryption) {
                pattern = pattern.split('-');
                this.key = pattern[0];
                this.shift = pattern[1];
                this.algorithm = pattern[2];
                this.passphrase = passphrase;
                this.encryption = encryption;
            }

            /**
             * 
             * @param {string} text Data to be encrypted.
             * @returns {string} Returns a encrypted string.
             */
            encrypt(text) {
                return this.encryption.algorithms[parseInt(this.algorithm) - 1].encrypt(text, this.key, this.shift, this.passphrase);
            }

            /**
             * 
             * @param {string} text Data to be decrypted.
             * @returns {string} Returns decrypted string.
             */
            decrypt(text) {
                return this.encryption.algorithms[parseInt(this.algorithm) - 1].decrypt(text, this.key, this.shift, this.passphrase);
            }
        }
    }
}

export default DauigiWebTools;