//Remember, this is the "meat and potatoes" of your action logic.
//This action simply makes an api request to create an issue on your repo when run.
//Run when repository_dispatch on this repo.

// ACTIONS CORE LIBRARIES
const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');

// GETS INPUTS FROM ACTION
const body = core.getInput('body');
const GITHUB_TOKEN = core.getInput('gh_token');

// When invoked, create an issue in my repo. :)
const updateRepo = async () => {
  // @actions/github is a nice utility to help us make calls to the GitHub API (https://github.com/actions/toolkit/tree/master/packages/github)
  // GITHUB_TOKEN is an automatically generated secret scoped to the repo that the workflows run in (https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret)
  const github = new GitHub(GITHUB_TOKEN); 
  // SIMPLE REQUEST TO GITHUB API TO CREATE AN ISSUE IN THE ORG/REPO
  await github.issues.create({
      ...context.repo,
      title: 'Actions Generated Issue',
      body
  });

}

//CALLED WHEN ACTION RUN.
updateRepo();
