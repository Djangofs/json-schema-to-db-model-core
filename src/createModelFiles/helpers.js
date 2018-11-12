// returns the given type from a given typeMapping
const typeMapping = {
  number: "INTEGER",
  string: "STRING",
  boolean: "BOOLEAN"
};

const capitalise = string => string.charAt(0).toUpperCase() + string.slice(1);

const getTypeName = type => typeMapping[type];

module.exports = { capitalise, getTypeName };
