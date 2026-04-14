---
title: Development
description: Development documentation for Centurion User Interface by No Fuss Computing.
date: 2026-04-14
template: project.html
about: https://github.com/nofusscomputing/centurion_erp_ui/
---

This page covers development for the Centurion UI. We welcome contributions and hope that this page, along with our [Contribution Guide](https://github.com/nofusscomputing/centurion_erp_ui/blob/development/CONTRIBUTING.md) has fostered you being able to move forward.


## Mock API

We have added as part of our docker container a feature that enables you to mock an API backend. The mock backend only covers read-only actions.


### How it works

Centurion UI uses HTTP GET and OPTIONS requests to the backend. This correlates to object data and UI setup respectively. Within the context of the mock API we mimic this via file paths and json files.  
Files paths match the URI path one-to-one and the request type either `HTTP/GET` or `HTTP/OPTIONS` are a `json` files named after the request type. i.e. `GET.json` or `OPTIONS.json`.

!!! example
    A `HTTP/GET` Request to URI `/mock/api/v2` would have a `json` file saved within the mock path `/mock/api/v2/GET.json` If the request was a `HTTP/OPTIONS` request, the `json` file saved within the mock path `/mock/api/v2/OPTIONS.json`


### Setup and usage

To use his mock backend, do the following on your development machine:

1. clone the repo locally and enter the repos cloned path.

1. build the docker image.

    ``` bash

    docker build . \
        --build-arg "CI_COMMIT_SHA=$(git rev-parse HEAD)" \
        --build-arg "CI_COMMIT_TAG=$(git tag --sort=-creatordate | head -n 1)+$(git rev-parse --short HEAD)" \
        --tag centurion-ui:dev

    ```

1. Start the docker container

    ``` bash

    docker run \
        --rm \
        -d \
        -p 3000:80 \
        -e "API_URL=http://127.0.0.1:3000/mock/api/v2" \
        -v ${PWD}/includes/usr/share/nginx/html/mock:/usr/share/nginx/html/mock \
        -v ${PWD}/includes/etc/nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf \
        --name centurion-ui \
        centurion-ui:dev

    ```

    !!! tip
        Within the `API_URL` var defined, the path after `/mock` is what you will need to create within the mounted mock path.

    !!! note
        The mounted mock path (in the above docker run commands case `${PWD}/includes/usr/share/nginx/html/mock`) is where you create your api structure.

1. start development ensuring you create the API data within the mack path.
