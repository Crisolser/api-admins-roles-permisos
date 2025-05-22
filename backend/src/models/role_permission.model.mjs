import { DataTypes } from 'sequelize';

const RolePermissionModel = (sequelize) => {
  console.log("✅ - Generando tabla 'roles_permissions'")
  const RolesPermissions = sequelize.define('RolesPermissions', {
    role_permission_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN, // Equivalente al TINYINT(1)
      allowNull: false,
      defaultValue: true,
    },
    created_datetime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'roles_permissions',
    timestamps: false, // Ya tienes tu campo de fecha explícitamente
  });

  return RolesPermissions;
};

export default RolePermissionModel