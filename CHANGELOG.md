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
