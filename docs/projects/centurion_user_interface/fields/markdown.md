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

A Line break is for breaking up text into paragraphs.


``` markdown

first line with second line indented
    this is the second line


first line with the second line padded with a blank line

the second line. This creates two seperate paragraphs,

```

- **Output ->**

    first line with second line indented  
        this is the second line

    first line with the second line padded with a blank line

    the second line. This creates two seperate paragraphs,


## Links

a Link enables you to link to a URL.

``` markdown

A line with a [link](./relative.md) declared.

A line with a http protocol url. http://example.com

```

- **Output ->**

    A line with a [link](./relative.md) declared. <!-- markdownlint-disable-line -->

    A line with a http protocol url. http://example.com <!-- markdownlint-disable-line -->


## Lists

List as the name implies is to declare a list. Lists are broken down into two seperate types: Ordered and Un-Ordered.

``` markdown

An unordered list:

- first item

- second item

or

An unordered list:

* first item

* second item


An Ordered list:

1. first item

1. second item

or


An Ordered list:

1. first item

2. second item


```

- **Output ->**

    An unordered list:

    - first item

    - second item

    or

    An unordered list:

    * first item  <!-- markdownlint-disable-line -->

    * second item  <!-- markdownlint-disable-line -->


    An Ordered list:

    1. first item

    1. second item

    or


    An Ordered list:

    1. first item

    2. second item


## Table

``` markdown

| col 1 | col 2 |
|---|---|
| col 1, row 1 data | col 2 row one data |

```

- **Output ->**

| col 1 | col 2 |
|---|---|
| col 1, row 1 data | col 2 row one data |


## Text Formatting

Text formatting is as simple as wrapping the text to format inside of another char(s).

``` markdown

This is **bold** text. As is this __bold__ text. to create italics text use an _underscore_. you can also combine so that the text is **_bold and italics_** or _**bold and italics**_



```

- **Output ->**

    This is **bold** text. As is this __bold__ text. to create italics text use an _underscore_. you can also combine so that the text is **_bold and italics_** or _**bold and italics**_ <!-- markdownlint-disable-line -->


## Custom Markdown

The following additional markdown features are available.


### Admonitions

An admonition is a block that is rendered to stand out. Each admonition must be declared with a type. i.e. `info`. Available types are:

- 'note',
- 'summary', 'abstract', 'tldr',
- 'info', 'todo',
- 'tip', 'hint',
- 'success', 'check', 'done',
- 'question', 'help', 'faq',
- 'warning', 'attention', 'caution',
- 'failure', 'fail', 'missing',
- 'danger', 'error', 'bug',
- 'example', 'snippet',
- 'quote', 'cite'

``` markdown

!!! note
    admonition text goes here

!!! summary
    admonition text goes here

!!! abstract
    admonition text goes here

!!! tldr
    admonition text goes here

!!! info
    admonition text goes here

!!! todo
    admonition text goes here

!!! tip
    admonition text goes here

!!! hint
    admonition text goes here

!!! success
    admonition text goes here

!!! check
    admonition text goes here

!!! done
    admonition text goes here

!!! question
    admonition text goes here

!!! help
    admonition text goes here

!!! faq
    admonition text goes here

!!! warning
    admonition text goes here

!!! attention
    admonition text goes here

!!! caution
    admonition text goes here

!!! failure
    admonition text goes here

!!! fail
    admonition text goes here

!!! missing
    admonition text goes here

!!! danger
    admonition text goes here

!!! error
    admonition text goes here

!!! bug
    admonition text goes here

!!! example
    admonition text goes here

!!! snippet
    admonition text goes here

!!! quote
    admonition text goes here

!!! cite
    admonition text goes here

```

- **Output ->**

    !!! note
        admonition text goes here

    !!! summary
        admonition text goes here

    !!! abstract
        admonition text goes here

    !!! tldr
        admonition text goes here

    !!! info
        admonition text goes here

    !!! todo
        admonition text goes here

    !!! tip
        admonition text goes here

    !!! hint
        admonition text goes here

    !!! success
        admonition text goes here

    !!! check
        admonition text goes here

    !!! done
        admonition text goes here

    !!! question
        admonition text goes here

    !!! help
        admonition text goes here

    !!! faq
        admonition text goes here

    !!! warning
        admonition text goes here

    !!! attention
        admonition text goes here

    !!! caution
        admonition text goes here

    !!! failure
        admonition text goes here

    !!! fail
        admonition text goes here

    !!! missing
        admonition text goes here

    !!! danger
        admonition text goes here

    !!! error
        admonition text goes here

    !!! bug
        admonition text goes here

    !!! example
        admonition text goes here

    !!! snippet
        admonition text goes here

    !!! quote
        admonition text goes here

    !!! cite
        admonition text goes here


### Task List

A task list is a list that contains a check box.

``` markdown

- [ ] Unchecked task list item

- [x] A checked task list item

```

- **Output ->**

    - [ ] Unchecked task list item

    - [x] A checked task list item


### Details/Summary Block


``` markdown

<details><summary>the title</summary>

the details inner block

</details>

```

- **Output ->**

    <details><summary>the title</summary> <!-- markdownlint-disable-line -->

    the details inner block

    </details> <!-- markdownlint-disable-line -->


### Footnote

A footnote adds a reference and if specified a longer description to text.


``` markdown

some text[^1] that has a numeral one as the reference. and another form of reference is long text[^this is some long text for reference description]


[^1]: this is a description for ref numeral 1.

```

- **output ->**

some text[^1] that has a numeral one as the reference. and another form of reference is long text[^this is some long text for reference description]


[^1]: this is a description for ref numeral 1.

<!-- markdownlint-restore -->
