'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                email: 'admin@gmail.com',
                password: '123456',
                firstName: 'Minh',
                lastName: 'Dang',
                address: 'tphcm',
                gender: 1,
                positionId: 1, // Thay thế typeRole và keyRole bằng positionId
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
