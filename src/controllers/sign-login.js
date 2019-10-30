import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../models/database';


const register = {
    async signUP (req, res) {
        const { firstName, lastName, email, password, gender, jobRole, department, address} = req.body;

        try{

            if(!firstName || !lastName || !email || !password || !gender || !jobRole || !department || !address) {
                return res.status(400).json({
                    status: 'error',
                    error: 'all fields are required'
                })
            };

            const checkQuery = `SELECT * FROM employee WHERE email=$1`;
            const value = [email];
            const check = await pool.query(checkQuery, value);

            if(check.rows[0]) {
                res.status(400).json({
                    status: 'error',
                    error: 'user already exist'
                })
            }
    
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const signUpQuery = `INSERT INTO employee (firstName, lastName, email, password, gender, jobRole, department, address)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`
            const userValue = [firstName, lastName, email, hashedPassword, gender, jobRole, department, address];
            const signUpQuerys = await pool.query(signUpQuery, userValue);

            jwt.sign({ email, password }, process.env.SECRET_KEY, {expiresIn : '24h'} ,(err, token) => {
                res.status(200).json({
                    status: 'success',
                    data : {
                        message: 'user account successfully created',
                        token,
                        userId: signUpQuerys.rows[0].userid
                    }
                })
            })
        }
        catch(e) {
            console.log(e);
        }
    },
    async logIn (req, res) {
        const { email, password } = req.body;
  
        try {
            if(!email || !password) {
                return res.status(400).json({
                     status: 'error',
                     error: 'all fields are required'
                 })
             }

            const logIn = `SELECT * FROM employee WHERE email=$1`;
            const value = [email];
            const logInQuery = await pool.query(logIn, value);

            if(!logInQuery.rows[0]) {
                res.status(400).json({
                    status: 'error',
                    error: 'email does not exist, please sign up'
                })
            }

              bcrypt.compare(password, logInQuery.rows[0].password, (err, result) => {
                if(email === logInQuery.rows[0].email && result === true) {
                    jwt.sign({ email, password}, process.env.SECRET_KEY, {expiresIn : '24h'}, (err, token) => {
                     res.status(200).json({
                         status: 'success',
                         data : {
                             token,
                             userId: logInQuery.rows[0].userid
                         }
                     })
                    })
                }
                else {
                    res.status(403).json({
                        status: 'error',
                        error: 'token not generated, incorrect email or password'
                    })
                }
             })
        }
        catch(e) {
            console.log(e)
        }  
    },
    verifyToken (req, res, next) {
        const headers = req.headers['authorization'];
        
        if(typeof headers !== 'undefined'){
            const beareHeader = headers.split(' ');
            const token = beareHeader[1];
    
            req.token = token
            next();
        }
        else {
            res.status(403).json({
                status: 'error',
                error: 'forbidden'
            })
        }
    }
}

export default register;