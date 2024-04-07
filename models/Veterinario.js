import mongoose from "mongoose";
import bcrypt from "bcrypt"
import generarID from "../helpers/generarID.js";

const veterinariosSchema = mongoose.Schema({ // conforme se vayan añadiendo los registros, mongo le incluye el ID
  nombre: {  // estos son lso tipos de datos de soporta Mongoose >>>https://mongoosejs.com/docs/schematypes.html
    type: String,
    required: true, // require nos permite que se valide con la BBDD
    trim: true // elimina espacios en blanco
  },

  email: {
    type: String,
    required: true,
    unique: true, // una sola cuenta por email
    trim: true
  },

  password: {
    type: String,
    required: true,
    unique: true, // una sola cuenta por email
    trim: true
  },

  telefono: {
    type: String,
    default: null,
    trim: true
  },

  web: {
    type: String,
    default: null,
  },

  token: {  //lo vemos más adelante
    type: String,
    default: generarID()
  },

  confirmado: {
    type: Boolean, // este va a cambiar una vez cree su cuenta y verifique el enlace que le mandamos al email
    default: false
  }

})


veterinariosSchema.pre('save', async function (next) {
  if (!this.isModified("password")) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})


veterinariosSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password)
}



// así lo registramos como modelo en mongoose y sabe que tiene que interacturar con la base de datos
//                                  info          tipo esquema        colección
const Veterinario = mongoose.model('Veterinario', veterinariosSchema, 'Veterinario')


export default Veterinario