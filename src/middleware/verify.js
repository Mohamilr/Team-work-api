import jwt from 'jsonwebtoken';
import pool from '../models/database';
import jsonResponse from '../helpers/jsonResponse';

//  token verification
const verifyToken = async (req, res, next) => {
  try {
    // header key and value
    const headers = req.headers.authorization.split(' ');

    const token = headers[1];

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);

    const value = [decoded.email];
    const userQuery = await pool.query('SELECT * FROM employee WHERE email=$1', value);

    const id = userQuery.rows[0].authorid;

    req.id = id;

    next();
  } catch (e) {
    jsonResponse(res, 'error', 403, {
      status: 'error',
      error: 'forbidden',
    });
  }
};

export default verifyToken;
