const articleCheck = {
    checkPost_ModifyArticle (req, res ,next) {
        const { title, article } = req.body;

        if (title.length < 3) {
            return res.status(400).json({
                status: 'error',
                error: 'title input length should be more than two characters'
            })
        }

        if (article.length < 20) {
            return res.status(400).json({
                status: 'error',
                error: 'article input length should be more than nineteen characters'
            })
        }
        next();
    }
}

// export articleCheck to routes
export default articleCheck;