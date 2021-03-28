import HTTP_METHODS from "../constants/http_methods"

class FetcherService {
    // methode qui permet de faire des requetes api
    static async sendPromise(url, method = HTTP_METHODS.GET, data = {}, image = false) {
        const endpoint = "http://localhost:5001/" + url

        let options = {
            method: method,
            mode: 'cors',
            cache: 'no-cache',
            headers: !image ? {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            } : {}
        };

        if (
            method === HTTP_METHODS.POST ||
            method === HTTP_METHODS.PUT ||
            method === HTTP_METHODS.PATCH
        ) {
            options = {
                ...options,
                body: !image ? JSON.stringify(data) : data,

            };
        }

        return await fetch(endpoint, options).then(response => response.json());
    }
}

export default FetcherService;