const fs = require("fs");
const csvParser = require("csv-parser");
const RandomPeople = require("../schemas/SiteDatas");

async function readCSVFile(file) {
  let chunk = [];

  const limit = 2000;
  return new Promise((res, rej) => {
    fs.createReadStream(`${file.path}`)
      .pipe(csvParser())
      .on("data", (data) => {
        chunk.push(data);
        if (chunk.length === limit) {
          RandomPeople.insertMany(chunk);
          chunk = [];
        }
      })
      .on("end", () => {
        res(true);
      });
  });
}

module.exports = readCSVFile;
