jest.mock("fs");
const {
  getFields,
  getTables,
  generateModelDefinitions,
  createModelFiles
} = require("./createModelFiles");
const testSchema = require("../testSchemas/testSchema");
const fs = require("fs");

describe("Function: getFields", () => {
  let result;
  let resultNames;
  const testProperties = {
    operator_first_line: {
      type: "string"
    },
    operator_secondary_number: {
      type: "string"
    },
    operator_email: {
      type: "string"
    },
    operator_child: {
      type: "object",
      properties: {
        child_property: {
          type: "string"
        }
      }
    }
  };

  beforeEach(() => {
    result = getFields(testProperties);
    resultNames = result.map(item => item.name);
  });

  it("Should not return object properties as a filed", () => {
    expect(resultNames.includes("operator_child")).toBe(false);
  });

  it("Should return any non object properties as fields", () => {
    expect(resultNames.includes("operator_email")).toBe(true);
  });

  it("Should return the mapped data type", () => {
    expect(result[0].type).toBe("STRING");
  });
});

describe("Function: getTables", () => {
  let result;
  beforeEach(() => {
    result = getTables(testSchema);
  });
  it("Should return a flat array", () => {
    const resultTypes = result.map(item => Array.isArray(item));
    expect(resultTypes.includes(true)).toBe(false);
  });

  it("Should get tables from any depth", () => {
    const resultNames = result.map(item => item.model);
    expect(resultNames.includes("operator_child")).toBe(true);
    expect(resultNames.includes("operator_child_child")).toBe(true);
  });

  it("Should return the model", () => {
    expect(result[1].model).toBeDefined();
  });

  it("Should return the parent", () => {
    expect(result[0].parent).not.toBeDefined();
    expect(result[1].parent).toBeDefined();
  });

  it("Should return the fields", () => {
    expect(result[1].fields).toBeDefined();
  });
});

describe("Function: generateModelDefinitions", () => {
  let result;
  let testTables;
  beforeEach(() => {
    testTables = getTables(testSchema);
    result = generateModelDefinitions(testTables);
  });

  it("Should proudce a modelDefinition for each table", () => {
    expect(result.length).toBe(testTables.length);
  });

  it("Should add lowercase and capitalised model", () => {
    expect(result[0].model).toBe("Registration");
    expect(result[0].modelLowercase).toBe("registration");
  });

  it("Should create parent relationships", () => {
    expect(result[1].relationships[0].type).toBe("belongsTo");
    expect(result[1].relationships[0].target).toBe("registration");
  });

  it("Should not create relationship it parent doesn't exist", () => {
    expect(result[0].relationships).toEqual([]);
  });

  it("Should map the fields", () => {
    expect(result[1].fields).toEqual(testTables[1].fields);
  });
});

describe("Function: createModelFiles", () => {
  describe("When mkDirSync throws an error", () => {
    beforeEach(() => {
      fs.mkdirSync = jest.fn(() => {
        throw new Error("mkdir error");
      });
      fs.writeFileSync = jest.fn();
      createModelFiles(testSchema, "models");
    });

    it("Should catch the error and continue anyway", () => {
      expect(fs.writeFileSync).toHaveBeenCalled();
    });
  });

  describe("When mkDirSync does not throw an error", () => {
    beforeEach(() => {
      fs.mkdirSync = jest.fn();
      fs.writeFileSync = jest.fn();
      createModelFiles(testSchema, "models");
    });

    it("should make directory", () => {
      expect(fs.mkdirSync.mock.calls[0][0].includes("models")).toBe(true);
    });

    it("should make files", () => {
      expect(fs.writeFileSync.mock.calls.length).toBe(7);
    });
  });
});
