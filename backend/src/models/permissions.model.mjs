import { DataTypes } from 'sequelize';

const PermissionModel = (sequelize) => {
  console.log("✅ - Generando tabla 'permission'")
  const Permission = sequelize.define('Permission', {
    permission_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
  }, {
    tableName: 'permissions',
    timestamps: false,
  });

  return Permission;
};

export default PermissionModel