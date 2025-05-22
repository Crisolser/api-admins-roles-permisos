import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { methods as AdminRepository } from "../repository/admins.repository.mjs"
import { methods as Validator} from "../validators/login.validators.mjs"

const getToken = async (credentials) => {

    Validator.validateCredentials(credentials)

    let admin = await AdminRepository.getAdminLogin(credentials)
    let adminId = admin.admin_id
    let rolePermissions  = await AdminRepository.getAdminPermissionsByRole(adminId)
    let rolePermissionsList = rolePermissions.map((row) => row.name)
    let permissions = await AdminRepository.getAdminPermissions(adminId)
    let permissionsList = permissions.map((row) => row.name)

    let realPermissions = [...new Set([...permissionsList,...rolePermissionsList])]

    const token = jwt.sign(
        {
            admin:adminId,
            permissions:realPermissions,
            exp:Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 3
        },
        process.env.SECRETJWT
    )

    console.log(token)
    
    return token

}

export const methods = {
  getToken
};