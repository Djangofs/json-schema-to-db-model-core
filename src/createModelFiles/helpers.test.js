const { capitalise, getTypeName } = require("./helpers");

describe("Function: getTypeName", () => {
  let result;
  beforeEach(() => {
    result = getTypeName("string");
  });

  it("Should return the appropriate type from the mapping", () => {
    expect(result).toBe("STRING");
  });
});

describe("Function: capitalise", () => {
  let result;
  beforeEach(() => {
    result = capitalise("some String");
  });

  it("Should return the string with first char capitalised", () => {
    expect(result).toBe("Some String");
  });
});
