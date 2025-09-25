"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post_Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post_Like.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      Post_Like.belongsTo(models.Post, { foreignKey: "postId", as: "post" });
    }
  }
  Post_Like.init(
    {
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
    },
    {
      sequelize,
      modelName: "Post_Like",
      tableName: "post_likes"
    }
  );
  return Post_Like;
};
