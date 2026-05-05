---
title: Metadata
description: Backend Metadata requirements for Centurion User Interface by No Fuss Computing
date: 2024-11-30
template: project.html
about: https://github.com/nofusscomputing/centurion_erp_ui/
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
  "urls": {},
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
| `name` | string | always | - | For the Root request, use the websites name All other requests use the objects name. |
| `description` | string | List View<br>Detail View | Root Request | The description to use for the view. _**Note:** This is ignored in the root request._ |
| `urls` | array[object] | always | - | The different URL applicable to the current endpoint. |
| `allowed_methods` | array[string] | always | - | The type of HTTP request methods supported by the endpoint. |
| `table_fields` | array[string] | List View<br>Or displaying a table. | depends | The fields that are to be displayed within a table. |
| `layout` | array[object] | Detail View | depends | How the page will be layed out. |
| `version` | array[object] | Root Request | - | Version details of your backend. |
| [`navigation`](./navigation.md) | array[object] | Root Request | - | The sites navigation. |

As the metadata document can become quite large, not all of its details are published within the table above, or the remainder of the document below. You can find the remaining details for that json key, by clicking on the field within the table. All other fields that are not linked in the table, their details can be found below.


### Name

The name field defines the object(s) name. The only exception for this is the root metadata, which should be the sites name. For clarity this name should be unique across the site as a whole.


### Description


### URL

The `urls` key is used by the UI for actions within a view. The expected structue for this data is a JSON object.

``` json

{
    "self": "",
    "back": "",
    "sub_models": {
        "<model_key>": {
            "display_name": "<Human readable name>",
            "url": "<sub-model URL>"
        }
    },
    "return_url": ""
}

```

| Field | Type | When<br>Required | When<br>Optional | Description  |
|:---|:---:|:---:|:---:|:---|
| `self` | string | always | - | The url to itself. This should match the same url you used to request the metadata. It's also the same URL as will be made to request data, albeit by make a `GET` HTTP request. |
| `back` | string | ?? | ?? | This URL is used for by the interface as the URL for a back operation. |
| `sub_models` | object | ListView if multiple object tyes can be created. | Always | Denotes multiple endpoints for creating different types of the same object. |
| `return_url` | string | ?? | ?? | This URL if provided, is the URL used as the cancel url for a UI view. This key is optional and if it's not supplied, the `self` URL is to be used. |


#### Sub Models

This ob


### Allowed Methods

_**To Do:** when used update_


### Table Fields

The `table_fields` key supplies what table columns to display when the layout type is `table`.

``` json

[
    "display_name",
    "organization",
    "checkins",
    "created",
    "-action_delete-"
]

```

| Field | Type | When<br>Required | When<br>Optional | Description  |
|:---|:---:|:---:|:---:|:---|
| `<value>` | string | always | - | Name of the table column to display. This value is derived from the key name for the API data object to display. |
| `-action_delete-` | string | - | always | Action Delete. This special value instructs the interface to provided a delete button to remove the row. |


### Layout

The `layout` key provides the required information to render each tab of a `DetailView` page.

``` json
[
    {
        "name": "Details",
        "slug": "details",
        "sections": []
    }
]

```

| Field | Type | When<br>Required | When<br>Optional | Description  |
|:---|:---:|:---:|:---:|:---|
| `name` | string | always | - | Friendly name for the tab that will be displayed to users. |
| `slug` | string | always | - | Unique value that will is used for the HTML element id. |
| [`sections`](#sections) | array[objects] | always | - | Each section to render for the current tab. |


#### Sections

Each `layout.<>.sections.<>` object provides the section layout for each tab of a `DetailView` page.

``` jsonc

[
    {   // Single column example.
        "layout": "single",
        "fields": [
            "config"
        ]
    },
    {   // Double column section example.
        "layout": "double",
        "left": [
            "organization",
            "device_type",
            "device_model",
            "name",
            "serial_number",
            "uuid",
            "inventorydate",
            "created",
            "modified"
        ],
        "right": [
            "model_notes",
            "is_virtual"
        ]
    },
    {   // Table section example.
        "layout": "table",
        "name": "Operating System",
        "field": "operating_system"
    }
]

```

| | Field | Type | When<br>Required | When<br>Optional | Description  |
|:---|:---|:---:|:---:|:---:|:---|
|`Single Column section layout` ||||||
| | `name` | string | - | always | Section name to use. Will be displayed as the sections title. |
| | `layout` | string | always | - | Use value `single` to set layout to be a single-column section. |
| | `fields` | array[string] | always | - | Names of the fields to display. This value is derived from the key name for the API data object to display. |
| `Double Column section layout` ||||||
| | `name` | string | - | always | Section name to use. Will be displayed as the sections title. |
| | `layout` | string | always | - | Use value `double` to set layout to be a single-column section. |
| | `left` | array[string] | always | - | Names of the fields to display in the left hand column. This value is derived from the key name for the API data object to display. |
| | `right` | array[string] | always | - | Names of the fields to display in the right hand column. This value is derived from the key name for the API data object to display. |
| `Table section layout` ||||||
| | `name` | string | - | always | Section name to use. Will be displayed as the sections title. |
| | `layout` | string | always | - | Use value `table` to set layout to be a single-column section. |
| | `field` | string |  | | Name of the url key within the parent objects `_urls` field. |

!!! tip
    When the layout key has a value of `table`, the the url as part of the parent object is queried to obtain the [table fields](#table-fields) to display.
