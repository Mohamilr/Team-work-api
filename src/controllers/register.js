import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../models/database';
import jsonResponse from '../helpers/jsonResponse';

// query container
let checkQuery,
    sendQuery,
    data;
    
const register = {
    async signUP(req, res) {
        // body values
        const { firstName, lastName, email, password, gender, jobRole, department, address } = req.body;

        try {
            // empty body values
            if (!firstName || !lastName || !email || !password || !gender || !jobRole || !department || !address) {
                return jsonResponse(res, 'error', 400, {
                    status: 'error',
                    error: 'all fields are required'
                });
            };

            // generate bcrypt salt
            const salt = await bcrypt.genSalt(10);
            // hash password
            const hashedPassword = await bcrypt.hash(password, salt);

            // check if user exist (email check)
            checkQuery = await pool.query(`SELECT * FROM employee WHERE email=$1`, [email]);

            // check if user exist response
            if (checkQuery.rows[0]) {
                return jsonResponse(res, 'error', 400, {
                    status: 'error',
                    error: 'user already exist'
                });
            }
            // admin signup
            else if (process.env.ADMIN_EMAIL === email && process.env.ADMIN_PASSWORD === password) {
                sendQuery = await pool.query(`INSERT INTO employee (firstName, lastName, email, password, gender, jobRole, department, address)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [firstName, lastName, email, hashedPassword, gender, jobRole, department, address]);

                data = sendQuery.rows[0];

                // generate admin token
                jwt.sign({ email, password }, process.env.SECRET_KEY, { expiresIn: '24h' }, (err, token) => {
                    return jsonResponse(res, 'success', 201, {
                        message: 'admin account successfully created',
                        token,
                        adminId: data.authorid
                    });
                });
            }
            else {
                // employee sign up
                sendQuery = await pool.query(`INSERT INTO employee (firstName, lastName, email, password, gender, jobRole, department, address)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [firstName, lastName, email, hashedPassword, gender, jobRole, department, address]);

                data = sendQuery.rows[0];

                // generate user token
                jwt.sign({ email, password }, process.env.SECRET_KEY, { expiresIn: '24h' }, (err, token) => {
                    // token response
                    return jsonResponse(res, 'success', 201, {
                        message: 'user account successfully created',
                        token,
                        authorId: data.authorid
                    });
                })
            };
        }
        catch (e) {
            console.log(e);
        };
    },
    async logIn(req, res) {
        // body values
        const { email, password } = req.body;

        try {
            // empty body values
            if (!email || !password) {
                return jsonResponse(res, 'error', 400, {
                    status: 'error',
                    error: 'all fields are required'
                });
            };

            // email check (if user with email exist) 
            sendQuery = await pool.query(`SELECT * FROM employee WHERE email=$1`, [email]);

            data = sendQuery.rows[0];

            // email check response
            if (!data) {
                return jsonResponse(res, 'error', 400, 'email does not exist, please sign up')
            };

            // compare password
            bcrypt.compare(password, data.password, (err, result) => {
                // admin login
                if (data.email === process.env.ADMIN_EMAIL && result ) {
                    jwt.sign({ email, password }, process.env.SECRET_KEY, { expiresIn: '24h' }, (err, token) => {
                        return jsonResponse(res, 'success', 201, {
                            message: 'admin successfully loged in',
                            token,
                            adminId: data.authorid
                        });
                    });
                }
                // user login
                else if (email === data.email && result) {
                    jwt.sign({ email, password }, process.env.SECRET_KEY, { expiresIn: '24h' }, (err, token) => {
                        return jsonResponse(res, 'success', 201, {
                            message: 'user successfully loged in',
                            token,
                            authorId: data.authorid
                        });
                    })
                }
                // incorrect email and password
                else {
                    jsonResponse(res, 'error', 403, 'token not generated, incorrect email or password'); 
                }
            });
        }
        catch (e) {
            console.log(e)
        };
    }
};

// export register routes
export default register;