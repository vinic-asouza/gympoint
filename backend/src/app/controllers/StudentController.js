/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            age: Yup.number()
                .integer()
                .positive()
                .required(),
            weight: Yup.number()
                .integer()
                .positive()
                .required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validator fails' });
        }

        const studentsExists = await Student.findOne({
            where: { email: req.body.email },
        });

        if (studentsExists) {
            return res.status(400).json({ error: 'Email already exists.' });
        }

        const { id, name, email, age, weight } = await Student.create(req.body);

        return res.json({
            id,
            name,
            email,
            age,
            weight
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            age: Yup.number()
                .integer()
                .positive()
                .required(),
            weight: Yup.number()
                .integer()
                .positive()
                .required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validator fails' });
        }

        const { email } = req.body;

        const student = await Student.findByPk(req.params.id);

        if (email !== student.email) {
            const studentsExists = await Student.findOne({
                where: { email },
            });

            if (studentsExists) {
                return res.status(400).json({ error: 'student already exists.' });
            }
        }

        const { id, name, age, weight } = await student.update(req.body);

        return res.json({
            id,
            name,
            email,
            age,
            weight
        });
    }
}

export default new StudentController();
