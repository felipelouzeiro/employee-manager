const yup = require('yup');

const employeeSchema = yup.object({
  name: yup.string()
  .required('Name is required.'),
  email: yup.string()
  .email('Invalid e-mail.')
  .required('E-mail is required.'),
  department: yup.string()
  .required('Department is required.'),
  salary: yup.string()
  .required('Salary is required.'),
  birth_date: yup.string()
  .required('Birth_date is required.'),
  password: yup.string()
  .min(6, 'Password must be 6 or more characters.')
  .required('Password is required.')
});

const loginSchema = yup.object({
  email: yup.string()
  .email('Invalid e-mail.')
  .required('E-mail is required.'),

  password: yup.string()
  .required('Password is required.'),
});

module.exports = {
  employeeSchema,
  loginSchema,
}
