import mongoose, { mongo } from "mongoose";

const pacienteSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },

  propietario: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    trim: true
  },

  fecha: {
    type: Date,
    required: true,
    default: Date.now()
  },

  sintomas: {
    type: String,
    required: true,
  },

  veterinario: {
    type: mongoose.Schema.ObjectId,
    ref: 'Veterinario'
  }
}, {
  timeStamp: true
}
);

const Paciente = mongoose.model('Paciente', pacienteSchema, 'Paciente')

export default Paciente