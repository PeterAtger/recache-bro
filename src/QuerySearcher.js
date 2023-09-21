class QuerySearcher {
    searcheUrl = "https://api.prerender.io/search";
    errorMessage = document.getElementById('errorsSearch');
    successMessage = document.getElementById('successSearch');
    spinner = document.getElementById('statusSearch');
    successImage = document.getElementById('successImageSearch');
    resultsArea = document.getElementById('urlsSearch');

    getToken = () => {
        const token = document.getElementById('tokenSearch').value

        if (!token) {
            this.errorMessage.textContent = 'Please enter token'
            return;
        }

        return token;
    }

    getQuery = () => {
        const query = document.getElementById('querySearch').value

        if (!query) {
            this.errorMessage.textContent = 'Please enter search query'
            return;
        }

        return query;
    }

    postData = (token, query, start) => ({
        "prerenderToken": token,
        "query": query,
        "start": start,
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
        const body = await response.json()

        return { response: response.ok, statusCode: response.status, body }
    }


    getResponse = async () => {
        const token = this.getToken();
        const query = this.getQuery();

        let response = true;
        let statusCode = '';
        let body = '';

        if (!token || !query) {
            return
        }

        this.spinner.classList.toggle('hidden');

        ({ response, statusCode, body } = await this.fetchData(this.postData(token, query, 0)));

        if (!response) {
            this.spinner.classList.toggle('hidden')
            this.errorMessage.textContent = `Something wrong happened \n Status Code: ${statusCode} `
            return;
        }

        if (body.length) {
            const urls = body.map((elem) => (elem.url))

            this.resultsArea.value = urls.join('\n');
            this.spinner.classList.toggle('hidden')
            this.successMessage.textContent = 'Great work, All Gucci'
            this.successImage.classList.toggle('hidden')

            return;
        }

        this.spinner.classList.toggle('hidden')
        this.successMessage.textContent = 'Nothing found 🤷🏻'
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
