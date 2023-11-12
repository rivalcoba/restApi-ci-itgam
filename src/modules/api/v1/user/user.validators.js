
// email validator
export const emailRegex = /'[a-z0-9]+@[a-z]+\.[a-z]{2,3}'/;

// Reglas del password en Regex
export const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
export const passwordRegNoSecure = /^.{6}$/;
