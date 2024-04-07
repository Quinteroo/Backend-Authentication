import mongoose from "mongoose"

const conectarDB = async () => {
  // usamos try catch para chequear si tenemos algun error
  try {
    //                conect es uno de los métodos de mongoose quenos permite conectarnos a una base de datos
    const db = await mongoose.connect(process.env.MONGO_URI, // sustituimos el string de conexción(info sensible) por el método para leer el archivo env
      {
        // useNewUrlParser: true,  // objetos de configuración 
        // useUnifiedTopology: true,
      })

    // una vez realizada esta conexción 👆

    //           esto nos da una URL y el PUERTO donde se está conectado
    const url = `${db.connection.host}:${db.connection.port}`

    // console.log(`💚Backend conetado en URL: ${url}`);

  } catch (error) {
    console.log(`❌error: ${error.message}`);// para ser más específico indicamos que nos de el mensaje del objero ERROR
    process.exit(1) // gracias a este código nos imprime el mensaje de eror
  }
}

export default conectarDB //https://es.javascript.info/import-export