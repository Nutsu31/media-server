const texttract = require("textract");
const WordExtractor = require("word-extractor");
const extractor = new WordExtractor();
function readDOCXFile(file) {
  const extracted = extractor.extract(`../files/${file.originalname}`);
  extracted.then((doc) => console.log(doc.getBody()));

  //   return doc;
  // return newData;
}

module.exports = readDOCXFile;
