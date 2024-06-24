"use strict";
const { hashSync } = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const admins = require("../data/admins.json").map((e) => {
      e.createdAt = e.updatedAt = new Date();
      e.password = hashSync(e.password, 10);
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
