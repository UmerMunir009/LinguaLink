'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        allowNull: false,
        primaryKey: true,
      },
      name: {
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};