const validateFields = (fields) => {
  /**Se busca en el array si alguno de los campos no fue enviado,
   * en caso de que se encuentre algún campo vacio se guarda el
   * elemento encontrado dentro de la constante llamada "campoVacio"
   */
  const emptyField = fields.find((x) => !x.campo);

  /**Si alguno de los campos NO fue enviado en la petición
   * se le muestra al cliente el nombre del campo que falta
   */
  return emptyField;
};

module.exports = validateFields;
