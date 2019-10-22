/* eslint-disable no-unused-vars */
import Sequelize, { Model } from 'sequelize';
// import bcrypt from 'bcryptjs';

class Student extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                age: Sequelize.INTEGER,
                weight: Sequelize.INTEGER,
            },
            {
                sequelize,
            }
        );

        return this;
    }
}

export default Student;
