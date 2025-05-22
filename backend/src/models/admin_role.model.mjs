import { DataTypes } from 'sequelize';

const AdminRoleModel = (sequelize) => {
  console.log("✅ - Generando tabla 'admin_role'")
  const AdminRole = sequelize.define('AdminRole', {
    admin_role_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
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
    tableName: 'admin_role',
    timestamps: false,
  });

  // Hook para simular ON UPDATE CURRENT_TIMESTAMP
  AdminRole.beforeUpdate((instance) => {
    instance.updated_datetime = new Date();
  });

  return AdminRole;
};

export default AdminRoleModel