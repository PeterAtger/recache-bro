
const recacher = new Recacher();
const searcher = new QuerySearcher()

document.getElementById('recache').addEventListener(
    'click',

    () => {
        recacher.handleRecache()
    }
)

document.getElementById('search').addEventListener(
    'click',

    () => {
        searcher.handleSearch()
    }
)

