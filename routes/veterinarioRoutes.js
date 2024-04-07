// podemos ir separando lso archivos de rutas segun el archivo en el que estemos
import express from 'express'
import { home, registrar, confirmar, autenticar, perfil, olvidePassword, comprobarToken, nuevoPassword } from '../controllers/veterinarioController.js' // es ../ por que salimos de la carpeta
import checkAuth from '../middleware/authmiddleware.js'

const router = express.Router()

// cuando en el naveador pongamos localhost:4000/api/veterianarios (que es lo mismo que api/veterinarios/)
// nos lleva o devuelve (res) el send
router.get('/', home)

//     .post para enviar datos al servidor

// Área Pública
router.post('/registrar', registrar)
router.get('/confirmar/:token', confirmar)
router.post('/login', autenticar)

router.post('/olvide-password', olvidePassword)
router.get('/olvide-password/:token', comprobarToken)
router.post('/olvide-password/:token', nuevoPassword)

// Área Privada
router.get('/perfil', checkAuth, perfil)




export default router;

