import pool from '../models/database';

const register = {
    signUP (req, res) {
        const { firstName, lastName, email, password, gender, jobRole, department, address} = req.body;

        if(!firstName || !lastName || !email || !password || !gender || !jobRole || !department || !address) {
            return res.status(400).json({
                status: 'error',
                error: 'all fields are required'
            })
        };

        res.status(200).json({
            status: 'success',
            data : {
                message: 'user account created',
                token: 'string',
                userId: 1
            }
        })
    },
    logIn (req, res) {
        const { email, password } = req.body;

        if(!email || !password) {
           return res.status(400).json({
                status: 'error',
                error: 'all fields are required'
            })
        }

        res.status(200).json({
            status: 'success',
            data : {
                message: 'user account created',
                token: 'string',
                userId: 1
            }
        })
    }
}

export default register;