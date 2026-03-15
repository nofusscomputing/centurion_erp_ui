---
title: Metadata
description: Backend Metadata requirements for Centurion User Interface by No Fuss Computing
date: 2024-11-30
template: project.html
about: https://gitlab.com/nofusscomputing/infrastructure/configuration-management/centurion_erp
---

The magic of Centurion UI is done completely by providing a structured `JSON` document. The expectations for this document can be found below and further within additional sections as notated. As Centurion UI is a web application, all of the metadata is done via HTTP requests.


## Definitions / Rendering

So as to easily identify the different areas of the Centurion UI The following definitions are used:

- `Component` A single object within a section.

- `Field` A single item as part of a dataset.

- `Layout` Structure of a page.

- `Section` A part of a page and normally will contain grouped items.

As part of Centurion UI the above objects are nestable. That order is: `Layout` -> `Section` -> `Field` or `Component`. All pages within Centurion UI follow this order when it comes to rendering your data.


## Endpoints

As part of [setup](./setup.md) you will configure the root URL that the UI will base all queries from. Subsequent endpoints are obtained by the links you provide as part of [navigation](./navigation.md). When required Centurion UI will make the appropriate request via HTTP using method `OPTIONS`. An `OPTIONS` request to an endpoint is the expected metadata endpoint. Any other HTTP method type, is what Centurion UI will expect to be data.


## Metadata Document Format

The metadata document contains everything that Centurion UI requires so that it may render the backends data that has been requested.

``` json

{
  "name": "",
  "description": "",
  "urls": {
    "self": "http://127.0.0.1:8002/api/v2"
  },
  "renders": [
    "application/json",
  ],
  "parses": [
    "application/json",
  ],
  "allowed_methods": [
    "GET",
    "HEAD",
    "OPTIONS"
    "PATCH",
    "POST",
    "PUT"
  ],
  "table_fields": [],
  "layout": [],
  "version": {
    "project_url": "",
    "sha": "",
    "version": ""
  },
  "navigation": []
}

```

| Field | Type | When<br>Required | When<br>Optional | Description  |
|:---|:---:|:---:|:---:|:---|
| `name` | string | always | - | For the Roor request, use the websites name All other requests use the display's name. |
| `description` | string | List View<br>Detail View | Root Request | The description to use for the view. _**Note:** This is ignored in the root request._ |
| `urls` | array[object] | always | - | The different URL applicable to the current endpoint. |
| `allowed_methods` | array[string] | always | - | The type of HTTP request methods supported by the endpoint. |
| `table_fields` | array[string] | List View<br>Or displaying a table. | depends | The fields that are to be displayed within a table. |
| `layout` | array[object] | Detail View | depends | How the page will be layed out. |
| `version` | array[object] | Root Request | - | Version details of your backend. |
| [`navigation`](./navigation.md) | array[object] | Root Request | - | The sites navigation. |

As the metadata document can become quite large, not all of its details are published within the table above, or the remainder of the document below. You can find the remaining details for that json key, by clicking on the field within the table. All other fields that are not linked in the table, their details can be found below.


### Name


### Description


### URL

The `urls` key is used by the UI for actions within a view. The expected structue for this data is a JSON object.

``` json

{
    "self": "",
    "back": "",
    "sub_models": {
        "" : ""
    },
    "return_url": ""
}

```

| Field | Type | When<br>Required | When<br>Optional | Description  |
|:---|:---:|:---:|:---:|:---|
| `self` | string | always | - | The url to itself. This should match the same url you used to request the metadata. It's also the same URL as will be made to request data, albiet by make a `GET` HTTP request. |
| `back` | string | ?? | ?? | This URL is used for by the interface as the URL for a back operation. |
| `sub_models` | object | ListView if multiple object tyes can be created. | Always | Denotes multiple endpoints for creating differnt types of the same object. |
| `return_url` | string | ?? | ?? | This URL if provided, is the URL used as the cancel url for a UI view. This key is optional and if it's not supplied, the `self` URL is to be used. |


#### Sub Models

This ob