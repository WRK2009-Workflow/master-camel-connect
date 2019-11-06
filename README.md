### Workshop Guide:

GitHub Actions is an advanced feature of GitHub that enables automation and CI/CD natively. This workshop aims to educate you on how to implement those three use cases across your repositories on GitHub. We encourage you not to skip `Phase 2` as this is one of the most important steps to implementing actions that conform to modern best practices. Your moderator will likely be vastly out numbered during your workshop - therefore please rely heavily on the documentation provided and available on [help.github.com](https://help.github.com/en). The `final state` of this workshop is available [here](https://github.com/WRK2009-Workflow/master-camel-connect/tree/workshop-complete/.github) for your convienience and reference. When you are complete, feel free to ask for feedback from your moderator and remember the best way to learn is to teach!

**Phase 1: Repo Creation**
  > **The goal of this phase is to create your own repo where you can build out GitHub Actions. You will also be introduced to the GitHub Flow and [Git](https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F) if you haven't seen it in the past.**
  1. Create your own repository in the WRK2009-Workflow Organization.
    ![Organization Homepage](/images/newrepo.png)
  2. Clone your repository to local machine.
  3. Clone `master-camel-connect` repository to local machine.
  4. Move `master-camel-connect@master` files into your new repository (excluding the .github directory).
  5. Run `npm install` to install depenencies.
  6. Understand [GitHub flow](https://guides.github.com/introduction/flow/).
  7. Use the following commands, `$: git add .; $: git commit -m'initial repo push'; $: git push origin master;` this updates your remote repository on GitHub.
  8. Checkout to a new feature branch. `$: git checkout -b your-name-actions;`
  9. If `npm` or `node` have not been installed, [install them](https://www.guru99.com/download-install-node-js.html).
  10. Create a Personal Access token in your user/settings/developersettings.
  ![Token Creation](/images/token.png)

**Phase 2: Read the Docs**
  > **The goal of this phase is to understand the major concepts that will be implemented throughout the workshop. Documentation should be read carefully and referred to often.**
  - [Understanding Actions](https://help.github.com/en/github/automating-your-workflow-with-github-actions/about-github-actions#core-concepts-for-github-actions).
  - [Creating a workflow](https://help.github.com/en/github/automating-your-workflow-with-github-actions/configuring-a-workflow).
  - Integrating a 3rd party service with the [repository dispatch event](https://developer.github.com/v3/repos/#create-a-repository-dispatch-event).
  - GitHub API - [Creating an Issue](https://developer.github.com/v3/issues/).
  - [How to use Postman](https://learning.getpostman.com/getting-started/) to send an API request.
  ![Postman](/images/postman.png)
  - [Simple JavaScript](https://www.w3schools.com/js/js_examples.asp).
  - Understanding [git](https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F), the distributed version control system. 
  
**Phase 3: Implement your first Action (For Automation)**
  > **The goal of this phase is to implement an action that creates an issue when you send the 'repository_dispatch' event to it. In this case using Postman, in reality it would be a custom webhook from your 3rd party service.**
  1. Click the `Actions` tab in your repository, follow the flow to create a `.github` directory with the node starter kit: **Node.js**.
  ![Actions Tab](/images/actiontab.png)
  ![Actions Template](/images/actiontemplate.png)
  1. Validate that the `.github` directory has been created in your root.
  1. Review the workflow file created in `./.github/workflows/nodejs.yml`:
     - Understand the event ingest mechanism defined under `on` and which branches it is targeting. 
     - Understand how your workflow is invoking an external action during execution. This is key to leveraging other internal actions across your enterprise organization.
  1. Briefly review how your `env` is configured during steps execution.
  1. Create an `action.yml` file in a new directory: `.github/actions/updates-issues-action`.
  1. In `action.yml`, define your action metadata. [Helpful documentation here](https://help.github.com/en/github/automating-your-workflow-with-github-actions/metadata-syntax-for-github-actions).
  1. Define your secrets on your repo under `settings/secrets`. An example of which secrets to include, (yours may be different based on your implementation) can be found [here](https://github.com/WRK2009-Workflow/master-camel-connect/blob/workshop-complete/.github/actions/update-issues-action/action.yml)
  ![Secrets Tab](/images/secrets.png)
  1. Understand the `runs` meta tag operates like:
    > `runs:`
    > `using: 'node12'`
    > `main: './main/automation/update-issues.js'`
    > `main:` should point to where you are building your actual automation logic from the update-issues-action directory. This will behave like a lambda or azure function.
  1. In your text editor, build the automation logic for creating an issue using the GitHub Issue APIs.  
    > Refer to the example code in `master-camel-connect@workshop-complete` `./.github` for support.
  1. Modify your workflow file to run `on [repository_dispatch]`.
  1. Test your workflow using Postman or cURL, build your action using JS, review the Actions logs to debug.
  ![Actions Logs](/images/actionlogs.png)

**Phase 4: Implement your second Action (For CI)**
  > **The goal of this phase is to implement your second GitHub Action. This Action will run CI - with your tests on some event at a given branch. Documentation is lighter, beacuse if you have gotten here its likely you will find a way to succeed!**
  1. Ensure your application runs locally when you type `npm test`. Validate tests pass locally.
  2. Go back to github.com/your_repository.
  3. Create another workflow.yml file named `unit-test-ci.yml` in `.github/workflows` for CI.
  4. Set the workflow to run on:
    > on: 
      > pull_request:
        > branches:	
        > - master	

    > push:	
      > branches:	
      >  - develop
  5. In your workflow file, ensure that the action runs on ` - run: npm test`.
  ![Workflow Definition](/images/workflow.png)
  6. Follow GitHub Flow to push this workflow file to your remote repo.
  7. Test your workflow by modifying the `./spec/unit-tests` directory for tests passing/failing.
  8. Read the logs, follow the documentation to debug.

**Phase 5: GitHub Actions (For CD)**
  > **This phase is a hands-off self driven phase. It requires you to build a workflow that deploys your application to your defined infrastructure using Actions.**
  1. If you have gotten here, congratulations. 
  2. Leverage GitHub Actions to push your build artifact to GitHub Package Registry.
  3. Leverage another Action to pull your artifact from GPR to your Infrastructure. 

-------

### This repository is a simple API written in Node Express and unit tested in Jasmine. Actions are written in vanilla JS.

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
