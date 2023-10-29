const error404 = (req, res) => {
  res.status(404).json({ error: 'Recurso no encontrado' });
};

const generalError = (err, req, res) => {
  console.error(err); // Registrar el error en la consola
  res.status(500).json({ error: 'Error interno del servidor' });
};
export { error404, generalError };
