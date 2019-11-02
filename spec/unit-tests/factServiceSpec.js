describe("#FactService", function() {
  var FactService = require('../.././source/factService.js');
  console.log("TESTING **factService**", FactService);

  it("should return a fact about camels", function() {
    var fact = FactService.getCamelFact();
    console.log("FACT from factService.js -> ", fact);
    //Expect a camel fact to return from the fact service.
    expect(fact["camel-fact"]).toContain("Camels");
  });

  it("should return a fact about ostrichs", function() {
    var fact = FactService.getOstrichFact();
    console.log("factService ", FactService);
    //Expect a camel fact to return from the fact service.
    expect(fact["ostrich-fact"]).toContain("Ostriches");
  });

});
