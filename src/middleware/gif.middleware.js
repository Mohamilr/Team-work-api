import jsonResponse from '../helpers/jsonResponse';

const gifMiddleware = {
  checkPostGif(req, res, next) {
    const image = req.files.gif;

    // check if image is a gif
    if (!image.name.match(/.(gif)$/)) {
      return jsonResponse(res, 'error', 400, {
        status: 'error',
        error: 'image upload must be a gif',
      });
    }
    return next();
  },
};

// export gifMiddleware to routes
export default gifMiddleware;
