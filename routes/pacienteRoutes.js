import express from 'express'
const router = express.Router()
import { agregarPaciente, obtenerPaciente, visualizarPaciente, actualizarPaciente, eliminarPaciente } from '../controllers/pacienteController.js'
import checkAuth from '../middleware/authmiddleware.js';


router.route('/')
  .post(checkAuth, agregarPaciente)
  .get(checkAuth, obtenerPaciente)

router.route('/:id')
  .get(checkAuth, visualizarPaciente)
  .put(checkAuth, actualizarPaciente)
  .delete(checkAuth, eliminarPaciente)


export default router