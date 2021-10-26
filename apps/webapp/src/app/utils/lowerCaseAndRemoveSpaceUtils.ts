const lowerCaseAndRemoveSpace = (arr) => {
  const newFeildsArr = arr.map((item) => {
    if (item === "Surname") {
      item = "SurName"
    }
    item = item
            .replace(item[0], item[0].toLowerCase())
            .replace(/\s+/g, "");
    return item
  })
  return newFeildsArr
}

export {lowerCaseAndRemoveSpace}