"use strict";
const { encrypt } = require("../helpers/bycript");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const admins = require("../data/admins.json").map((e) => {
      e.createdAt = e.updatedAt = new Date();
      e.password = encrypt(e.password);
      return e;
    });

    await queryInterface.bulkInsert("Users", admins, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  },
};
