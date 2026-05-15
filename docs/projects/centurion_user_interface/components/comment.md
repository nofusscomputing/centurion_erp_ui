---
title: Comment
description: Comment component for Centurion User Interface by No Fuss Computing
date: 2026-05-02
template: project.html
about: https://github.com/nofusscomputing/centurion_erp_ui/
---

The comment component is a self contained object that displays all information related to a comment.


## Data

``` json

{
    "body": "",
    "_urls": {
        "_self": "",
        "threads": ""
    }
}

```

| Field | Type | When<br>Required | When<br>Optional | Description  |
|:---|:---:|:---:|:---:|:---|
| `name` | string | always | - | See [root document](../metadata.md#name). |
| `body` | string | always | - |  |
| `_urls` | object | always | - |  |
| `_urls._self` | string | always | - |  |
| `_urls.threads` | string | Comment has threads | always | Only supply this key if the comment has child comments (threads). |


### _urls

`threads` key is used by the interface to show that the comment has children comments or better known as threads. When this kewy is present, the UI will make an additional request to the URL within this key to fetch and then begin rendering the data as children to the comment in question.
