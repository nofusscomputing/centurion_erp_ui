---
title: Markdown
description: Markdown for Centurion User Interface by No Fuss Computing
date: 2026-03-30
template: project.html
about: https://github.com/nofusscomputing/centurion_erp_ui/
---

<!-- markdownlint-disable code-fence-style fenced-code-language -->

Markdown is a simple text language that gets converted to html. Our Markdown implementation is based off of [CommonMark](https://spec.commonmark.org/) with our own custom Markdown plugins.


## Code Block


### Block

Multiple lines of code can be rendered by declaring the codeblock in block style. it must begin and end (on it's own line) a triple tick `\````

~~~ markdown

```

aVariable: bool = True

```

~~~

- **Output ->**

    ```

    aVariable: bool = True

    ```

It is also possible to define the language the code is in by adding it to the blocks definition. In this case, the codeblock was defined as py (python) code. Available code languages can be found in the [docs](https://highlightjs.readthedocs.io/en/latest/supported-languages.html).

~~~ markdown

``` py

aVariable: bool = True

```

~~~

- **Output ->**

    ``` py

    aVariable: bool = True

    ```


### Inline

Inline codeblock is used to show code within a string of text. Decare using a single tick `\`` either side of the code.

``` markdown

Some text within a markdown document that has a code block, `aVariable: bool = True`. Notice the sinlge ticks?

```

- **Output ->** Some text within a markdown document that has a code block, `aVariable: bool = True`. Notice the sinlge ticks?


## Headings

Headings as the name implies is a section heading for a page. They are defined with a hash `#` and by the number of hashes.

``` markdown

# Level One Heading

## Level Two Heading

### Level three Heading

#### Level four Heading

##### Level five Heading

###### Level six Heading

```


- **Output ->**

    # Level One Heading <!-- markdownlint-disable-line -->


    ## Level Two Heading <!-- markdownlint-disable-line -->


    ### Level three Heading <!-- markdownlint-disable-line -->


    #### Level four Heading <!-- markdownlint-disable-line -->


    ##### Level five Heading <!-- markdownlint-disable-line -->


    ###### Level six Heading <!-- markdownlint-disable-line -->


## Line Breaks


## Links


## Lists


## Table

``` markdown

| col 1 | col 2 |
|---|---|
| col 1, row 1 data | col 2 row one data |

```


## Text Formatting


### Bold


### Italics

<!-- markdownlint-restore -->
