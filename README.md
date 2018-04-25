# Pesposa Web Application

[![CircleCI](https://circleci.com/bb/pesposa/webapp.svg?style=svg&circle-token=672fc70422242f2252d394f0f1a33ef08a27e830)](https://circleci.com/bb/pesposa/webapp)

## 1. Code guidelines

Our folder structure is based on atomic design. Read more about atomic design
[here](http://bradfrost.com/blog/post/atomic-web-design/) and
[here](https://medium.com/joeydinardo/a-brief-look-at-atomic-components-39cbe71d38b5),
and find an example project [here](https://github.com/diegohaz/arc).

### Atomic design

`src/components` is split into the following folders:

* `src/components/atoms`: An **atom** is the most basic component, that renders
  only HTML tags (i.e., they don't import other components). An atom should
  represent the smallest possible component within which it wouldn’t make sense
  to abstract further. For example, an input label, or a button.
* `src/components/molecules`: A **molecule** is a group of atoms bonded together
  to form a small and re-usable UI element. For example a `SearchForm` molecule
  is the group of the following atoms: `InputLabel`, `Input`, and `Button`.
* `src/components/organisms`: An **organism** is a group of molecules joined
  together to form a relatively complex, distinct section of an interface. For
  example, we can have a `Header` that consists of the following molecules:
  `Logo`, `Navigation`, and `SearchForm`. Organisms can use other organisms.
* `src/components/smarts`: A **smart** (or a container) is mostly responsible
  for connecting other components to the redux state, as well as dispatching
  actions to the store. It has minimal rendering logic, but it can act as a
  **smart organism** and render multiple organisms/molecules/atoms.
* `src/components/hocs`: A **hoc** is a
  [Higher-Order Component](https://reactjs.org/docs/higher-order-components.html).
* `src/pages`: A **page** is a the whole UI that corresponds to a specific
  route.

Unit testing files should be placed in a `__tests__/` folder, relative to the
file being tested.

### Other folders

* `src/store`: Contains anything related to state management with redux. We
  follow most of the recommendations found
  [here](https://hackernoon.com/redux-step-by-step-a-simple-and-robust-workflow-for-real-life-apps-1fdf7df46092).
* `src/services`: Contains abstraction for external APIs, such as Firebase.
* `src/config`: Contains configuration variables that are internal to the
  frontend code. If a configuration variable needs to be exposed to the backend
  or to the continuous-integration script, it should be defined as a NODE ENV in
  `.env`.
* `src/utils`: General helper functions that are reused throughout the code.
* `.storybook`: [Storybook](https://github.com/storybooks/storybook)
  configuration files.
* `database`: Contains Firebase database rules.
* `flow-typed`: Flow types definitions.
* `functions`: Firebase functions (backend).
* `public`: Read about this folder at
  [create-react-app/Using the public folder](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#using-the-public-folder).
* `resources`: Contains non-code files such as design files (Sketch files, PSD)
  and Docs.
* `stories`: [Storybook](https://github.com/storybooks/storybook) files.
* `test`: Contains End-to-End tests.

### Hierarchy of folders

A folder X can import from folder Y, if and only if Y is lower than X, in the following hierarchy:

```
pages
components/organisms
components/molecules
components/atoms
components/hocs
store
services
config
constants
utils
lib
node_modules
```

## 2. Development

1. Clone the repo `git clone git@bitbucket.org:pesposa/webapp.git`
2. Add the following line in `/etc/hosts`:

```
127.0.0.1	pesposa.test
127.0.0.1	cy.pesposa.test
# 127.0.0.1	<any country code>.pesposa.test
```

where `<any country code>` is any [valid ISO ALPHAT-2 country code](http://www.nationsonline.org/oneworld/country_code_list.htm)

3. Install dependencies: `yarn`

### `yarn start:web`

Run the web app in development mode.

### `yarn lint`

Lint all code.

### `yarn test`

Run unit tests with watch.

### `CI=true yarn test`

Run unit tests once.

### `yarn test -- --coverage`

Run unit tests once and generate coverage report.

### `yarn test:e2e`

Run end-to-end tests with Nightwatch. Make sure you run `yarn setup:e2e` to
install Selenium.

Firebase functions URL:

```
https://us-central1-<project_id>.cloudfunctions.net/
```

### `git submodule foreach git pull`

Update git submodules

### Tools

1. [Firebase Tools](https://github.com/firebase/firebase-tools): `npm install -g
   firebase-tools`.
2. CircleCI CLI: Visit https://circleci.com/docs/2.0/local-jobs/#nav-button and
   follow the instructions.

<!-- ### Data tools -->

<!-- - Seed Firebase DB: `yarn seed` -->

## 3. Deploy

We use CircleCI to automatically deploy the latest code to Firebase Hosting. You
can find CircleCI configuration at `.circleci/config.yml`. You should never need
to run the following commands manually, besides `yarn admin` for setting a new
deployment.

### `yarn admin initialize`

Seed a Firebase DB, and initial import to Algolia. You should typically run this
to setup a new deployment.

Run `yarn admin` to see all available admin operations.

### `yarn build`

Build all the apps (UI, functions, database, admin).

### `yarn deploy`

Deploy all apps Firebase Hosting.

## 4. Environment Variables

Find variables inherited by create-react-app
[here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#advanced-configuration).

| Variable                           |      Frontend      |    Development     |     Production     | Usage                                                                                                                    |
| :--------------------------------- | :----------------: | :----------------: | :----------------: | :----------------------------------------------------------------------------------------------------------------------- |
| REACT_APP_FIREBASE_API_KEY         | :white_check_mark: | :white_check_mark: | :white_check_mark: | Firebase API key. Find Firebase setup instructions here: https://firebase.google.com/docs/storage/web/start.             |
| REACT_APP_FIREBASE_PROJECT_ID      | :white_check_mark: | :white_check_mark: | :white_check_mark: | Firebase Project ID. Instructions to locate the project ID here:https://support.google.com/cloud/answer/6158840?hl=en.   |
| REACT_APP_ALGOLIA_APP_ID           | :white_check_mark: | :white_check_mark: | :white_check_mark: | Algolia app ID. Find all your Algolia apps here: https://www.algolia.com/manage/applications.                            |
| REACT_APP_ALGOLIA_SEARCH_KEY       | :white_check_mark: | :white_check_mark: | :white_check_mark: | Algolia search-only API key. Get this from this URL: `https://www.algolia.com/apps/<REACT_APP_ALGOLIA_APP_ID>/api-keys`. |
| REACT_APP_ALGOLIA_POSTS_INDEX_NAME | :white_check_mark: | :white_check_mark: | :white_check_mark: | Algolia index for Posts.                                                                                                 |
| ALGOLIA_API_KEY                    |        :x:         | :white_check_mark: | :white_check_mark: | Algolia Admin API key. Should be kept secret (not to be used on the frontend).                                           |

## 5. Deployments

| Name        |    Branch    |                                                                                                                                                           Description                                                                                                                                                            |
| :---------- | :----------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Development |    `dev`     |                                             After passing tests on CI, the latest code is deployed here (in `development` mode). This environment does not share any resources (database, algolia, etc.) with the production environment. Access is restricted to development team.                                              |
| Staging     |  `staging`   | Runs the "next" version of the application, i.e., the release candidate. It is an exact mirror of the production environment, and shares the same resources (database, algolia, etc.) as the production environment. This environment is used for stress testing and comprehensive QA. Access is restricted to development team. |
| Production  | `production` |                                                                                                                                     Runs the currently released version of the application.                                                                                                                                      |


## 6. Custom yarn script
We have a custom yarn script at `./yarn` for allowing operations on multiple deployments. Don't edit `.env` or `serviceAccountKey.json` files directly; instead edit them in `secrets` repo and update the submodule. Next time `DEPLOYMENT=development ./yarn <command>` runs will update these files.

## 7. Edit old Code

```
ssh deploy@178.79.164.250 -p 16888 -R 52698:localhost:52698
```
