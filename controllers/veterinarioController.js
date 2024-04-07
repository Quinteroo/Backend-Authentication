import Veterinario from '../models/Veterinario.js'
import generarJWT from '../helpers/generarJWT.js'
import checkAuth from '../middleware/authmiddleware.js'
import generarID from '../helpers/generarID.js'


const home = (req, res) => {
  res.json({ url: 'Hola desde API/VETERINARIOS 🐶' })
}

// const login = (req, res) => {
//   //  .send envía esta info enel navegador, loq ue pasa que nosotros queremos respuesta tipo jsson
//   // como es un objeto lo metemos entre llaves
//   res.json({ url: 'Hola desde API/VETERINARIOS/LOGIN 🐷' })
//   // .json para que pueda funcionar desde cualquier front
// }

const registrar = async (req, res) => {

  const { email } = req.body
  const existeUsuario = await Veterinario.findOne({ email })

  if (existeUsuario) {
    const error = new Error('Usuario ya registrado')
    return res.status(400).json({ msg: error.message })
  }


  try {
    const veterinario = new Veterinario(req.body)
    const veterinarioGuardado = await veterinario.save()
    res.json({ msg: 'Registrando usuario... 🐸' })
  } catch (error) {
    console.log(error);
  }


}

const confirmar = async (req, res) => {

  const { token } = req.params
  const usuarioConfirmar = await Veterinario.findOne({ token })

  if (!usuarioConfirmar) {
    const error = new Error('Token no válido')
    return res.status(404).json({ msg: error.message })
  }

  try {
    usuarioConfirmar.token = null
    usuarioConfirmar.confirmado = true
    await usuarioConfirmar.save()
    res.json({ msg: "Tu cuenta ha sido confirmada" })

  } catch (error) {
    console.log(error);
  }

}

const autenticar = async (req, res) => {
  const { email, password } = req.body

  const usuario = await Veterinario.findOne({ email })

  if (!usuario) {
    const error = new Error('El Usuario no existe')
    return res.status(404).json({ msg: error.message })
  }

  if (!usuario.confirmado) {
    const error = new Error('Tu cuenta no ha sido confirmada')
    return res.status(404).json({ msg: error.message })
  }

  if (await usuario.comprobarPassword(password)) {
    res.json({ token: generarJWT(usuario.id) })

  } else {
    const error = new Error('Password incorrecto')
    return res.status(404).json({ msg: error.message })
  }



}


const perfil = (req, res) => {

  const { veterinario } = req

  res.json({ perfil: veterinario })
}



const olvidePassword = async (req, res) => {
  const { email } = req.body
  const existeVeterinario = await Veterinario.findOne({ email })
  console.log(email);

  if (!existeVeterinario) {
    const error = new Error("El usuario no existe")
    console.log(error);
    return res.status(400).json({ msg: error.message })
  }

  try {
    existeVeterinario.token = generarID()
    await existeVeterinario.save()
    res.json({ msg: "Hemos enviado un email con las intrucciones" })

  } catch (error) {
    console.log(error);
  }
}


const comprobarToken = async (req, res) => {
  const { token } = req.params

  const tokenValido = await Veterinario.findOne({ token })

  if (tokenValido) {
    //token válido, el usuario existe

    res.json({ msg: "token válido y el usuario existe" })
  } else {
    const error = new Error('token NO válido')
    return res.status(400).json({ msg: error.message })
  }
}


const nuevoPassword = async (req, res) => {

  const { token } = req.params
  const { password } = req.body

  const veterinario = await Veterinario.findOne({ token })
  if (!veterinario) {
    const error = new Error('Hubo un error')
    return res.status(400).json({ msg: error.message })
  }

  try {
    veterinario.token = null
    veterinario.password = password
    await veterinario.save()
    res.json({ msg: "El password se cambió correctamente" })

  } catch (error) {
    console.log(error);
  }

}

export {
  home, registrar, confirmar, perfil, autenticar, olvidePassword, comprobarToken, nuevoPassword
}