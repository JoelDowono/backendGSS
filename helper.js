exports.success = (message, data) => {
    return { message, data }
}

exports.getUniqueId = (articles) => {
    const articlesIds = articles.map(article => article.article_id)
    const maxId = articlesIds.reduce((a,b) => Math.max(a, b))
    const uniqueId = maxId + 1
      
    return uniqueId
}