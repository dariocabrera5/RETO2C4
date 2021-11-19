const sgMail = require("@sendgrid/mail")
const e = require("express")
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function sendEmailconfirmationHtml(customerName){
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div class = "container section">
        <label>paisaje</lable>
        <img src = "https://www.freepik.es/vector-gratis/dibujado-mano-dia-internacional-personas-mayores_9666495.htm?query=abuelos&collectionId=1928880&page=1&position=3&from_view=collections">
        <img src = "https://www.freepik.es/vector-premium/cuadro-pintura-hombre-mayor-al-aire-libre-ilustracion-al-aire-libre_12622378.htm?query=abuelos&collectionId=1928880&page=1&position=11&from_view=collections">
        <img src = "https://www.freepik.es/vector-premium/caracter-hombre-viejo-deporte-corriendo-estilo-vida-saludable_13574632.htm?query=abuelos&collectionId=1928880&page=1&position=31&from_view=collections">
        </div>
    </body>
    </html>
    `
}

function getMessage(emailParams){
    console.log(emailParams.toEmail)
    return{
        to: emailParams.toEmail,
        from: `hdcabreraq@unal.edu.co`,
        subject: "registro exitoso",
        text: `Hola ${emailParams.customerName}, te damos la bienvenida a nuestra plataforma donde podras disfrutar de varias actividades intersantes`,
        html: sendEmailconfirmationHtml(emailParams.customerName)
    }
}

module.exports={getMessage}