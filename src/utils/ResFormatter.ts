export const SuccessRes = (data = null) => {
    return {
        success: true,
        data: data
    }
}

export const ErrorRes = (message = null) => {
    return {
        error: true,
        message: message
    }
}