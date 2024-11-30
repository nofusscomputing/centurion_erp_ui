---
title: Metadata
description: API Metadata Design specification for Centurion ERP by No Fuss Computing
date: 2024-11-30
template: project.html
about: https://gitlab.com/nofusscomputing/infrastructure/configuration-management/centurion_erp
---

This specification is to detail the metadata provided by the Centurion API.


## Details

Django DRF provides metadata accessable by a HTTP/OPTIONS request. The UI uses this data to render the views for the user. THe available fields returned are:

- Name

- Description

- urls


### URLs

The `urls` key is used by the UI for navigation. There are two keys within this dictionary, they are:

- `self`, 

    This URL is used by the interface for the following items:

    - To generate the action url(s) by appending the action to the url. Available UI actions are: `add` and `edit`

    - As the default `return_url` if the `return_url` key is not provided.

    This URL is mandatory and **must** be provided on ALL views.

- `return_url`

    This URL if provided, is the URL used as the cancel or back url for a UI view. This key is optional and if it's not supplied, the `self` URL is to be used.
