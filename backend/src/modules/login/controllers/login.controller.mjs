
import { methods as Response } from "../../../helpers/response.handler.mjs";
import { methods as AdminService} from "../services/admin.service.mjs" 

const getUserToken = async (req,res,next) => {
    try{
        let token = await AdminService.getToken(req.body)
        const message = "Usuario autenticado"
        const additionalData = {token}
        Response.successHandler(req,res,{message,additionalData})
    }
    catch(Err){
        let message = Err.message
        let statusCode = Err.statusCode || 500
        Response.successHandler(req,res,{message,statusCode})
    }
}

export const methods = {
    getUserToken
}