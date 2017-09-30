# Pesposa Web Application

[![CircleCI](https://circleci.com/bb/pesposa/webapp.svg?style=svg&circle-token=672fc70422242f2252d394f0f1a33ef08a27e830)](https://circleci.com/bb/pesposa/webapp)

## Develop

1. `git clone git@bitbucket.org:pesposa/webapp.git`
2. `yarn start`

## Test

### Unit testing

Run tests with watch:

```shell
yarn test
```

Run once:

```shell
CI=true yarn test
```

Read more at [create-react-app Docs](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests).

### End-to-End Testing

Setup Selenium server:

```shell
yarn e2e-setup
```

Run the e2e tests:

```shell
yarn e2e
```

## Data tools

- Seed Firebase DB: `yarn seed`
- Sync with legacy MySQL DB: http://localhost:3000/admin


## Build

`yarn build`

## Deploy to Firebase Hosting

`yarn deploy`
