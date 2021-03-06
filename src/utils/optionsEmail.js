// Mensaje para enviar codigo de registro
const codeRegisterMessage = ({ codigo, primer_nombre, primer_apellido }) => ({
  subject: "C贸digo Verificaci贸n Registro 馃惗", // Objeto del mensaje
  html: `
    <table width="100%" style="background: linear-gradient(#FFD152 20%, #e5e5e5 0%); text-align:center; border-collapse: separate; border-spacing: 20px 15px;">
      <tbody>
        <tr style="display:inline-block; background-color:#FFFFFF; margin-top:30px; border-radius: 20px; font-size:15pt;">
            <td>
              <table align="center">
                <tr valign="middle">
                  <td><img src="https://drive.google.com/uc?export=view&id=1lwL9J92Tt6hMDEQ2tTPXdtea17LVkWEq" style="width:40px;"></td>
                  <td><h2 style="color:#FFD152; font-size:25pt; text-align:center">PININA</h2></td>
                <tr>
              </table>
              <p style="text-align:center;">Hola <b>${primer_nombre} ${primer_apellido}:</b></p>
              <p style="text-align:left;">Recibimos una solicitud para poder registrarte en Pinina.<br/> 
              Ingresa el siguiente c贸digo para continuar con el proceso de registro: <p/>
              <div style="background-color: #fff4c8;color:404040;padding:0.4rem; text-align:center; font-size:20pt;"><b>
              ${codigo}</b> </div>
            </td>
          <tr></tr>
      </tbody>
    </table>`, // Cuerpo del mensaje
});

// Mensaje para enviar codigo de recuperaci贸n de contrase帽a
const codePasswordMessage = ({ codigo, primer_nombre, primer_apellido }) => ({
  subject: "C贸digo Recuperaci贸n Contrase帽a 馃惗", // Objeto del mensaje
  html: `
    <table width="100%" style="background: linear-gradient(#FFD152 20%, #e5e5e5 0%); text-align:center; border-collapse: separate; border-spacing: 20px 15px;">
      <tbody>
        <tr style="display:inline-block; background-color:#FFFFFF; margin-top:30px; border-radius: 20px; font-size:15pt;">
            <td>
              <table align="center">
                <tr valign="middle">
                  <td><img src="https://drive.google.com/uc?export=view&id=1lwL9J92Tt6hMDEQ2tTPXdtea17LVkWEq" style="width:40px;"></td>
                  <td><h2 style="color:#FFD152; font-size:25pt; text-align:center">PININA</h2></td>
                <tr>
              </table>
              <p style="text-align:center;">Hola <b>${primer_nombre} ${primer_apellido}:</b></p>
              <p style="text-align:left;">Recibimos una solicitud para poder restablecer tu contrase帽a en Pinina.<br/> 
              Ingresa el siguiente c贸digo para restablecer la contrase帽a: <p/>
              <div style="background-color: #fff4c8;color:404040;padding:0.4rem; text-align:center; font-size:20pt;"><b>
              ${codigo}</b> </div>
            </td>
          <tr></tr>
      </tbody>
    </table>`, // Cuerpo del mensaje
});

const changePasswordMessage = ({ codigo, primer_nombre, primer_apellido }) => ({
  subject: "C贸digo Cambio de Contrase帽a 馃惗", // Objeto del mensaje
  html: `
    <table width="100%" style="background: linear-gradient(#FFD152 20%, #e5e5e5 0%); text-align:center; border-collapse: separate; border-spacing: 20px 15px;">
      <tbody>
        <tr style="display:inline-block; background-color:#FFFFFF; margin-top:30px; border-radius: 20px; font-size:15pt;">
            <td>
              <table align="center">
                <tr valign="middle">
                  <td><img src="https://drive.google.com/uc?export=view&id=1lwL9J92Tt6hMDEQ2tTPXdtea17LVkWEq" style="width:40px;"></td>
                  <td><h2 style="color:#FFD152; font-size:25pt; text-align:center">PININA</h2></td>
                <tr>
              </table>
              <p style="text-align:center;">Hola <b>${primer_nombre} ${primer_apellido}:</b></p>
              <p style="text-align:left;">Recibimos una solicitud para cambiar tu contrase帽a en Pinina.<br/> 
              Ingresa el siguiente c贸digo para realizar el cambio de la contrase帽a: <p/>
              <div style="background-color: #fff4c8;color:404040;padding:0.4rem; text-align:center; font-size:20pt;"><b>
              ${codigo}</b> </div>
            </td>
          <tr></tr>
      </tbody>
    </table>`, // Cuerpo del mensaje
});

const changeEmailMessage = ({ codigo, primer_nombre, primer_apellido }) => ({
  subject: "C贸digo Cambio de Correo 馃惗", // Objeto del mensaje
  html: `
    <table width="100%" style="background: linear-gradient(#FFD152 20%, #e5e5e5 0%); text-align:center; border-collapse: separate; border-spacing: 20px 15px;">
      <tbody>
        <tr style="display:inline-block; background-color:#FFFFFF; margin-top:30px; border-radius: 20px; font-size:15pt;">
            <td>
              <table align="center">
                <tr valign="middle">
                  <td><img src="https://drive.google.com/uc?export=view&id=1lwL9J92Tt6hMDEQ2tTPXdtea17LVkWEq" style="width:40px;"></td>
                  <td><h2 style="color:#FFD152; font-size:25pt; text-align:center">PININA</h2></td>
                <tr>
              </table>
              <p style="text-align:center;">Hola <b>${primer_nombre} ${primer_apellido}:</b></p>
              <p style="text-align:left;">Recibimos una solicitud para cambiar tu correo en Pinina.<br/> 
              Ingresa el siguiente c贸digo para realizar el cambio del correo: <p/>
              <div style="background-color: #fff4c8;color:404040;padding:0.4rem; text-align:center; font-size:20pt;"><b>
              ${codigo}</b> </div>
            </td>
          <tr></tr>
      </tbody>
    </table>`, // Cuerpo del mensaje
});

const registerMailMessage = ({ correo, password_temporal, primer_nombre, primer_apellido }) => ({
  subject: "隆Bienvenid@ a Pinina! - Nuevo registro 馃惗", // Objeto del mensaje
  html: `
    <table width="100%" style="background: linear-gradient(#FFD152 20%, #e5e5e5 0%); text-align:center; border-collapse: separate; border-spacing: 20px 15px;">
      <tbody>
        <tr style="display:inline-block; background-color:#FFFFFF; margin-top:30px; border-radius: 20px; font-size:15pt;">
            <td>
              <table align="center">
                <tr valign="middle">
                  <td><img src="https://drive.google.com/uc?export=view&id=1lwL9J92Tt6hMDEQ2tTPXdtea17LVkWEq" style="width:40px;"></td>
                  <td><h2 style="color:#FFD152; font-size:25pt; text-align:center">PININA</h2></td>
                <tr>
              </table>
              <p style="text-align:center;">隆Hola <b>${primer_nombre} ${primer_apellido}!:</b></p>
              <p style="text-align:left;">Se ha realizado el registro en la plataforma Pinina de manera exitosa.<br/> 
              隆Por ello te damos una cordial bienvenida! <p/>
              <p style="text-align:left;">Tus datos de acceso ser谩n los siguientes: <p/>
              <div style="background-color: #fff4c8;color:404040;padding:0.4rem; text-align:left"><b>Correo: </b>
              ${correo}</div>
              <div style="background-color: #fff4c8;color:404040;padding:0.4rem; text-align:left"><b>Contrase帽a temporal: </b>
              ${password_temporal}</div>
              <p style="text-align:left;">Se recomienda cambiar la contrase帽a cuando inicie sesi贸n por primera vez.<p/>
            </td>
          <tr></tr>
      </tbody>
    </table>`, // Cuerpo del mensaje
});

const createAdminMessage = ({ permisos, primer_nombre, primer_apellido, identificacion, razon_social, tipo_documento, nit }) => ({
  subject: "Asignaci贸n de Permisos - Pinina 馃惗", // Objeto del mensaje
  html: `
    <table width="100%" style="background: linear-gradient(#FFD152 15%, #e5e5e5 0%); text-align:center; border-collapse: separate; border-spacing: 20px 15px;">
      <tbody>
        <tr style="display:inline-block; background-color:#FFFFFF; margin-top:30px; border-radius: 20px; font-size:15pt;">
            <td>
              <table align="center">
                <tr valign="middle">
                  <td><img src="https://drive.google.com/uc?export=view&id=1lwL9J92Tt6hMDEQ2tTPXdtea17LVkWEq" style="width:40px;"></td>
                  <td><h2 style="color:#FFD152; font-size:25pt; text-align:center">PININA</h2></td>
                <tr>
              </table>
              <img src="https://drive.google.com/uc?export=view&id=1cuBZxSv_sTpd8stAus_xc2xgUP5KGw30" style="width:80%; height:auto; border-radius: 25px;">
              <p style="text-align:center;">Informaci贸n dirigida al usuario <b>${primer_nombre} ${primer_apellido}</b> - Identificaci贸n <b>${identificacion}</b> </p>
              <p style="text-align:left;">Se le asigna o modifica los siguientes permisos:<p/>
              <table width="90%" style=" margin-left: auto; margin-right: auto;">
              	${permisos}
              </table>
              <p style="text-align:left;">Asignados por:<p/>
              <table width="90%" style=" margin-left: auto; margin-right: auto;">
              	<tr>
                	<td align="center" valign="top">
                      <div style="border: 3px solid #000; border-radius: 25px; border-color: #fcff4b;color:404040;padding:0.4rem;"><b>&#128021; Veterinaria:</b></div>
                	</td>
                  	<td align="center" valign="top">
                      <div style="border: 3px solid #000; border-radius: 25px; border-color: #fcff4b;color:404040;padding:0.4rem;">${razon_social}</div>
                	</td>
                </tr>
                <tr>
                	<td align="center" valign="top">
                      <div style="border: 3px solid #000; border-radius: 25px; border-color: #fcff4b;color:404040;padding:0.4rem;"><b>Tipo documento:</b></div>
                	</td>
                  	<td align="center" valign="top">
                      <div style="border: 3px solid #000; border-radius: 25px; border-color: #fcff4b;color:404040;padding:0.4rem;">${tipo_documento}</div>
                	</td>
                </tr>
                <tr>
                	<td align="center" valign="top">
                      <div style="border: 3px solid #000; border-radius: 25px; border-color: #fcff4b;color:404040;padding:0.4rem;"><b>N煤mero documento:</b></div>
                	</td>
                  	<td align="center" valign="top">
                      <div style="border: 3px solid #000; border-radius: 25px; border-color: #fcff4b;color:404040;padding:0.4rem;">${nit}</div>
                	</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr></tr>
          <tr style="display:inline-block; background-color:#1f1f1f; border-radius: 20px; font-size:15pt;">
            <td style="color:#e5e5e5; text-align:left;">
              <h2 style="font-size:20pt; margin-bottom:0;">驴Ha ocurrido un error?</h2>
              <hr/>
              <p>Por favor comun铆cate con un administrador de la veterinaria <b>${razon_social}</b>.<p/>
            </td>
          </tr>
          <tr></tr>
      </tbody>
    </table>`, // Cuerpo del mensaje
});

const deleteAdminMessage = ({ permisos, primer_nombre, primer_apellido, identificacion, razon_social, tipo_documento, nit }) => ({
  subject: "Eliminaci贸n de Permisos - Pinina 馃惗", // Objeto del mensaje
  html: `
    <table width="100%" style="background: linear-gradient(#FFD152 15%, #e5e5e5 0%); text-align:center; border-collapse: separate; border-spacing: 20px 15px;">
      <tbody>
        <tr style="display:inline-block; background-color:#FFFFFF; margin-top:30px; border-radius: 20px; font-size:15pt;">
            <td>
              <table align="center">
                <tr valign="middle">
                  <td><img src="https://drive.google.com/uc?export=view&id=1lwL9J92Tt6hMDEQ2tTPXdtea17LVkWEq" style="width:40px;"></td>
                  <td><h2 style="color:#FFD152; font-size:25pt; text-align:center">PININA</h2></td>
                <tr>
              </table>
              <img src="https://drive.google.com/uc?export=view&id=1cuBZxSv_sTpd8stAus_xc2xgUP5KGw30" style="width:80%; height:auto; border-radius: 25px;">
              <p style="text-align:center;">Informaci贸n dirigida al usuario <b>${primer_nombre} ${primer_apellido}</b> - Identificaci贸n <b>${identificacion}</b> </p>
              <p style="text-align:left;">Se le elimina los siguientes permisos:<p/>
              <table width="90%" style=" margin-left: auto; margin-right: auto;">
              	${permisos}
              </table>
              <p style="text-align:left;">Eliminados por:<p/>
              <table width="90%" style=" margin-left: auto; margin-right: auto;">
              	<tr>
                	<td align="center" valign="top">
                      <div style="border: 3px solid #000; border-radius: 25px; border-color: #fcff4b;color:404040;padding:0.4rem;"><b>&#128021; Veterinaria:</b></div>
                	</td>
                  	<td align="center" valign="top">
                      <div style="border: 3px solid #000; border-radius: 25px; border-color: #fcff4b;color:404040;padding:0.4rem;">${razon_social}</div>
                	</td>
                </tr>
                <tr>
                	<td align="center" valign="top">
                      <div style="border: 3px solid #000; border-radius: 25px; border-color: #fcff4b;color:404040;padding:0.4rem;"><b>Tipo documento:</b></div>
                	</td>
                  	<td align="center" valign="top">
                      <div style="border: 3px solid #000; border-radius: 25px; border-color: #fcff4b;color:404040;padding:0.4rem;">${tipo_documento}</div>
                	</td>
                </tr>
                <tr>
                	<td align="center" valign="top">
                      <div style="border: 3px solid #000; border-radius: 25px; border-color: #fcff4b;color:404040;padding:0.4rem;"><b>N煤mero documento:</b></div>
                	</td>
                  	<td align="center" valign="top">
                      <div style="border: 3px solid #000; border-radius: 25px; border-color: #fcff4b;color:404040;padding:0.4rem;">${nit}</div>
                	</td>
                </tr>
              </table>
              <p style="text-align:left;">Ya no tendr谩 acceso a las funcionalidades de los permisos eliminados.<p/>
            </td>
          </tr>
          <tr></tr>
          <tr style="display:inline-block; background-color:#1f1f1f; border-radius: 20px; font-size:15pt;">
            <td style="color:#e5e5e5; text-align:left;">
              <h2 style="font-size:20pt; margin-bottom:0;">驴Ha ocurrido un error?</h2>
              <hr/>
              <p>Por favor comun铆cate con un administrador de la veterinaria <b>${razon_social}</b>.<p/>
            </td>
          </tr>
          <tr></tr>
      </tbody>
    </table>`, // Cuerpo del mensaje
});

module.exports = {
  codeRegisterMessage,
  codePasswordMessage,
  changePasswordMessage,
  changeEmailMessage,
  registerMailMessage,
  createAdminMessage,
  deleteAdminMessage
};
