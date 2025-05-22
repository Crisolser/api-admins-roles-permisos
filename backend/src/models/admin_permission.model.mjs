import { DataTypes } from 'sequelize';

const AdminPermissionModel = (sequelize) => {
  console.log("✅ - Generando tabla 'admin_permission'")
  const AdminPermission = sequelize.define('AdminPermission', {
    admin_permission_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN, // Equivalente a tinyint(1)
      allowNull: false,
      defaultValue: true,
    },
    created_datetime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updated_datetime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'admin_permission',
    timestamps: false, // Ya estás usando tus propias columnas de timestamps
  });

  AdminPermission.beforeUpdate((instance) => {
    instance.updated_datetime = new Date();
  });

  return AdminPermission;
};

export default AdminPermissionModel