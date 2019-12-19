const jsonResponse = {
    success(res, status, code, data) {
        res.status(code).json({
            status,
            data
        });
    },
    error(res, status, code, data) {
        res.status(code).json({
            status,
            data
        });
    }
}

export default jsonResponse;