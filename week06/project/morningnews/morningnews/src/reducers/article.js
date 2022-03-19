export default function (myArticles = [], action) {
    //TODO: Change filter() to include() in addArticle type

    if (action.type === 'addArticle') {
        var articles = myArticles;
        var temp = { article: action.article }
        articles = articles.filter(elem => elem.article.title !== temp.article.title)
        articles.push(temp)
        return articles;
    }
    if (action.type === 'deleteArticle') {
        myArticles = myArticles.filter(elem => elem.article.title !== action.title)
        return myArticles
    }
    return myArticles;
}
