import { where, Op } from "sequelize";
import sequelize from "../../../database/sequelize.db.mjs";
import AdminModel from "../../../models/admin.model.mjs";
import AdminRoleModel from "../../../models/admin_role.model.mjs";
import RolePermissionModel from "../../../models/role_permission.model.mjs";
import PermissionModel from "../../../models/permissions.model.mjs";
import AdminPermissionModel from "../../../models/admin_permission.model.mjs";

const Admin = AdminModel(sequelize)
const AdminRole = AdminRoleModel(sequelize)
const AdminPermission = AdminPermissionModel(sequelize)
const RolePermission = RolePermissionModel(sequelize)
const Permission = PermissionModel(sequelize)

const getAdminLogin = async (credentials) => {

    const {email,password} = credentials
    const [admin] = await Admin.findAll({
        attributes:[
            "admin_id",
            "name",
            "email",
            "account_status_id"
        ],
        where:{
            email:email,
            password:password
        }
    })
    return admin.dataValues

}

const getAdminPermissionsByRole = async (adminId) => {

    const sql = `
        SELECT
            p.name
        FROM 
            admin_role ar
            LEFT JOIN
            roles_permissions rp on ar.role_id=rp.role_id
            LEFT JOIN 
            permissions p on rp.permission_id=p.permission_id
        WHERE 
            admin_id = $1
        `
    const rolePermissions = await sequelize.query(sql,{bind:[adminId],type:sequelize.QueryTypes.SELECT})
    return rolePermissions

}

const getAdminPermissions = async (adminId) => {

    const sql = `
        select 
            p.name
        from 
            admin_permission ap
            left join 
            permissions p on ap.permission_id=p.permission_id
        where 
            ap.admin_id = $1
            and ap.status = true
        `
    const adminPermission = await sequelize.query(sql,{bind:[adminId],type:sequelize.QueryTypes.SELECT})
    return adminPermission

}

export const methods = {
    getAdminLogin,
    getAdminPermissionsByRole,
    getAdminPermissions
}