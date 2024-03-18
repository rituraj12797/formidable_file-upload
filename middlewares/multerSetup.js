const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'/controllers/files/')
        // here we specify the destination of the file 
        // the first argument is an error object, which is null in this case
        // the second argument is the destination folder
        // cb is a callback function that is called when the destination is set
    },
    filename: function (req,file,cb){
        cb(null, file.originalname)
    }       

    
})

const upload = multer({storage: storage})

module.exports = upload;

// this middleware is used to upload files to the server where storage configuratioj is done using diskStorage method of multer it defines the destination and the filename of the file to be uploaded and this is usefull when we want to store the file in the server and not in the database
// upload is a middleware with the `storage` configuration that can be used in the route to parse (extract the file data) and upload the file