
class Recacher {
    recacheUrl = "https://api.prerender.io/recache";
    errorMessage = document.getElementById('errorsRecache');
    successMessage = document.getElementById('successRecache');
    spinner = document.getElementById('statusRecache');
    successImage = document.getElementById('successImage');


    getToken = () => {
        const token = document.getElementById('tokenRecache').value

        if (!token) {
            this.errorMessage.textContent = 'Please enter token'
            return;
        }

        return token;
    }

    getUrls = () => {
        const urls = document.getElementById('urlsRecache').value

        if (!urls) {
            // console.log('Here')
            this.errorMessage.textContent = 'Please enter urls'
            return;
        }

        return this.cleanUrls(urls).split('\n');
    }

    cleanUrls = (urls) => {
        return urls.replace(/ +|"|,|'/g, '');
    }

    postData = (token, urls) => ({
        "prerenderToken": token,
        "urls": urls
    })

    fetchData = async (postData) => {
        const response = await fetch(this.recacheUrl, {
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


    feedArray = async (list) => {
        const token = this.getToken();
        let response = true;
        let statusCode = '';

        if (!token) {
            return
        }

        this.spinner.classList.toggle('hidden')

        while (list.length && response) {
            ({ response, statusCode } = await this.fetchData(this.postData(token, list.splice(0, 1000))));
        }

        console.log(response, statusCode)

        if (response) {
            this.spinner.classList.toggle('hidden')
            this.successMessage.textContent = 'Great work, All Gucci'
            this.successImage.classList.toggle('hidden')
        }

        else {
            this.spinner.classList.toggle('hidden')
            this.errorMessage.textContent = `Something wrong happened \n Status Code: ${statusCode} `

        }
    }

    handleClick = () => {
        this.errorMessage.textContent = '';
        this.successMessage.textContent = '';
        if (!this.successImage.classList.contains('hidden')) {
            this.successImage.classList.toggle('hidden')
        }



        const list = this.getUrls();

        if (list) {
            this.feedArray(list)
        }
    }
}

const recacher = new Recacher;

document.getElementById('recache').addEventListener(
    'click',

    () => {
        recacher.handleClick()
    }
)

