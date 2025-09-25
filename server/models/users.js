"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Friend, {foreignKey: 'userId',as: 'user_friends'});
      User.hasMany(models.Friend, {foreignKey: 'friendId',as: 'friends'});
      User.hasMany(models.Post, {foreignKey: 'userId',as: 'posts'});
      User.hasMany(models.Saved_Post, {foreignKey: 'userId',as: 'saved_posts'});

    }
  }
  User.init(
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        allowNull: false,
        primaryKey: true,
      }, name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      password:{
        type:Sequelize.STRING,
        allowNull:false
      },
      bio:{
        type:Sequelize.STRING,
        allowNull:true,
        defaultValue:''
      },
      profilePic:{
        type:Sequelize.STRING,
        allowNull:true,
        defaultValue:''
      },
      nativeLanguage:{
        type:Sequelize.STRING,
        defaultValue:''
      },
      learningLanguage:{
        type:Sequelize.STRING,
        defaultValue:''
      },
      location:{
        type:Sequelize.STRING,
        defaultValue:''
      },
      isOnBoarded:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  return User;
};
