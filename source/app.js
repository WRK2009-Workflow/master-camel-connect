const express = require('express');
const factService = require('./factService');

const port = process.env.PORT || 3000;
const app = express();

app.all('/camels', (req, resp) => {
  console.log(req, "resp", resp);
  var camelFact = factService.getCamelFact();

  resp.setHeader('Content-Type', 'application/json');
  resp.end(JSON.stringify(camelFact["camel-fact"]));
});

app.all('/ostrich', (req, resp) => {
  console.log(req, "resp", resp);
  var ostrichFact = factService.getOstrichFact();

  resp.setHeader('Content-Type', 'application/json');
  resp.end(JSON.stringify(ostrichFact["ostrich-fact"]));
});

// Start server
app.listen(port, () => {
    console.log('Express server started on port ' + port);
})
