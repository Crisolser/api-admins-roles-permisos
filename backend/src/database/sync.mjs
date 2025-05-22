import sequelize from "./sequelize.db.mjs"
import AdminModel from "../models/admin.model.mjs"
import AdminPermissionModel from "../models/admin_permission.model.mjs";
import AdminRoleModel from "../models/admin_role.model.mjs";
import PermissionModel from "../models/permissions.model.mjs";
import RolePermissionModel from "../models/role_permission.model.mjs";

const Admin = AdminModel(sequelize);
const AdminPermission = AdminPermissionModel(sequelize)
const AdminRole = AdminRoleModel(sequelize)
const Permission = PermissionModel(sequelize)
const RolePermission = RolePermissionModel(sequelize)

export default async function syncDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ - Conexión establecida.');

    // Sincroniza estructura sin eliminar datos (usa `force: true` si quieres borrar todo)
    await sequelize.sync({ alter: true });
    console.log('✅ - Base de datos sincronizada.');

    // Inserta 2 administradores de prueba si no existen
    const count = await Admin.count();
    if (count === 0) {
      await Admin.bulkCreate([
        {
          name: 'Luis',
          paternal_surname: 'Ramírez',
          maternal_surname: 'González',
          email: 'luis@example.com',
          phone: '5551234567',
          password: 'hashed_password_1',
          account_status_id: 1,
          profile_photo: null
        },
        {
          name: 'Ana',
          paternal_surname: 'Martínez',
          maternal_surname: 'López',
          email: 'ana@example.com',
          phone: '5557654321',
          password: 'hashed_password_2',
          account_status_id: 1,
          profile_photo: null
        }
      ]);
      console.log('✅ - Administradores de prueba insertados.');
    } else {
      console.log('⚠️ - Ya existen administradores en la base de datos. No se insertaron nuevos.');
    }
  } catch (error) {
    console.error('❌ Error al conectar o sincronizar:', error);
  } finally {
    await sequelize.close();
  }
}