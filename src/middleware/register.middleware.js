const registerMiddleware = {
    checkSignUp(req, res, next) {
        const { firstName, lastName, email, password, gender, jobRole, department, address } = req.body;
        if (firstName.length < 3) {
            return res.status(400).json({
                status: 'error',
                error: 'name should be more than 2 letters'
            })
        }

        if (lastName.length < 3) {
            return res.status(400).json({
                status: 'error',
                error: 'name should be more than 2 letters'
            })
        }

        if (!(/[\w]+@[a-zA-Z]+\.com$/.test(email))) {
            return res.status(400).json({
                status: 'error',
                error: 'invalid email format'
            })
        }


        if (password.length < 6) {
            return res.status(400).json({
                status: 'error',
                error: 'password length should be more than six'
            })
        }

        if (gender.length < 3) {
            return res.status(400).json({
                status: 'error',
                error: 'gender input length should be more than three'
            })
        }

        if (department.length < 3) {
            return res.status(400).json({
                status: 'error',
                error: 'department input length should be more than three'
            })
        }

        if (address.length < 3) {
            return res.status(400).json({
                status: 'error',
                error: 'address input length should be more than three'
            })
        }
        next();
    }
}

export default registerMiddleware;