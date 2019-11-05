### WorkShop Guide:

**Phase 1: Repo Creation**
  * Create your own repository in the WORK2009-Workflow Organization.
  * Clone your repository to local machine.
  * Clone this repository to local machine.
  * Move `master-camel-connect` files into your new repository.
  * Understand [GitHub flow](https://guides.github.com/introduction/flow/).
  * `$: git add .; $: git commit -m'initial repo push' ; $: git push origin master;` that updated repo back to GitHub.
  * Checkout to a feature branch. `$: git checkout -b your-name-actions;`

**Phase 2: Read the Docs**
  * [Understanding Actions](https://help.github.com/en/github/automating-your-workflow-with-github-actions/about-github-actions#core-concepts-for-github-actions).
  * [Creating a workflow](https://help.github.com/en/github/automating-your-workflow-with-github-actions/configuring-a-workflow).
  * Integrating a 3rd party service with the [repository dispatch event](https://developer.github.com/v3/repos/#create-a-repository-dispatch-event).
  * GitHub API - [Creating an Issue](https://developer.github.com/v3/issues/).
  * [How to use Postman](https://learning.getpostman.com/getting-started/) to send an API request.
  
**Phase 3: Implement your first Action (For Automation)**
  * Click the `Actions` tab in your repository, follow the flow to create a `.github` directory with the node starter kit.
  * Validate that the `.github` directory has been created in your root.
  * Review the workflow file created in `./.github/workflows/nodejs.yml`, understand the event ingest mechanism defined under `on`.
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
    > main should point to where you are building your actual automation logic from the update-issues-action directory. This will behave like a lambda or azure fcn.
  * In your text editor, build the automation logic for creating an issue using the GitHub Issue APIs.
    > Refer to the example code in `master-camel-connect` .github for support.
  * Modify your workflow file to run `on [repository_dispatch]`
  * Test your workflow using Postman or cURL, build your action, review the Actions logs to debug. 

 
### This repository is a simple API written in Node Express and unit tested in Jasmine. Actions are leveraged to perform ancilary functions and CI/CD to AWS. Live Demo Here  

### Workflows:
> .github/workflows

- **unit-test-ci:**
  - Run unit tests on all services when push to Develop Branch or PR on Master.

- **update-issues:**
  - Load repo secrets, then call update-issues-action on `repository_dispatch`.

### Actions:
> .github/actions

- **update-issues-action:**
  - Creates an issue for every new Azure DevOps Board Work Item that is created.
