## 0.4.0 (2025-01-22)

### feat

- **function**: Convert DateTime to user specified Time Zone
- **layout**: Add date fields for tickets to ticket meta bar
- **layout**: Ticket Meta fields made inline editable
- **component**: Inline form field editor
- **component**: Add name attribute to select field
- **component**: Add ability to set button class
- **component**: Enable select to return fieldset or isolated select
- **component**: Add support for textarea ctrl-enter for submission
- **component**: hande button clicks in Markdown editor
- **layout**: Add inline editing of ticket description
- **component**: Add to textarea option to expand to fit content height
- **component**: Markdown editor
- **component**: Format inline codeblock to match div code block
- **component**: Format admonition success and failure
- **component**: Format md for clarity
- **component**: Add ability to use either name or button text for external link text
- **component**: Fetch ticket linked items metadata
- **function**: Improved error handling for markdown plugins for items that have no metadata
- **function**: Add model icon to rendered markdown model tags
- **function**: pass metadata.fields.x.render for markdown rendering
- **function**: Markdown-it plugin to render model tags

### Fixes

- **component**: Update page number within table page number field
- router improvement to decrease requests and reliance on memo
- **component**: If no ticket comments are returned, dont attempt to process them
- **component**: If no linked ticket items are returned, dont attempt to process them
- **component**: If no related tickets are returned, dont attempt to process them
- **component**: Ensure correct elements are disabled on markdown edit
- **layout**: Use correct object for ticket description edit
- **component**: Dynamically update related ticket id prior to rendering
- **function**: Reorder formatter so that seconds is before month
- **function**: correct tag typo in model link
- **layout**: use correct key for fetching documentation field if defined

### Refactoring

- **component**: Use Form for aditing ticket description
- **function**: field may return null, use function to check presence of key
- **component**: Enable text area to be within a fieldset or not
- **component**: Related Ticket field to use FiledData Component to render markdown
- **component**: Ticket Linked Item field to use FiledData Component to render markdown
- **component**: map markdown rendering model name within icon loader
- **function**: Add markdown rendering of ticket reference
- **function**: Add further checks to ensure correct tag is valid

## 0.3.0 (2025-01-01)

### feat

- **componentt**: On click or new line expand text area height to equal, min content height
- **componentt**: On making a ticket comment, reset the comment form
- **style**: Remove arrows from number fields
- **component**: Add Loaded gate to table
- **component**: Add onKeyUp event to text field
- **hook**: Dont consume the body object as part of the apiFetch
- **component**: Enable replying to comment
- **component**: Replicate currect footer icons
- **component**: add swagger docs icon
- **component**: add swagger docs icon
- **component**: add git icon
- **component**: add documentation icon
- **component**: Log error to console if table has no `table_fields`
- **component**: Add UI release details to the footer
- **component**: Add API release details to the footer
- **node**: upgrade 22.11.0 -> 23 (edge)
- **npm**: upgrade react-router 6.26.2 -> 7.0.1
- **component**: Add ticket type icons
- **function**: Support multi-select fields
- **layout**: ticket created successfuly navigatae to list view
- **layout**: if detail view url changes, ensure active tab is reset
- **layout**: modelform to use metadata.return_url
- **component**: Add creation date to ticket action comments
- **component**: Seperate action comment user and message

### Fixes

- **componentt**: Ensure field data is fetched for fields
- **component**: Make Table page number editable
- **function**: reorder date formating so month letters are not re-interprited
- **layout**: use `back` url not `return_url` if it exists
- **hook**: ensure status is returned from apiFetch
- **layout**: If field is `write_only=true` dont add it to form_data on ModelForm
- **component**: Add missing edit callback for discussion comment
- **component**: When editing a ticket comment always use self url as post url
- **layout**: hwen posting a form, post to `.url.self`
- **component**: Ensure single column markdown field has markdown css class added
- **layout**: use correct method for adding select field to ititial data
- **layout**: Use metadata return url when posting a form
- **docker**: ensure entrypoiont creates valid env file for UI again.....
- **docker**: ensure entrypoiont creates valid env fiel for UI
- **layout**: Support the API metadata `back` URL
- **hook**: ensure UI action words are removed from API reuqest URL
- Detail and Ticket routes require their own loader
- Add missing route for common_model edits
- Dont allow field overflow, wrap text
- **component**: Ticket comment category now uses correct key

### Refactoring

- **layout**: Use PageLoader for ListView
- **component**: Dont render table if the data required is missing
- **component**: For Table process apiFetch results on return
- set form field font size to match common text size
- Use the api self and return_url as provided within the metadata
- **hook**: apiFetch by default make a meta request and return an object of all requests and the response
- loader to use apiFetch hook
- **layout**: remove page_data dependency from details useEffect hooks
- **component**: remove is_loading state object from table
- adjust routing to use Layout and Route Prefixes
- change static path static -> assets

## 0.2.0 (2024-11-15)

### feat

- **component**: Add missing navbar icons
- **component**: Add ticket comment inline editing
- add add route for ticket
- **component**: Check for table data, if none report so
- Add route for common model that contains PK
- **layout**: Use the url's as provided by API for models
- **component**: Format a charfield as hyperlink is metadata has `autolink=true`
- **component**: Auto-Expand Text area to content height style
- **component**: Auto-Expand Text area to content height
- **component**: Correctly convert ISO8601 with TZ to display in browser local TZ
- **component**: Support Timezoned DateTime fields
- **function**: Add Delete mehod to urlBuilder
- **layout**: display non-field errors at the top of the form
- **layout**: Cater for multi-select values
- **component**: Add support for multi-select form field
- **layout**: Form field error, set to be no larger than field
- **layout**: On form field error, scroll to top of form
- Support Markdown field

### Fixes

- **layout**: ensure all metadata is loaded prior to rendering a ticket
- Add missing route for project task add
- correct logic for history route to work
- **hook**: dont allow fields to be set to `undefined` within urlBuilder
- **layout**: if field is dict, ensure initial data is correctly set to val of `.id`
- **layout**: within form handle JSON data correctly when an object
- **component**: dont attempt to access field in double column if it doesnt exist
- **layout**: Ensure that Markdown code blocks do wrap text

### Refactoring

- **component**: Pass field object directly to textarea
- **component**: Pass in the entire field meta and have the component figure out the values

## 0.1.0 (2024-11-10)

### feat

- **docker**: Ability to configure the API URL
- **build**: Build docker container for UI
- **function**: add urlBuilder function to cater for url standard
- **component**: Add 401 login redirect
- **layout**: Add settings layout
- **component**: Add card page component
- **layour**: Add documentation content header icon if url present
- **function**: Add support for nested fields
- **component**: Add class to nav down icon
- **component**: Add automagic collabsible row if detected
- **layout**: Add history layour
- **layout**: Add rendering of history icon for detail
- **layout**: Add ability to pass content header Icon from all layouts
- **component**: Add Icon history
- **layout**: Add ability to pass content header Icon
- **component**: Add Icon help
- **component**: Add Icon delete
- **component**: Pass icon name to icon to use as css class name for icon loader
- **component**: Add Ticket Icon Related
- **component**: Add Ticket Icon Related Blocks
- **component**: Add Ticket Icon Related Blocked
- **component**: Add ticket linked items
- **layout**: Add ticket creation details to header
- **component**: Add handler for button click
- **layout**: Set content heading to match ticket title
- **layout**: Addfield ticket number to metadata header
- **layout**: Add set colour of heading to match ticket colour
- **layout**: Add duration field to ticket
- **layout**: Add priority field to ticket
- **component**: Add comment reply/create form
- **component**: Add form button
- **ticket**: Add initial ticket comment form
- **function**: add support for badge fields that have no url
- **component**: Add icon ticket status testing
- **component**: Add icon ticket status solved
- **component**: Add icon ticket status pending
- **component**: Add icon ticket status new/draft
- **component**: Add icon ticket status invalid
- **component**: Add icon ticket status evaluation
- **component**: Add icon ticket status closed
- **component**: Add icon ticket status assigned planning
- **component**: Add icon ticket status assigned
- **component**: Add icon ticket status approvals
- **component**: Add icon ticket status Accepted
- **Layout**: Update so ticket layout works
- **function**: add icon field support
- **component**: Add icon inventory status warning
- **component**: Add icon inventory status unknown
- **component**: Add icon inventory status ok
- **component**: Add icon inventory status bad
- add submodel action
- **function**: add badge field support
- **component**: add style class support to badge
- **component**: Add action remove icon
- **component**: Add action install icon
- **component**: Add action add icon
- Add package nunjucks for jinja rendering
- **component**: add external links to details tab first section
- **component**: add background colour support to badge
- **component**: Add link icon
- **layout**: ModelForm support for adding child-model
- **component**: Add Support for initial field value
- **layout**: Add HTTP/DELETE support to ModelForm
- Adding of sub-models
- **component**: Dynamic edit button for section
- **component**: Dynamic add button for table
- **hooks**: Enable the posting of data for apiFetch
- **component**: Add onChange and value to text field
- **component**: Add onChange and value to textarea field
- **component**: Add onChange and value to slider field
- **component**: Add onChange and value to select field
- **component**: Add "add" button to table
- **function**: Add model form for add/edit
- **function**: Add model edit functionality
- **layout**: Add table layout to Detail Section
- **layout**: Add Single Column to Detail
- **component**: Add Single Column for layout
- **function**: Add full width option to rendered markdown field
- **function**: Add JSON field formatting to FieldData
- **component**: Add page number input field for manual page selection for table pagination
- **component**: Enable TextField to display naked field
- **component**: Functional Table pagination footer
- **component**: Table added as component
- **component**: Add icon to nav tabs
- **component**: Add navigation double left icon
- **hook**: Add apiFetch to collect data from api
- **function**: Add relationship field type to fieldData
- **hook**: Add getCookie to get a local session cookie by name
- **function**: Render Markdown text
- **function**: Django DRF auto field data
- **styles**: Initial stylesheet
- **layout**: Initial Create Page
- Add base routes with error handler
- **component**: Add badge button/icon
- **component**: Add ticket comment
- **layout**: Initial Ticket Page
- **component**: Add Icon Loader
- **component**: Add Ticket status Icon
- **component**: Add Ticket Icon notification
- **component**: Add Icon software
- **component**: Add Icon reply
- **component**: Add Icon organization
- **component**: Add Icon nav right
- **component**: Add Icon nav down
- **component**: Add Icon menu
- **component**: Add Icon itam
- **component**: Add Icon edit
- **component**: Add Icon device
- **component**: Add Icon assistance
- **component**: Add Icon Task
- **component**: Add field text
- **component**: Add form field text area
- **component**: Add form field slider
- **component**: Add form field select
- **layout**: Initial Error Page
- **component**: Add details layout navtabs
- **component**: Add page navbar
- **component**: Add page header
- **component**: Add page footer
- **component**: Add detail layout section and column
- **layout**: Add root layout
- **layout**: Add list layout
- **layout**: Add detail layout
- Add exception class

### Fixes

- **layout**: Dont show comments on tickets if no metadata exists
- **layout**: Add error handling to detail if metadata missing
- **style**: correct icon size for table expandable row
- **component**: Dont show collapsible field expander if there are no fields
- **layout**: On page_data change re-fetch metadata
- **hook**: dont return body during apiFetch if HTTP/204
- **hooks**: Always return the cookie value for getCookie
- **function**: Ensure for field data that relationship and serializer dont attempt to fetch object items when not an object
- **component**: Dont attempt to load table unless both data and meta available

### Refactoring

- move nav to urlBuilder
- **detail**: Only re-render when required
- tickets to load comments in separate component
- metadata path change `metadata.actions.<method>` -> `metadata.fields`
- Add metadata dynamic loading of method key
- **layout**: Model note form creation of forms
- **layout**: Add model note form and tab
- **layout**: Add conversion of ticket and comment duration
- **component**: Add Related tickets
- **component**: Linked items to be a markdown field
- **component**: add ID to fields
- **component**: add ID to textfield
- **layout**: Ticket comments so they work with DRF
- **layout**: Use field data to fetch status badge
- **layout**: migrate ticket comments request to django api
- **component**: Only show edit button on details tab of detail view
- **componend**: adjust anchor tags to Link component

## 0.0.1 (2024-09-27)
