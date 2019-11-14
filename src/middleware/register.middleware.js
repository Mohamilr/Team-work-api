const registerMiddleware = {
    checkSignUp(req, res, next) {
        const { email, password, gender, department, address } = req.body;

        // check if email value has @(mail service).com
        if (!(/[\w]+@[a-zA-Z]+\.com$/.test(email))) {
            return res.status(400).json({
                status: 'error',
                error: 'invalid email format'
            })
        }


        if (password.length < 6) {
            return res.status(400).json({
                status: 'error',
                error: 'password length should be more than six characters'
            })
        }

        if (gender.length < 3) {
            return res.status(400).json({
                status: 'error',
                error: 'gender input length should be more than three characters'
            })
        }

        if (department.length < 3) {
            return res.status(400).json({
                status: 'error',
                error: 'department input length should be more than three characters'
            })
        }

        if (address.length < 3) {
            return res.status(400).json({
                status: 'error',
                error: 'address input length should be more than three characters'
            })
        }
        next();
    }
}

// export registerMiddleware to routes
export default registerMiddleware;