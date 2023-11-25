// import * as Yup from 'yup';

// const userSchema = Yup.object().shape({
//   role: Yup.string(),
//   name: Yup.string().required('Es obligatorio escribir nombre'),
//   middleName: Yup.string(),
//   firstName: Yup.string().required('Escribir su apellido'),
//   secondName: Yup.string().required('Escribir su apellido'),
//   institucionalEmail: Yup.string().email(),
//   personalEmail: Yup.string().email(),
//   phone: Yup.string().min(10),
//   controlId: Yup.string().min(7).max(10),
//   gender: Yup.string().isValid,
//   career: Yup.string(),
//   password: Yup.string(),
// });

// const getProject = (req) => {
//   // Extrayendo datos de la petición
//   const { name, description } = req.body;
//   // Regresando el objeto proyecto
//   return {
//     name,
//     description,
//   };
// };
const passwordReg = /^[a-zA-Z0-9]{6}$/;

export default {
  passwordReg,
};
