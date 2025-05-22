const validateCredentials = (credentians) => {
    const {email,password} = credentians

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(email);

    const error = (message) => {
        let newError = new Error(message)
        newError.statusCode = 400
        return newError
    }

    if(!email){
        throw error("El parámetro 'email' es necesario")
    }
    if(!isEmail){
        throw error("El parámetro 'email' debe ser un correo electrónico")
    }
    if(!password){
        throw error("El parámetro 'email' es necesario")
    }
}


export const methods = {
    validateCredentials
}