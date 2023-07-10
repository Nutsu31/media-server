function checkFileTypeXLS(name) {
  const fileName = name.split(".")[1];

  if (fileName.includes("xls" || "xlsx")) {
    return true;
  }
  return fileName;
}
module.exports = { checkFileTypeXLS };
