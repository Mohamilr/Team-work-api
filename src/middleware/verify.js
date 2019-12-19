import jwt from 'jsonwebtoken';
//  token verification
    
const verifyToken = async (req, res, next) => {

    try {
        // header key and value
        const headers = req.headers['authorization'];

        const beareHeader = headers.split(' ');
        const token = beareHeader[1];

        const decoded = await jwt.verify(token, process.env.SECRET_KEY)

        console.log(decoded)

        next();
    }
    catch (e) {
        res.status(403).json({
            status: 'error',
            error: 'forbidden'
        });
    }

}

export default verifyToken;