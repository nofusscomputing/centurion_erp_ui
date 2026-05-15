---
title: URLs
description: URL Design specification for Centurion ERP by No Fuss Computing
date: 2024-09-27
template: project.html
about: https://gitlab.com/nofusscomputing/infrastructure/configuration-management/centurion_erp
---

This specification is to detail the URL path requirements for Centurion ERP development.


## Details

The following URL patterns are required for navigation:

- `/<module>/<model>`

- `/<module>/<model>/<primary key>`

- ~~`/<module>/<model>/<common pk>/<child_model>`~~

- ~~`/<module>/<model>/<common pk>/<child_model>/<primary key>`~~

- `/<module>/<common model name>/<model>`

- `/<module>/<common model name>/<model><primary key>`


- ~~`/<module>/<common model name>/<model>/<common pk>/<child_model>`~~

- ~~`/<module>/<common model name>/<model>/<common pk>/<child_model>/<primary key>`~~

The url path pattern will be used by both the end user facing URL and the API URL for accessing the backend.

URL path patterens will be in format:

``` text

/<module>/<model>/<primary key>

```

sub-path names are as follows:

- `<module>` is the module the url falls under

- `<model>` is the Django model name

- `<primary key>` is the Primary key of an individual item.

Example of a device url: `/itam/device[/<int:pk>]`.

The above url path pattern does not work for common models that are accross different modules. As such, for common models, the parh patter is as follows:

``` text

/<module>/<common model name>/<model>/<primary key>

```

sub-path names for common models are as follows:

- `<module>` No change

- `<common model name>` the common model name, this will be the Django model name

- `<model>` The sub-model name. i.e. the name that differantiates it from the common model name.

Example for a request ticket: `/assistance/ticket/request[/<int:pk>]` .


## Requirements

These Requirements are to be read as a **must** be done unless otherwise stated. URL requirements are as follows:

- All characters are lowercase

- space characters are replaced with underscore `_`

- Back-end and API access to have `/api` prefixed to the path.

