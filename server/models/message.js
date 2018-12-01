
export default (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    sender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Sender cannot be empty',
        },
      },
    },
    receiver: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Receiver cannot be empty',
        },
      },
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Message cannot be empty',
        },
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Message.associate = (models) => {
    // associations can be defined here
    Message.belongsTo(models.Contact, {
      foreignKey: 'senderId',
      onDelete: 'CASCADE',
    });
    Message.belongsTo(models.Contact, {
      foreignKey: 'receiverId',
      onDelete: 'CASCADE',
    });
  };
  return Message;
};
