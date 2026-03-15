---
title: Centurion UI
description: Documentation home for Centurion User Interface by No Fuss Computing
date: 2024-09-27
template: project.html
about: https://github.com/nofusscomputing/centurion_erp_ui/
---

<span style="text-align: center;">

<br>

![Project Status](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fnofusscomputing%2Fcenturion_erp_ui_ui%2Frefs%2Fheads%2Fdevelopment%2F.centurion%2Fproject_status.json)

[![Docker Pulls](https://img.shields.io/docker/pulls/nofusscomputing/centurion-erp-ui?style=plastic&logo=docker&color=0db7ed)](https://hub.docker.com/r/nofusscomputing/centurion-erp-ui) 

----

<br>

![GitHub forks](https://img.shields.io/github/forks/NofussComputing/centurion_erp_ui?logo=github&style=plastic&color=000000&labell=Forks) ![GitHub stars](https://img.shields.io/github/stars/NofussComputing/centurion_erp_ui?color=000000&logo=github&style=plastic) ![Github Watchers](https://img.shields.io/github/watchers/NofussComputing/centurion_erp_ui?color=000000&label=Watchers&logo=github&style=plastic)



![Gitlab forks count](https://img.shields.io/badge/dynamic/json?label=Forks&query=%24.forks_count&url=https%3A%2F%2Fgitlab.com%2Fapi%2Fv4%2Fprojects%2F62116620%2F&color=ff782e&logo=gitlab&style=plastic) ![Gitlab stars](https://img.shields.io/badge/dynamic/json?label=Stars&query=%24.star_count&url=https%3A%2F%2Fgitlab.com%2Fapi%2Fv4%2Fprojects%2F62116620%2F&color=ff782e&logo=gitlab&style=plastic)

<br>

 ![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/nofusscomputing/centurion_erp_ui?style=plastic&logo=github&label=Open%20Issues&color=000) ![GitHub issue bugs](https://img.shields.io/github/issues-search?query=repo%3Anofusscomputing%2Fcenturion_erp_ui%20type%3A%22Bug%22%20is%3Aopen%20&style=plastic&logo=github&label=Bug%20fixes%20required&color=000)

</span>

---

<br>

**Centurion UI** is a metadata-driven frontend that renders and interacts with structured data provided by backends such as Centurion ERP. Unlike traditional UIs, it **does not handle security or business logic** — those remain fully on the backend. The UI’s role is to interpret and display data as views, pages, and components, letting users focus on using applications rather than building interfaces.


## Components of Centurion UI

For Centurion UI to function dynamically, metadata that Centurion UI requires must be in an expected format. To aid in this we have broken down each area of that metadata so that its easier to parse. Those areas are:

- [Setup Centurion UI](./setup.md)

    How to setup Centurion UI for your backend.

- [Backend Metadata](./metadata.md)

    What and how your backend should provide for Centurion UI to function.

- [Navigation](./navigation.md)

    Metadata structure for providing UI navigation.

- User Details

    Metadata structure for providing user details.

- View Layout

    Metadata structure for providing the layout that will be rendered.

- Field Types

    Metadata structure for providing the different field types that the UI can handle.

- [URLs](./url.md)


## How It Works

Centurion UI treats data much like a **database client**:

* A **view** is determined by the data received: a single row, a subset of rows, or a full dataset.
* **Components** on a page use either cached data or additional API queries, depending on the user’s permissions.
* Users or IT teams can create new components and dashboards from available data without writing frontend code.

This approach ensures that **adding new features to your backend requires no UI changes**, saving time and effort. Components, pages, and dashboards update automatically whenever backend data or structure changes.


## Development Philosophy

The UI is being developed **in parallel with Centurion ERP**, allowing the specification of the interface to be refined through real-world use. This ensures that:

* Views, components, and interactions are validated as the backend evolves.
* The UI remains adaptable and backend-agnostic.
* Development teams can focus on building features rather than rewriting interfaces.


## Vision

The goal of Centurion UI is to provide a **flexible, universal frontend platform** that works with any backend and any type of user. By separating rendering from security and business logic, the UI allows teams to **build, update, and extend applications quickly**, all through one interface.

**Key benefits include:**

* **Add backend features without changing the UI**
* **One UI, multiple backends—future-ready and adaptable**
* **Dynamic pages and dashboards built from live data**
* **Custom components and visualizations without coding**
* **Faster development, less maintenance, more focus on delivering value**

Centurion UI is designed to make data and features **instantly usable, accessible, and adaptable** for every user and workflow.
