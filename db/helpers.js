const uuidv1 = require('uuid/v1')

let missingFields = (expected, actual) => {
  let missing = [];
  for (let key of expected) {
    if (!actual[key]) {
      missing.push(key)
    }
  }
  return missing;
}

let genId = () => {
  return uuidv1();
}

module.exports = {
  missingFields,
  genId
}
