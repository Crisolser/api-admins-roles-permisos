import sequelize from "./sequelize.db.mjs"
import AdminModel from "../models/admin.model.mjs"
import AdminPermissionModel from "../models/admin_permission.model.mjs";
import AdminRoleModel from "../models/admin_role.model.mjs";
import PermissionModel from "../models/permissions.model.mjs";
import RolePermissionModel from "../models/role_permission.model.mjs";
import RoleModel from "../models/role.model.mjs";

export default async function syncDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ - Conexión establecida.');

    // Definir los modelos a crear
    const Admin = AdminModel(sequelize);
    const AdminPermission = AdminPermissionModel(sequelize)
    const AdminRole = AdminRoleModel(sequelize)
    const Permission = PermissionModel(sequelize)
    const RolePermission = RolePermissionModel(sequelize)
    const Role = RoleModel(sequelize)
    // Sincroniza estructura sin eliminar datos (usa `force: true` si quieres borrar todo)
    await sequelize.sync({ alter: true });
    console.log('✅ - Base de datos sincronizada.');

    // Inserta 2 administradores de prueba si no existen
    const count = await Admin.count();
    if (count === 0) {
      await Admin.bulkCreate([
        {
          name: 'admin',
          paternal_surname: '1',
          maternal_surname: '1',
          email: 'admin@example.com',
          phone: '5555555555',
          password: 'Test#12345',
          account_status_id: 1,
          profile_photo: null
        },
        {
          name: 'admin',
          paternal_surname: '2',
          maternal_surname: '2',
          email: 'ana@example.com',
          phone: '5555555556',
          password: 'Test#12345',
          account_status_id: 1,
          profile_photo: null
        }
      ]);
      console.log('✅ - Administradores de prueba insertados.');
    } else {
      console.log('⚠️ - Ya existen administradores en la base de datos. No se insertaron nuevos.');
    }

    // Insertar permisos iniciales
    const permissionCount = await Permission.count();
    if (permissionCount === 0) {
      await Permission.bulkCreate([
        { name: 'admins.read', description: 'Obtener lista de administradores' },
        { name: 'admins.edit', description: 'Editar información del administrador' },
        { name: 'admins.create', description: 'Crear nuevo administrador' },
        { name: 'roles.create', description: 'Crear nuevo rol' },
        { name: 'roles.edit', description: 'Editar información del rol' },
        { name: 'permissions.create', description: 'Descripción actualizada' },
        { name: 'permissions.edit', description: 'Editar información del permiso' },
        { name: 'admins.access.read', description: 'Acceder a los permisos que tiene un administrador' },
        { name: 'admins.access.edit', description: 'Agregar o remover permisos a administradores' },
      ]);
      console.log('✅ - Permisos predeterminados insertados.');
    } else {
      console.log('⚠️ - Ya existen permisos en la base de datos.');
    }

    // Insertar rol inicial
    const roleCount = await Role.count();
    if (roleCount === 0) {
      await Role.create({
        name:        'Super Admin',
        description: 'Control total del sistema',
        status:      true
      });
      console.log('✅ - Rol “Super Admin” insertado.');
    } else {
      console.log('⚠️ - Ya existen roles en la base de datos.');
    }

    const superAdminRole = await Role.findOne({ where: { name: 'Super Admin' } });

    // Insertar permisos asociados al rol inicial
    if (superAdminRole) {
      // Contamos cuántas asociaciones ya existen para este rol
      const existingAssociations = await RolePermission.count({
        where: { role_id: superAdminRole.role_id }
      });
      const existinAdminRoles = await AdminRole.count({
        where: {role_id: superAdminRole.role_id, admin_id: 1}
      })

      if (existingAssociations === 0) {
        // Obtenemos todos los permisos
        const allPermissions = await Permission.findAll({ attributes: ['permission_id'] });

        // Construimos los objetos para bulkCreate
        const rolePermsBulk = allPermissions.map((perm) => ({
          role_id:       superAdminRole.role_id,
          permission_id: perm.permission_id,
          status:        true
          // created_datetime se asigna a NOW por defecto
        }));

        await RolePermission.bulkCreate(rolePermsBulk);
        console.log('✅ - Asignaciones de permisos para “Super Admin” creadas.');
      } else {
        console.log('⚠️ - Ya existen asignaciones en roles_permissions para “Super Admin”.');
      }

      if (existinAdminRoles === 0){
        await AdminRole.bulkCreate([
            {
                admin_id:1,
                role_id:superAdminRole.role_id,
                status:true
            }
        ])
        console.log('✅ - Asociación de rol “Super Admin” a administrador principal listo.');
      }else{
        console.log('⚠️ - El rol “Super Admin” ya está asociado al administrador principal.');
      }
    } else {
      console.warn('⚠️ - No se encontró el rol “Super Admin” para asignar permisos.');
    }
  } catch (error) {
    console.error('❌ Error al conectar o sincronizar:', error);
  } finally {
  }
}