var getCamelFact = () => {
  var facts = [{ "camel-fact": "Camels can reach 7 feet in height (at the hump) and weigh up to 1500 pounds." }, { "camel-fact": " Camels eyes have three eyelids and two rows of eyelashes that prevent sand to enter their eyes." },{ "camel-fact": "Camels make varieties of sounds, these include groans and deep, moans, and throaty bellows." },{ "camel-fact": "Bactrian Camels have two humps rather than the single hump of their Arabian relatives. The humps function the same way—storing fat which can be converted to water and energy when sustenance is not available." },{ "camel-fact": "Bactrian Camels have two humps rather than the single hump of their Arabian relatives. The humps function the same way—storing fat which can be converted to water and energy when sustenance is not available." },{ "camel-fact": "Bactrian Camels have two humps rather than the single hump of their Arabian relatives. The humps function the same way—storing fat which can be converted to water and energy when sustenance is not available." }]

  return facts[Math.floor(Math.random()*facts.length)];
}

var getOstrichFact = () => {
  var facts = [{ "ostrich-fact": "The common ostrich, or Ostriches, is a species of large flightless bird native to certain large areas of Africa" }, { "ostrich-fact": "Ostriches are the fast runners of any birds or other two-legged animal and can sprint at over 70 km/hr, covering up to 5m in a single stride." }]

  return facts[Math.floor(Math.random()*facts.length)];
}

module.exports.getOstrichFact = getOstrichFact;


module.exports.getCamelFact = getCamelFact;
