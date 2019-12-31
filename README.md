### Workshop Guide:

GitHub Actions is an advanced feature of GitHub that enables automation and CI/CD natively. This workshop aims to educate you on how to implement those three use cases across your repositories on GitHub. We encourage you not to skip `Phase 1` as this is one of the most important steps to implementing actions that conform to modern best practices. Your moderator will likely be vastly out numbered during your workshop - therefore please rely heavily on the documentation provided and available on [help.github.com](https://help.github.com/en). When you are complete, feel free to ask for feedback from your moderator and remember the best way to learn is to teach!

**Phase 1: IMPORTANT Read the Docs**
  > **The goal of Phase 1 is to understand the major concepts that will be leveraged throughout the workshop. Documentation should be read carefully and referred to often.**
  1. [Understanding Actions](https://help.github.com/en/github/automating-your-workflow-with-github-actions/about-github-actions#core-concepts-for-github-actions).
  1. [Creating a workflow](https://help.github.com/en/github/automating-your-workflow-with-github-actions/configuring-a-workflow).
  1. Integrating a 3rd party service with the [repository dispatch event](https://developer.github.com/v3/repos/#create-a-repository-dispatch-event).
  1. GitHub API - [Creating an Issue](https://developer.github.com/v3/issues/).
  1. [How to use Postman](https://learning.getpostman.com/getting-started/) to send an API request.
  ![Postman](/images/postman.png)
  1. [Simple JavaScript](https://www.w3schools.com/js/js_examples.asp).
  1. Understanding [git](https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F), the distributed version control system.

**Phase 2: Create your first action**
  > **The goal of Phase 2 is to follow along on the automated lab and implement your first and most simple GitHub Action!**
  1. Go to [lab.github.com](https://lab.github.com/github/hello-github-actions!)
  1. In this course, you’ll learn how to:

- Organize and identify workflow files
- Add executable scripts
- Create workflow and action blocks
- Trigger workflows
- Discover workflow logs

**Phase 3: Repo Creation**
  > **The goal of Phase 3 is to create your own branch off the forked `master-camel-connect` repo where you can build out your own GitHub Actions. You will also be introduced to the GitHub Flow and [Git](https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F) if you haven't seen it in the past.**
  1. Fork this repository to your user account.
  ![Fork Repository](/images/fork.png)
  1. Understand [GitHub flow](https://guides.github.com/introduction/flow/). This is how you will make contributions in practice.
  1. On your copy of the repository, click the branch bar next to "New pull request". Type the name of your new branch `your-name-actions` and press `enter` to create it.
  1. On `your-name-actions` branch, click the `edit` icon on your README.md. It looks like a pencil on the top right of the rendering. 
  1. Add your name and the date to the top of your README above the workshop directions.
  1. Scroll down after you have made this change. You are prompted to "Commit changes". Add a declaritive, brief description to this change like `insert hacker name` in the title and an extended description of the change you made in the wider box.
  1.  Commit directly to the `your-name-actions` branch.
  ![Commit Changes](/images/commit-name.png)
  1. Create a Personal Access token in your user/settings/developersettings. The scope of this PAT must include Repo and workflow. PS: Don't forget to delete it after the workshop :).
  ![Token Creation](/images/token.png)
  1. CHECK IN - You should now a) Have your own version of the repository in GitHub. b) Have your name and the date at the top of your README. c) Be working off `your-name-actions` branch of your repository. d) Ready to create an action!

**Phase 4: Implement your first CI Action**
  > **The goal of this phase is to implement your first GitHub Action. This Action will run CI - with your tests on push to your feature branch.**
  1. Ensure your application runs locally when you run `npm test` in the root of your repository. Validate tests pass locally.
  2. Review your `workflow.yml` file named `unit-test-ci.yml` in `.github/workflows`.
  3. Set the workflow to run on:
    > on:
      > pull_request:
        > branches:
        > - master

    > push:
      > branches:
      >  - <your-name-actions (this is the branch you created)>
  4. In your workflow file `./.github/workflows/unit-test-ci.yml` , ensure that the action runs on ` - run: npm test`.
  ![Workflow Definition](/images/workflow.png)
  5. Uncomment the workflow file. Follow GitHub Flow to push your uncommented workflow file to your remote repo.
  6. `Pass/Fail` your workflow by modifying the `./spec/unit-tests/factServiceSpec.js` file.
  7. Review the Actions Tab for [LIVE LOGS](https://github.blog/2019-08-08-github-actions-now-supports-ci-cd/)!
  ![Actions Tab](/images/actiontab.png)
  8. Congratulations! Your Action just ran your tests when you pushed to your feature branch! Well done!

**Phase 5: Implement your first automation Action**
  > **The goal of this phase is to implement an action that creates an issue when you send the 'repository_dispatch' event to it. In this case using Postman, in reality it would be a custom webhook from your 3rd party service.**
  1. Validate that the `.github` directory has exists in your root.
  1. Review the workflow file created in `./.github/workflows/update-issues.yml`:
     - Understand the event ingest mechanism defined under `on` and which branches it is targeting. (no action required)
     - Understand how your API request is going to trigger this workflow by sending a custom event named `repository_dispatch` (no action required)
  1. An action that creates an issue in your repository when invoked has been created for you. The action is located in `.github/actions`. It is called `updates-issues-action`.
     - You can see how this action is invoked from within your `update-issues.yml` workflow line 14 under `uses`.
  1. Review the `action.yml` file in directory: `.github/actions/updates-issues-action`. This is a meta file that describes the update-issues-action.
  1. In `action.yml`, uncomment your action metadata. [Helpful documentation here](https://help.github.com/en/github/automating-your-workflow-with-github-actions/metadata-syntax-for-github-actions).
  1. Define the secrets listed in your `action.yml` file on your repo under `settings/secrets`.
  ![Secrets Tab](/images/secrets.png)
  1. Understand the `runs` meta tag operates like:
    > `runs:`
    > `using: 'node12'`
    > `main: './main/automation/update-issues.js'`
    > `main:` should point to where you are building your actual automation logic from the update-issues-action directory. This will behave like a lambda or azure function.
  1. In your text editor, uncomment the automation logic found in `update-issues-action/main/automation/update-issues.js` for creating an issue using the GitHub Issue APIs. (sorry you will need to do this line by line to keep comments intact!)
  1. Ensure your workflow file at `root/workflows/update-issues.yml` runs `on [repository_dispatch]`.
  1. Test your workflow using Postman or cURL, build your action using JS, review the Actions logs to debug.
  ![Actions Logs](/images/actionlogs.png)

**Phase 5: Implement your first CD Action**
  > **This phase is a hands-off self driven phase. It requires you to build a workflow that deploys your application to your defined infrastructure using Actions.**
  1. If you have gotten here, congratulations.
  1. [Here](https://github.com/alwell-kevin/calculator) is an example of a Node app that is deployed to Azure using an action for CD.s
  1. Leverage GitHub Actions to push your build artifact to GitHub Package Registry.
  1. Leverage another Action to pull your artifact from GPR to your Infrastructure.

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
