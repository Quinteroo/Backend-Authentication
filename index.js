import express from "express"; //cuando son dependecias que instalas, no requiere la eztension
import dotenv from "dotenv"
import conectarDB from "./config/db.js"; // cuando son archivos cerado pr¡or ti, SI
import veterinarioRoutes from './routes/veterinarioRoutes.js'
import pacienteRoutes from './routes/pacienteRoutes.js'


const app = express() //en esta variable de app vamos a tener toda la funcionalidad que requerimos para el servidor
app.use(express.json()); // Estas son funciones propias de express que transforman la información enviada como JSON al servidor de forma que podremos obtenerla en req.body.
app.use(express.urlencoded({ extended: false }));

dotenv.config() // esto nos permite que escanear el archivo sensible .env antes de ejecutar la función de conexión con la BBDD
conectarDB()

//para visualizar en el navegador
//  use es como Express maneja el routing
app.use('/api/veterinarios', veterinarioRoutes)
app.use('/api/pacientes', pacienteRoutes)

const PORT = process.env.PORT || 4000


//         3000 es para el front
app.listen(PORT, () => {   //   esto es un callback que se ejecuta si todo fue correcto
  console.log(`Servidor funcionando en el puerto ${PORT}👹`);
})

