'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Define associations here
     */
    static associate(models) {
      // A Post belongs to a User
      Post.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Post.hasMany(models.Saved_Post, {foreignKey: 'postId',as: 'saves'});
      Post.hasMany(models.Post_Like, {foreignKey: 'postId',as: 'likes'});

    }
  }

  Post.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM(
          'food',
          'music',
          'tradition',
          'fact',
          'meme',
          'educational'
        ),
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('text', 'image', 'video', 'audio'),
        allowNull: false,
      },
      mediaUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Post',
      tableName: 'posts',
      timestamps: true, 
    }
  );

  return Post;
};
