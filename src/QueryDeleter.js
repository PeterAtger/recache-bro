class QueryDeleter {
    searcheUrl = "https://api.prerender.io/cache-clear";
    errorMessage = document.getElementById('errorsClear');
    successMessage = document.getElementById('successClear');
    spinner = document.getElementById('statusClear');
    successImage = document.getElementById('successImageClear');

    getToken = () => {
        const token = document.getElementById('tokenClear').value

        if (!token) {
            this.errorMessage.textContent = 'Please enter token'
            return;
        }

        return token;
    }

    getQuery = () => {
        const query = document.getElementById('queryClear').value

        if (!query) {
            this.errorMessage.textContent = 'Please enter match query'
            return;
        }

        return query;
    }

    postData = (token, query, start) => ({
        "prerenderToken": token,
        "query": query,
    })

    fetchData = async (postData) => {
        const response = await fetch(this.searcheUrl, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(postData)
        });

        return { response: response.ok, statusCode: response.status }
    }


    getResponse = async () => {
        const token = this.getToken();
        const query = this.getQuery();

        let response = true;
        let statusCode = '';

        if (!token || !query) {
            return
        }

        this.spinner.classList.toggle('hidden');

        ({ response, statusCode } = await this.fetchData(this.postData(token, query, 0)));

        if (!response) {
            this.spinner.classList.toggle('hidden')
            this.errorMessage.textContent = `Something wrong happened \n Status Code: ${statusCode} `
            return;
        }

        const message = statusCode == 200 ? 'Cache clear queued' : 'Cache clear in progress'
        this.spinner.classList.toggle('hidden')
        this.successMessage.textContent = message
        this.successImage.classList.toggle('hidden')

    }

    handleSearch = () => {
        this.errorMessage.textContent = '';
        this.successMessage.textContent = '';

        if (!this.successImage.classList.contains('hidden')) {
            this.successImage.classList.toggle('hidden')
        }

        this.getResponse()
    }
}
