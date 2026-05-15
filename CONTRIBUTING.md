# Contribution Guide

We welcome contributions to this project. This contirubution guide should be read in conjunction with the [development section](https://nofusscomputing.com/projects/centurion_user_interface/development/) of the documentation.


## Tests

Running tests can be done with the following commands

- `npm run test` - Run all tests

- `npm run unit-test` - Run all Unit tests


## Docs

Docs are built with MkDocs and can be linted and built.

1. Prepare

    ``` bash

    git clone -c http.sslVerify=false https://git.nofusscomputing.com/infrastructure/website-template.git docs_template

    ```

2. To Lint, run

    ``` bash

    docker run -t --rm \
        -e IS_BUILD=1 \
        -ti \
        --rm \
        --entrypoint "" \
        --volume ${PWD}:/workdir \
        --workdir /workdir \
        harbor.earth.nww/docker/nofusscomputing/mkdocs-ci:0.5.0 \
        markdownlint-cli2 \
          docs/projects/centurion_user_interface/*.md \
          docs/projects/centurion_user_interface/**/*.md \
          docs/projects/centurion_user_interface/**/**/*.md \
          docs/projects/centurion_user_interface/**/**/**/*.md

    ```

2. To build, run

    ``` bash

    docker run -t --rm \
        -e IS_BUILD=1 \
        -ti \
        --entrypoint "" \
        --volume ${PWD}:/workdir \
        --workdir /workdir \
        --user $(id -u) \
        harbor.earth.nww/docker/nofusscomputing/mkdocs-ci:0.5.0 \
        mkdocs build --clean; \
    npm run docs-api

    ```
