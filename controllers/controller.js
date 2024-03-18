const formidable = require("formidable");
const fs = require("fs");


async function fileUpload(req, res, next){
  const form = new formidable.IncomingForm();
  let fields;
  let files;
  try {
    [fields, files] = await form.parse(req);
    console.log(fields);

    const fileNames = []; // store filesnames 

    Object.keys(files).forEach((value, index) => {
      console.log("reading file");
      const buffer = fs.readFileSync(`${files[value][0].filepath}`);
      fs.writeFileSync(`./upload/${files[value][0].originalFilename}`, buffer);
      fileNames.push(files[value][0].originalFilename);
    });

    console.log(fileNames);

    deleteFiles(fileNames); // delte files based on file names

    return res.status(200).json({
      message: "done",
    });
  } catch (error) {
    return res.status(500).json({
      messsage: "couldnt resolve request",
      errorMessage: error,
    });
  }
};

function deleteFiles(fileNames) {
  try {
      fileNames.forEach((value , index) => {
        fs.unlinkSync(`./upload/${value}`);
        console.log(`${value} has been deleted`);
      });
  } catch (error) {
    return res.status(500).json({
      messsage: "couldnt resolve request",
      errorMessage: error,
    });
  }
}


module.exports = {fileUpload , deleteFiles};