const pool = require('../../database/dbConection');

const readT_mascotas = async (id_clientes) => {
  try {
    let respuesta = await pool.query(
      `SELECT * from  public.f_readmascotas($1::numeric)`,
      [id_clientes]
    );

    if (JSON.stringify(respuesta.rows) === '[]') {
      respuesta = null;
    } else {
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const readIdT_fotos_mascotaPoridmascota = async (id_mascotas) => {
  try {
    let respuesta = await pool.query(
      `SELECT id from  public.f_getidfotomascotabyidmascota($1::numeric)`,
      [id_mascotas]
    );

    if (JSON.stringify(respuesta.rows) === '[]') {
      respuesta = null;
    } else {
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (error) {
    console.log(error);

    throw new Error(
      `Archivo mascota.controller.js->getidfotomascotabyidmascota()\n${error}`
    );
  }
};

const readT_c_mascotas = async (
  nombre_mascota,
  edad_mascota,
  escala_edad,
  esterilizado,
  id_raza,
  id_tamanio,
  id_color,
  genero_mascota,
  descripcion_mascota,
  id_clientes,
  fecha_nacimiento
) => {
  try {
    let respuesta = await pool.query(
      `SELECT * from f_createmascotas($1::text,$2::numeric,$3::numeric,$4::numeric,$5::numeric,$6::numeric,
            $7::numeric,$8::numeric,$9::text,$10::numeric,$11::text)`,
      [
        nombre_mascota,
        edad_mascota,
        escala_edad,
        esterilizado,
        id_raza,
        id_tamanio,
        id_color,
        genero_mascota,
        descripcion_mascota,
        id_clientes,
        fecha_nacimiento,
      ]
    );

    if (JSON.stringify(respuesta.rows) === '[]') {
      respuesta = null;
    } else {
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const updateT_mascotasperfil = async (
  id_mascotas,
  nombre_mascota,
  edad_mascota,
  id_raza,
  id_color,
  genero_mascota,
  id_clientes,
  fecha_nacimiento
) => {
  try {
    let respuesta = await pool.query(
      `SELECT id_mascotas,
      nombre_mascota,
      edad_mascota,
      id_raza,
      id_color,
      genero_mascota,
      id_clientes,
      fecha_nacimiento from f_updatemascotasperfil($1::numeric,$2::text,$3::numeric,$4::numeric,$5::numeric,$6::numeric,$7::numeric,$8::text)`,
      [
        id_mascotas,
        nombre_mascota,
        edad_mascota,
        id_raza,
        id_color,
        genero_mascota,
        id_clientes,
        fecha_nacimiento,
      ]
    );

    if (JSON.stringify(respuesta.rows) === '[]') {
      respuesta = null;
    } else {
      respuesta = respuesta.rows;
    }
    return respuesta;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const updateT_mascotas = async (
  id_mascotas,
  nombre_mascota,
  edad_mascota,
  escala_edad,
  esterilizado,
  id_raza,
  id_tamanio,
  id_color,
  genero_mascota,
  descripcion_mascota,
  id_clientes,
  fecha_nacimiento
) => {
  try {
    let respuesta = await pool.query(
      `SELECT * from f_updatemascotas($1::numeric,$2::text,$3::numeric,$4::numeric,$5::numeric,$6::numeric,$7::numeric,
            $8::numeric,$9::numeric,$10::text,$11::numeric,$12::text)`,
      [
        id_mascotas,
        nombre_mascota,
        edad_mascota,
        escala_edad,
        esterilizado,
        id_raza,
        id_tamanio,
        id_color,
        genero_mascota,
        descripcion_mascota,
        id_clientes,
        fecha_nacimiento,
      ]
    );

    if (JSON.stringify(respuesta.rows) === '[]') {
      respuesta = null;
    } else {
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const obtenerMascotaPorId = async (id) => {
  try {
    let respuesta = await pool.query(
      'SELECT * from  public.f_readmascotasid($1::numeric) ',
      [id]
    );

    if (JSON.stringify(respuesta.rows) === '[]') {
      respuesta = null;
    } else {
      respuesta = respuesta.rows[0];
    }

    return respuesta;
  } catch (err) {
    throw new Error(
      `Archivo mascota.controller.js->compararfotmasco()\n${err}`
    );
  }
};

const compararfotmasco = async (id_mascota, consecutivo) => {
  try {
    let respuesta = await pool.query(
      ' SELECT * from  public.f_compararfotosmascota($1::numeric, $2::numeric) ',
      [id_mascota, consecutivo]
    );

    if (JSON.stringify(respuesta.rows) === '[]') {
      respuesta = null;
    } else {
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (err) {
    throw new Error(
      `Archivo mascota.controller.js->compararfotmasco()\n${err}`
    );
  }
};

const fotosPorId = async (id) => {
  try {
    let respuesta = await pool.query(
      ` SELECT * FROM f_readfotosforId( $1::numeric) `,
      [id]
    );

    /**Se verifica si la respuesta es vacio
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = 0;
    } else {
      /**En caso contrario quiere decir que si arrojó 1 registro
       * se retorna el array */
      respuesta = respuesta.rows;
    }
    return respuesta;
  } catch (err) {
    throw new Error(
      `Contar mascota.controller.js -> obtenerFoto()\n${err}`
    );
  }
};

const crear = async (ruta_guardado, nombre_imagen, id_mascota, consecutivo) => {
  try {
    let id = false;

    const respuesta = await pool.query(
      `SELECT * from public.f_insert_t_fotos_masotas($1::text,$2::text,$3::numeric, $4::numeric)`,
      [ruta_guardado, nombre_imagen, id_mascota, consecutivo]
    );

    /**Si rowCount es igual a 1 quiere decir que el INSERT
     * se ejecutó correctamente */
    if (respuesta.rowCount === 1) {
      /**Se obtiene el id del registro que se acaba
       * de insertar
       */
      id = respuesta.rows[0].id;
      // console.log(id)
    } else {
      /**En caso contrario quiere decir que rowCount NO vale 1,
       * y el INSERT no se ejecutó
       */
      //Se le asigna 0
      id = 0;
    }

    return id;
  } catch (err) {
    throw new Error(`Archivo mascota.controller.js -> crear()\n${err}`);
  }
};

const actualizarfotomascota = async (
  id_mascotas,
  consecutivo,
  nombre_imagen,
  ruta_guardado
) => {
  try {
    let respuesta = await pool.query(
      ' SELECT * from	f_update_t_fotos_masotas($1::text,$2::text, $3::numeric,$4::numeric)',
      [ruta_guardado, nombre_imagen, id_mascotas, consecutivo]
    );

    if (JSON.stringify(respuesta.rows) === '[]') {
      respuesta = null;
    } else {
      respuesta = respuesta.rows[0].id;
    }
    console.log(respuesta);
    return respuesta;
  } catch (err) {
    throw new Error(
      `Archivo mascota.controller.js->compararfotouser()\n${err}`
    );
  }
};

const readT_razas = async () => {
  try {
    let respuesta = await pool.query(
      `SELECT * FROM public.f_read_razamascotas()`
    );

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(`mascota.controller.js->readT_razas()\n${err}`);
  }
};

const readT_tiposmascotas = async () => {
  try {
    let respuesta = await pool.query(
      `SELECT * FROM public.f_read_tipomascotas()`
    );

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(`mascota.controller.js->readT_tiposmascotas()\n${err}`);
  }
};

const readT_generomascota = async () => {
  try {
    let respuesta = await pool.query(
      `SELECT * FROM public.f_read_generomascota()`
    );

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(`mascota.controller.js->readT_generomascota()\n${err}`);
  }
};

const readT_coloresmascotas = async () => {
  try {
    let respuesta = await pool.query(
      `SELECT * FROM public.f_read_coloresmascotas()`
    );

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(`mascota.controller.js->readT_coloresmascotas()\n${err}`);
  }
};

const readT_tamaniomascotas = async () => {
  try {
    let respuesta = await pool.query(
      `SELECT * FROM public.f_read_tamaniomascotas()`
    );

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(`mascota.controller.js->readT_tamaniomascotas()\n${err}`);
  }
};

const readT_colores_tipomascota = async (id_tipo_mascota) => {
  try {

    let respuesta = await pool.query(
      `SELECT * from public.f_readcolores_tipomascota($1::numeric)`,
      [id_tipo_mascota]
    );

    //Verificar que el resultado de la consulta no arroja ningún mensaje

    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(`mascota.controller.js->readT_colores_tipomascota()\n${err}`);
  }
};

const subirFotoPerfilMascota = async (req) => {
  //método para subir foto de perfil de mascota
  try {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.imagen) {

      return null;

    } else {

      let out;

      if (req.files.imagen[1] == undefined) {
        console.log('1 foto')
        const imagen = req.files.imagen;
        const uploadPath = path.join('src/uploads/', imagen.name);
        const nombre_imagen = imagen.name;
        imagen.mv(uploadPath, (err) => {
          if (err) {
            throw new Error("Error subiendo imagen " + err)
          }
          console.log('File uploaded to ' + uploadPath);
        })
        const imagenSubida = await pool.query('SELECT * FROM f_insert_foto_perfil_mascota($1,$2,$3,$4)', [uploadPath, nombre_imagen, id_mascotas, 1]);
      } else {
        for (let i = 0; i < Object.keys(req.files.imagen).length; i++) {
          if ((i + 1) <= 5) {
            console.log(i + 1)
            const imagen = req.files.imagen[i];
            const uploadPath = path.join('src/uploads/', imagen.name);

            const nombre_imagen = imagen.name;

            const imagenSubida = await pool.query('SELECT * FROM f_insert_foto_perfil_mascota($1,$2,$3,$4)', [uploadPath, nombre_imagen, id_mascotas, (i + 1)]);
            imagen.mv(uploadPath, (err) => {
              if (err) {
                throw new Error("Error subiendo imagen " + err)
              }
              console.log('File uploaded to ' + uploadPath);

            })

            out += imagenSubida;

          } else {

            return 'limite de fotos alcanzado';
            
          }
        }
      }

      return out;

    }

  } catch (error) {
    throw new Error(`Error en subirFotoPerfilMascota ${error}`);
  }

}

module.exports = {
  readT_mascotas,
  readT_c_mascotas,
  readIdT_fotos_mascotaPoridmascota,
  updateT_mascotas,
  obtenerMascotaPorId,
  compararfotmasco,
  fotosPorId,
  crear,
  actualizarfotomascota,
  updateT_mascotasperfil,
  readT_razas,
  readT_tiposmascotas,
  readT_generomascota,
  readT_coloresmascotas,
  readT_tamaniomascotas,
  readT_colores_tipomascota,
  subirFotoPerfilMascota
};
