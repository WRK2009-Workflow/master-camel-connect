// //Remember, this is the "meat and potatoes" of your action logic.
// //This action simply makes an api request to create an issue on your repo when run.
// //Run when repository_dispatch on this repo.
//
// // ACTIONS CORE LIBRARIES
// const request = require('request');
// const core = require('@actions/core');
//
// //GETS SECRETS FROM REPO
// const GH_TOKEN= core.getInput('GH_TOKEN');
// const GH_USER= core.getInput('GH_USER');
// const GH_REPO=core.getInput('GH_REPO');
// const GH_ORG=core.getInput('GH_ORG');
//
// // When invoked, create an issue in my repo. :)
// const updateRepo = () => {
//   var request = require("request");
//
// // SIMPLE HTTP REQUEST TO GITHUB API TO CREATE AN ISSUE IN THE ORG/REPO
//   var options = {
//     method: 'POST',
//     url: 'https://api.github.com/repos/'+GH_ORG+'/'+GH_REPO+'/issues',
//     headers: {
//       Authorization: 'Bearer ' + GH_TOKEN,
//       'Content-Type': 'application/json',
//       Accept: "application/vnd.github.symmetra-preview+json",
//       'User-Agent': "machine_user"
//     },
//     body: {
//       title: GH_USER + " Actions Issue",
//       body: "This issue was created by a repository_dispatch event. Nice work!!",
//       assignees: [GH_USER],
//       labels: ['feature']
//     },
//     json: true
//   };
//
//   request(options, function(error, response, body) {
//     if (error) throw new Error(error);
//
//     console.log("Issue Created");
//   });
//
//
// }
//
// //CALLED WHEN ACTION RUN.
// updateRepo();
