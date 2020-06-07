import jsonResponse from '../helpers/jsonResponse';

const articleCheck = {
  checkPost_ModifyArticle(req, res, next) {
    const { title, article } = req.body;

    if (title.length < 3) {
      return jsonResponse(res, 'error', 400, {
        status: 'error',
        error: 'title input length should be more than two characters',
      });
    }

    if (article.split(' ').length <= 20) {
      return jsonResponse(res, 'error', 400, {
        status: 'error',
        error: 'article input length should be more than twenty words',
      });
    }
    return next();
  },
};

// export articleCheck to routes
export default articleCheck;
