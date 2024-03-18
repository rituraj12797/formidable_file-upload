require('dotenv').config();


const express = require('express');
const cors = require('cors');
const multer = require('multer');
const databaseConnect = require('./config/dataBase');
const cloudinaryConnet = require('./config/cloudinary'); 
const upload  = require('./middlewares/multerSetup');
const UploadRoute = require('./routes/FileUpload');

 //  it specifies the destination directory where uploaded files will be stored. Here, the destination directory is set to 'uploads/', meaning that uploaded files will be saved in the uploads directory in the current working directory of your Node.js application.

// now the upload is a middle ware that can be used in the route to parse (extract the file data) and upload the file   

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ 
    origin: 'http://localhost:5173', 
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }));

app.use(express.json());
app.use(express.urlencoded({extended:true})); // this is used to parse the data from the form and the urlencoded data is stored in the req.body object

// Data Formatting: When form data is submitted with the application/x-www-form-urlencoded(default form data type) content type, the form fields and their values are URL encoded. Each field-value pair is separated by an equal sign '=', and multiple pairs are separated by an ampersand '&'.
 
// For example, if you have a form with two fields, "name" with value "John Doe" and "age" with value "30", when submitted, the data will be encoded as: `name=John%20Doe&age=30

// Decoding: On the server-side, when the data is received, it's decoded to retrieve the original form data. This decoding process is typically handled automatically by web frameworks or middleware, such as express.urlencoded() in Express, which decodes the URL-encoded data and populates req.body with the decoded form data.

databaseConnect.connect();
cloudinaryConnet.cloudinaryConnect();
// express do not a have a builtin middleware for fies so we use multer 


app.use('/api/v1/uploads',UploadRoute);

app.listen(PORT,()=>{
    console.log(PORT, 'Server is running');
})

