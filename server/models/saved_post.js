'use strict';
const {
  Model,Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Saved_Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       Saved_Post.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
       Saved_Post.belongsTo(models.User, { foreignKey: 'postId', as: 'post' });
    }
  }
  Saved_Post.init({
     id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      postId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
  }, {
    sequelize,
    modelName: 'Saved_Post',
    tableName: 'saved_posts'
  });
  return Saved_Post;
};