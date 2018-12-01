
export default (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Contact already exists',
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name cannot be empty',
        },
        len: {
          args: [2, 10],
          msg: 'Length of name must be between 2 and 10',
        },
      },
    },
    number: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Contact already exists',
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Number cannot be empty',
        },
        isNumeric: {
          args: true,
          msg: 'Only Numbers are allowed',
        },
        isInt: {
          args: true,
          msg: 'Only valid integers are allowed',
        },
      },
    },
  }, {});
  Contact.associate = (models) => {
    // associations can be defined here
    Contact.hasMany(models.Message, {
      foreignKey: 'senderId',
      as: 'sentMessages',
    });
    Contact.hasMany(models.Message, {
      foreignKey: 'receiverId',
      as: 'receivedMessages',
    });
  };
  return Contact;
};
