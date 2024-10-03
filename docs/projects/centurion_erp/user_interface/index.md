---
title: User Interface
description: Documentation home for Centurion ERP User Interface by No Fuss Computing
date: 2024-09-27
template: project.html
about: https://gitlab.com/nofusscomputing/infrastructure/configuration-management/centurion_erp
---

<span style="text-align: center;">

![Project Status - Active](https://img.shields.io/badge/Project%20Status-Active-green?logo=github&style=plastic)

</span>

This User Interface is for use with Centurion ERP. The intent of this documentation is to detail the ins and outs of it's design, requirements and on further development.

Centurion ERP is built using the Django framework. This enables quick development. This framework comes with the DJango Rest Framwork (DRF) which is a Full Rest API Implementation.

The user interface will be built using the React Framework. This also enables quick development and offers in addition the features of the Javascript language for UI features.


## Goal / Intent

> Seperate the UI from the backend
>
> Create a UI that as much as possible, obtains what is required from the backend for it to automagically create the UI. This information should then be used to create the user interface without requiring additional development work within the UI for to display any new backend features.


## Design Specifications

- [URLs](./url.md)

- Views / Layouts
