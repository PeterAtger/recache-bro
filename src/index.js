
const recacher = new Recacher();
const searcher = new QuerySearcher()
const deleter = new QueryDeleter()

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

document.getElementById('deleter').addEventListener(
    'click',

    () => {
        deleter.handleSearch()
    }
)

