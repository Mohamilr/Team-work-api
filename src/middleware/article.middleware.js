const articleCheck = {
    checkPost_ModifyArticle (req, res ,next) {
        const { title, article } = req.body;

        if (title.length < 5) {
            return res.status(400).json({
                status: 'error',
                error: 'title input length should be more than five'
            })
        }

        if (article.length < 100) {
            return res.status(400).json({
                status: 'error',
                error: 'article input length should be more than hundred'
            })
        }
        next();
    }
}

export default articleCheck;