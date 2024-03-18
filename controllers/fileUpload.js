const File = require('../models/File');
const formidable = require('formidable');   
 // create a handler for local file upload 

 exports.localFileUpload = (req,res) => {
    try {
        
        // wrie the code  
        const form  =  new formidable.IncomingForm({})
        
        form.on('fileBegin',(name,file)=>{
            file.path = __dirname + '/files/' + file.name
        })
        form.on('error', (err) => {
            console.error('Formidable parsing error:', err);
        });

        
        form.on('file',function (name,file){
            console.log('Uploaded ' + file.name)
        })
        
        form.parse(req, (err, fields, files) => {
            if (err) {
              next(err);
              return;
            }
            res.json({ fields, files });
          });

   
        // the file is moved to the path specified

        res.json({message:"File uploaded successfully"})

    } catch (error) {
        console.log("this is the error ",error)
    }
 }