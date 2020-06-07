import jsonResponse from '../helpers/jsonResponse';

const registerMiddleware = {
  checkSignUp(req, res, next) {
    const { email, password } = req.body;

    // check if email value has @(mail service).com
    if (!/[\w]+@[a-zA-Z]+\.[a-zA-Z]{2}/.test(email)) {
      return jsonResponse(res, 'error', 400, {
        status: 'error',
        error: 'invalid email format',
      });
    }

    if (password.length < 6) {
      return jsonResponse(res, 'error', 400, {
        status: 'error',
        error: 'password length should be more than six characters',
      });
    }

    return next();
  },
};

// export registerMiddleware to routes
export default registerMiddleware;
