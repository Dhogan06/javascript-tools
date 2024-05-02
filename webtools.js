class DauigiWebTools {
    
    constructor() {
        this.cookies = new this.#Cookies();
    }

    #Cookies = class {
        /** 
        * Function to set a cookie
        * @param {string} name - The name of the cookie
        * @param {string} value - The value to set for the cookie
        * @param {number} [daysToExpire] - Optional. The number of days until the cookie expires
        */
        setCookie(name, value, daysToExpire) {
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
            var nameEQ = name + "=";
            var cookies = document.cookie.split(';'); // Split cookies string into individual cookies
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                while (cookie.charAt(0) == ' ') {
                    cookie = cookie.substring(1, cookie.length); // Remove leading whitespace
                }
                if (cookie.indexOf(nameEQ) == 0) {
                    // If the cookie's name matches the requested name, return its value
                    return cookie.substring(nameEQ.length, cookie.length);
                }
            }
            // Return null if the cookie with the specified name is not found
            return null;
        }

    }
}

export default DauigiWebTools;