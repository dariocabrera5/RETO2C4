require('dotenv').config()
const express = require("express")
const port = process.env.port||3000
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const email = require("./email")
const sgMail = require("@sendgrid/mail")
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get("/", (req,res)=>{
    res.json({message: "sucess"})
})

app.post("/api/mail/confirmacion", async(req,res,next)=>{
    try{
        res.json(await sendEmail(req.body))
    }catch{
        next(Error)
    }
})

async function sendEmail(emailParams){
    try{
        await sgMail.send(email.getMessage(emailParams))
        console.log("el correo ha sido enviado")
    }catch{
        console.error("el correo no se pudo enviar")
        console.error(err)
    }
}
(async ()=>{
    console.log("enviando correo electronico")
    await sendEmail()
})
app.listen(port,()=>{
    console.log(`accede al sitio web dando click aqui: http://localhost:${port}`)
})
 
//SMS
client.messages
  .create({
     body: 'prueba nodejs-twilio SMS',
     from: '+18644759550',
     to: '+573164567192'
   })
  .then(message => console.log(`mensaje enviado ${message.sid}`));
//whatsapp
  client.messages
  .create({
     from: 'whatsapp:+14155238886',
     body: 'prueba nodejs-twilio whatsapp',
     to: 'whatsapp:+573164567192'
   })
  .then(message => console.log(`mensaje enviado ${message.sid}`));