### This repository is a simple API written in Node Express and unit tested in Jasmine. Actions are leveraged to perform ancilary functions and CI/CD to AWS. Live Demo Here :) 

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
