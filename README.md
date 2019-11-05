### WorkShop Guide:

GitHub Actions is an advanced feature of GitHub that enables automation and CI/CD natively. This workshop aims to educate you on how to implement those three usecases across your repositories on GitHub. We encourage you not to skip `Phase 2` as this is one of the most important steps to implementing actions that conform to modern best practices. Your moderator will likely be vastly out numbered during your workshop - therefore please rely heavily on the documentation provided and available on [help.github.com](https://help.github.com/en). The `final state` of this workshop is available on **WRK2009-Workflow under the `workshop-complete` branch** for your convienience and reference. 

**Phase 1: Repo Creation**
  > **The goal of this phase is to create your own repo where you can build out GitHub Actions. You will also be introduced to GitHub flow and git if you haven't seen it in the past.**
  * Create your own repository in the WRK2009-Workflow Organization.
  * Clone your repository to local machine.
  * Clone `master-camel-connect` repository to local machine.
  * Move `master-camel-connect@master` files into your new repository.
  * Understand [GitHub flow](https://guides.github.com/introduction/flow/).
  * `$: git add .; $: git commit -m'initial repo push' ; $: git push origin master;` that updated repo back to GitHub.
  * Checkout to a new feature branch. `$: git checkout -b your-name-actions;`

**Phase 2: Read the Docs**
  > **The goal of this phase is to understand the major concepts that will be implemented throughout the workshop. Documentation should be read carefully and referred to often.**
  * [Understanding Actions](https://help.github.com/en/github/automating-your-workflow-with-github-actions/about-github-actions#core-concepts-for-github-actions).
  * [Creating a workflow](https://help.github.com/en/github/automating-your-workflow-with-github-actions/configuring-a-workflow).
  * Integrating a 3rd party service with the [repository dispatch event](https://developer.github.com/v3/repos/#create-a-repository-dispatch-event).
  * GitHub API - [Creating an Issue](https://developer.github.com/v3/issues/).
  * [How to use Postman](https://learning.getpostman.com/getting-started/) to send an API request.
  * [Simple JavaScript](https://www.w3schools.com/js/js_examples.asp).
  
**Phase 3: Implement your first Action (For Automation)**
  > **The goal of this phase is to implement an action that creates an issue when you send the repository_dispatch event to it. In this case using Postman, in reality it would be a custom webhook from your choice 3rd party service.**
  * Click the `Actions` tab in your repository, follow the flow to create a `.github` directory with the node starter kit.
  * Validate that the `.github` directory has been created in your root.
  * Review the workflow file created in `./.github/workflows/nodejs.yml`, understand the event ingest mechanism defined under `on` and which branches it is targeting.
  * Briefly review how your env is configured during steps execution.
  * Create an `Automation Directory` under `.github`, name it `actions`.
  * Create an `updates-issues-action` under `./.github/actions`
  * Create an `action.yml` file in the `updates-issues-action`
  * In `action.yml`, define your action metadata. [Docs HERE](https://help.github.com/en/github/automating-your-workflow-with-github-actions/metadata-syntax-for-github-actions).
  * Define your secrets on your repo under `settings/secrets`.
  * Understand the `runs` meta tag operates like:
    > `runs:`
    > `using: 'node12'`
    > `main: './main/automation/update-issues.js'`
    > `main:` should point to where you are building your actual automation logic from the update-issues-action directory. This will behave like a lambda or azure fcn.
  * In your text editor, build the automation logic for creating an issue using the GitHub Issue APIs.
    > Refer to the example code in `master-camel-connect` branch: `workshop-complete` `./.github` for support.
  * Modify your workflow file to run `on [repository_dispatch]`
  * Test your workflow using Postman or cURL, build your action using JS, review the Actions logs to debug.

**Phase 4: Implement your second Action (For CI)**
**The goal of this phase is to implement your second GitHub Action. This Action will run CI - with your tests on some event at a given branch. Documentation is lighter, beacuse if you have gotten here its likely you will find a way to succeed!**
  * Go back to github.com/your_repository.
  * Create another workflow.yml file named `unit-test-ci.yml` in `.github/workflows` for CI.
  * Set the workflow to run on:
    > on: 
      > pull_request:
        > branches:	
        > - master	

    > push:	
      > branches:	
      >  - develop
  * Ensure your application runs locally when you type `npm test`. Validate tests pass locally.
  * In your workflow file, ensure that the action runs on ` - run: npm test`.
  * Follow GitHub Flow to push this workflow file to your remote repo.
  * Test your workflow by modifying the `./spec/unit-tests` directory for tests passing/failing.
  * Read the logs, follow the documentation to debug.
**Phase 5: GitHub Actions for CD**
**This phase is a handsoff self driven phase. It requires you to build a workflow that deploys your application to your defined infrastructure using Actions.**
  * If you have gotten here, congratulations. 
  * Leverage GitHub actions to push your build artifact to GitHub Package Registry.
  * Leverage another action to pull your artifact from GPR to your Infrastructure. 

-------

### This repository is a simple API written in Node Express and unit tested in Jasmine. Actions are leveraged to perform automation functions and CI/CD to Azure.

### Specs:
> `./specs/unit-tests/factServiceSpec.js`
> `Line 16` can be modified to ensure tests pass or fail. Simply change the "expected" value of the assertion. 

### Workflows:
> `.github/workflows`

- **unit-test-ci:**
  - Run unit tests on all services when push to Develop Branch or PR on Master.

- **update-issues:**
  - Load repo secrets, then call update-issues-action on `repository_dispatch`.

### Actions:
> `.github/actions`

- **update-issues-action:**
  - Creates an issue when the repository_dispatch event is triggered. The contents of that Issue are defined by an associated work item created in a Fictitious Azure Board instance.
