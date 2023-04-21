const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
const https = require("https");
const { error } = require("console");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});




app.post("/", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    const client = require("@mailchimp/mailchimp_marketing");
    client.setConfig({
        apiKey: "0cb8f921b8b848ff502e6f5b85ada401-us21",
        server: "us21",
    });

    client.lists.addListMember("7e026924a6", {
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: name
        }
    
    })
    
    .then((response) => {
        if (response.status === "subscribed") {
            
            res.sendFile(__dirname + "/succes.html");
        } else {
            
            res.sendFile(__dirname + "/failure.html");
           
         }
     })
     .catch((error) => {
        console.log(error);
        res.sendFile(__dirname + "/failure.html");
     });
 });

 
 app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor iniciado en el puerto 3000");
});
