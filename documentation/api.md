# Entry Points

## `POST /api/v1/users/signup`

Create users using _form enconde_ with the following data:

* email
* firstName
* lastName
* userName
* password

## Prueba del JWT

Para probar la autenticación del JWT en Thunder Client
Deberas seleccionar **Auth** opción **Bearer** colocando la siguiente información

- _Bearer Token_ : colocar el JWT generado
- _Token Prefix_ : colocar "authorization"