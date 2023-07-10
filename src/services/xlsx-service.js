const excelToJson = require("convert-excel-to-json");
const RandomPeople = require("../schemas/Test");
async function readXLSXFile(file) {
  let result = [];
  const limit = 500;
  const { Sheet1 } = excelToJson({
    sourceFile: `./src/files/${file.originalname}`,
    header: {
      rows: 1,
    },
    columnToKey: {
      "*": "{{columnHeader}}",
    },
  });
  for (let i = 0; i < Sheet1.length; i++) {
    result.push(Sheet1[i]);
    if (result.length === limit) {
      console.log(result);
      RandomPeople.insertMany(result);
      result = [];
    }
  }
  return true;
}

module.exports = readXLSXFile;
