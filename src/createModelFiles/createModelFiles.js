const fs = require("fs");
const path = require("path");
const Mustache = require("mustache");
const flatten = require("lodash.flattendeep");
const winston = require("winston");

const { capitalise, getTypeName } = require("./helpers");
const modelTemplate = require("../templates/model.template");

const logger = winston.createLogger({
  format: winston.format.colorize(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

const getFields = properties => {
  const fields = [];
  for (let key in properties) {
    const type = properties[key].type;
    if (type !== "object") {
      fields.push({
        name: key,
        type: getTypeName(properties[key].type)
      });
    }
  }
  return fields;
};

const getTables = (schema, parent) => {
  const tables = [];
  for (let key in schema) {
    if (schema[key].type === "object") {
      tables.push({
        model: key,
        parent,
        fields: getFields(schema[key].properties)
      });
      tables.push(getTables(schema[key].properties, key));
    }
  }
  return flatten(tables);
};

const generateModelDefinitions = tables => {
  const modelDefinitions = [];

  tables.forEach(table => {
    const definition = {
      model: capitalise(table.model),
      modelLowercase: table.model,
      relationships: [],
      fields: table.fields
    };

    if (table.parent) {
      definition.relationships.push({
        type: "belongsTo",
        target: table.parent
      });
    }

    modelDefinitions.push(definition);
  });

  return modelDefinitions;
};

const createModelFiles = (schema, outputDirName) => {
  const tables = getTables(schema);
  const modelDefinitions = generateModelDefinitions(tables);
  const outputDir = path.resolve(process.cwd(), outputDirName);

  try {
    fs.mkdirSync(outputDir);
  } catch (err) {
    logger.info(
      "Directory already exists, overwriting models in that directory"
    );
  }

  modelDefinitions.forEach(definition => {
    const outputFileName = path.format({
      dir: outputDir,
      base: `${definition.model}.js`
    });
    const output = Mustache.render(modelTemplate, definition);
    fs.writeFileSync(outputFileName, output, "utf8");
  });
};

module.exports = {
  createModelFiles,
  generateModelDefinitions,
  getTables,
  getFields
};
