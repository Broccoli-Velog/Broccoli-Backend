const createJson = (Boolean, message, queryResult, token) => {
    return {
        isSuccess: Boolean,
        message,
        result: {
            queryResult,
            token,
        } 
    }
}

export {
    createJson,
}