const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  online: {
    type: Boolean,
    defauld: false,
  }
});

UsuarioSchema.method('toJSON', function () {
  const { __v, _id, password, ...object} = this.toObject();//aqui lo que hacemos es extraer los campos que no queremos mostrar en larespuesta y usamos function para romper el this
  object.uid = _id;
  return object;
});

module.exports = model('Usuario', UsuarioSchema);