# Pesposa Web Application

[![CircleCI](https://circleci.com/bb/pesposa/webapp.svg?style=svg&circle-token=672fc70422242f2252d394f0f1a33ef08a27e830)](https://circleci.com/bb/pesposa/webapp)

## Code guidelines
Our folder structure is based on atomic design. Read more about atomic design [here](http://bradfrost.com/blog/post/atomic-web-design/) and [here](https://medium.com/joeydinardo/a-brief-look-at-atomic-components-39cbe71d38b5), and find an example project [here](https://github.com/diegohaz/arc).

#### Atomic design
`src/components` is split into the following folders:

- `src/components/atoms`: An **atom** is the most basic component, that renders only HTML tags (i.e., they don't import other components). An atom should represent the smallest possible component within which it wouldn’t make sense to abstract further. For example, an input label, or a button.
- `src/components/molecules`: A **molecule** is a group of atoms bonded together to form a small and re-usable UI element. For example a `SearchForm` molecule is the group of the following atoms: `InputLabel`, `Input`, and `Button`.
- `src/components/organisms`: An **organism** is a group of molecules joined together to form a relatively complex, distinct section of an interface. For example, we can have a `Header` that consists of the following molecules: `Logo`, `Navigation`, and `SearchForm`. Organisms can use other organisms.
- `src/components/smarts`: A **smart** (or a container) is mostly responsible for connecting other components to the redux state, as well as dispatching actions to the store. It has minimal rendering logic, but it can act as a **smart organism** and render multiple organisms/molecules/atoms.
- `src/components/hocs`: A **hoc** is a [Higher-Order Component](https://reactjs.org/docs/higher-order-components.html).
- `src/pages`: A **page** is a the whole UI that corresponds to a specific route.

Unit testing files should be placed in a `__tests__/` folder, relative to the file being tested.

#### Other folders
- `src/store`: Contains anything related to state management with redux. We follow most of the recommendations found [here](https://hackernoon.com/redux-step-by-step-a-simple-and-robust-workflow-for-real-life-apps-1fdf7df46092).
- `src/services`: Contains abstraction for external APIs, such as Firebase.
- `src/config`: Contains configuration variables that are internal to the frontend code. If a configuration variable needs to be exposed to the backend or to the continuous-integration script, it should be defined as a NODE ENV in `.env`.
- `src/utils`: General helper functions that are reused throughout the code.
- `.storybook`: [Storybook](https://github.com/storybooks/storybook) configuration files.
- `database`: Contains Firebase database rules.
- `flow-typed`: Flow types definitions.
- `functions`: Firebase functions (backend).
- `public`: Read about this folder at [create-react-app/Using the public folder](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#using-the-public-folder).
- `resources`: Contains non-code files such as design files (Sketch files, PSD) and Docs.
- `stories`: [Storybook](https://github.com/storybooks/storybook) files.
- `test`: Contains End-to-End tests.

## Getting started

1. Clone the repo locally: `git clone git@gitlab.com:pesposa/webapp.git`
2. Install dependencies: `cd webapp && yarn`

## Development

`yarn start`

## Lint

`yarn lint`

## Unit testing

Run tests with watch:

```shell
yarn test:unit
```

Run once:

```shell
CI=true yarn test:unit
```

Read more at [create-react-app Docs](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests).

## End-to-End Testing

1. Setup Selenium server: `yarn setup:e2e`
2. Run the e2e tests: `yarn test:e2e`

## Data tools

- Seed Firebase DB: `yarn seed`
- Sync with legacy MySQL DB: http://localhost:3000/admin

## Build

`yarn build`

## Deploy to Firebase Hosting

`yarn deploy`
