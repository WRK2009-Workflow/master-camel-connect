const request = require('request');
const core = require('@actions/core');
const ADO_PAT= core.getInput('ADO_PAT');
const ADO_ORG= core.getInput('ADO_ORG');
const ADO_PROJ= core.getInput('ADO_PROJ');
const ADO_TEAM= core.getInput('ADO_TEAM');
const GH_TOKEN= core.getInput('GH_TOKEN');
const GH_USER= core.getInput('GH_USER');
const GH_REPO=core.getInput('GH_REPO');
const GH_ORG=core.getInput('GH_ORG');

// // TODO:
// 1. Create Issue from work item title and body. X
// 2. remove tokens and use env vars with getInput.
// 3. Make repo env var.
// 4. ensure task is coming from right project!


//GET ISSUES FROM ADO
var getWorkItems = () => {
  var workItems = [];

  console.log("Getting ADO work items");
  return new Promise(function(resolve, reject) {
    var thirtySecondsAgo = (Date.now() - 30000);

    var options = {
      method: 'POST',
      url: 'https://dev.azure.com/'+ADO_ORG+'/'+ADO_PROJ+'/'+ADO_TEAM+'/_apis/wit/wiql?api-version=5.1',
      headers: {
        Authorization: 'Basic ' + ADO_PAT,
        'Content-Type': 'application/json'
      },
      body: {
        query: 'Select [System.Id], [System.Title], [System.State], [System.WorkItemType] From WorkItems Where [System.WorkItemType] = \'Feature\''
      },
      json: true
    };

    request(options, function(error, response, body) {
      var requestReturnedCounter = 0;
      if (error) throw new Error(error);
      console.log("GOT RESP FROM WORK ITEMs");
      body.workItems.forEach((workItem, i) => {
        var reqOptions = {
          method: 'GET',
          url: workItem.url,
          headers: {
            Authorization: 'Basic ' + ADO_PAT,
            'Content-Type': 'application/json'
          },
          json: true
        };
        request(reqOptions, function(error, response, reqBody) {
          requestReturnedCounter += 1;
          // console.log("GOT RESP FROM WORK ITEM", requestReturnedCounter, body.workItems.length);

          workItems.push({
            "title": response.body.fields["System.Title"],
            "description": response.body.fields["System.Description"],
            "date": response.body.fields["System.ChangedDate"].toString()
          });

          if (requestReturnedCounter === body.workItems.length) {
            resolve(workItems)
          }
        })
      });
    });

  });
}

const updateRepo = (workItem) => {
  console.log("Writing Work Item to Repo: ", workItem);

  var request = require("request");

  var options = {
    method: 'POST',
    url: 'https://api.github.com/repos/'+GH_ORG+'/'+GH_REPO+'/issues',
    headers: {
      Authorization: 'Bearer ' + GH_TOKEN,
      'Content-Type': 'application/json',
      Accept: "application/vnd.github.symmetra-preview+json",
      'User-Agent': "machine_user"
    },
    body: {
      title: workItem.title,
      body: workItem.description,
      assignees: [GH_USER],
      labels: ['feature']
    },
    json: true
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);

    console.log(workItem.title, "-> Issue Created");
  });


}

//FIND NEW ISSUE SINCE EVENT
var getNewestWorkItem = (workItems) => {
  return new Promise(function(resolve, reject) {

    console.log("getNewestWorkItem");
    var currentDate = new Date()
    var newestWorkItem = workItems[0]
    diff = 99999999999;

    workItems.forEach((workItem, i) => {
      var workItemDate = new Date(workItem.date);
      diff2 = currentDate - workItemDate

      if (diff2 < diff) {
        diff = diff2;
        newestWorkItem = workItem;
      }
    })

    console.log("newestWorkItem:", newestWorkItem);
    resolve(newestWorkItem);
  })
}


//CREATE ISSUE IN CURRENT REPO
getWorkItems().then((workItems) => {
  getNewestWorkItem(workItems).then((newestWorkItem) => {
    updateRepo(newestWorkItem);
  })
})
