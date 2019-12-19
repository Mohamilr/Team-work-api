const jsonResponse = (res, status, code, data) => {
        res.status(code).json({
            status,
            data
        });
}

export default jsonResponse;