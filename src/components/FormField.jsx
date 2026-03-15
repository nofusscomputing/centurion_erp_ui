import {
    useRef,
} from "react";

import {
    Alert,
    FormGroup,
    FormGroupLabelHelp,
    FormHelperText,
    FormSelect,
    FormSelectOption,
    HelperText,
    HelperTextItem,
    Popover,
    Switch,
    TextArea,
    TextInput
} from "@patternfly/react-core";

import FieldData from "../functions/FieldData";



/** Display a Form Field
 * 
 * ## Form State
 * 
 * Form State is maintained by this component. each edit to a form field will
 * update the form state with just what was edited and any required fields.
 * 
 * The form state object will be in the format ready to be used as the JSON
 * body that the API requires.
 * 
 * @param {{
 *      errorState: array<Object>
 *      fieldName: string,
 *      formState: string,
 *      isEdit: boolean,
 *      objectData: object,
 *      objectMetadata: object,
 *      onChange: function
 * }}
 * @param errorState Any found errors.
 * @param fieldName name of the field. This is the name of the key within the API object.
 * @param formState State of any edits within the form.
 * @param isCreate Is new field data being added
 * @param isEdit Is the field being edited.
 * @param objectData object as received from API.
 * @param objectMetadata object metadata as received from API.
 * @param onChange State hook to save stat_event.
 * 
 * @returns Desired Form Field as a ready to place component.
 */
const FormField = ({
    errorState,
    fieldName,
    formState,
    isEdit = false,
    isCreate = false,
    objectData,
    objectMetadata,
    onChange = null,
}) => {

    const labelHelpRef = useRef(null);

    const isRequired = Boolean(objectMetadata.fields[fieldName].required);

    const readOnly = Boolean(objectMetadata.fields[fieldName].read_only)

    const writeOnly = Boolean(objectMetadata.fields[fieldName].write_only);

    if(
        (isCreate && ((readOnly && !writeOnly) ))
        || (isEdit && readOnly)
    ) { // Don't show a read-only field.
        return;
    }

    if( !formState ) {

        throw Error("field formState is required to render a form field.")

    }


    const handleFieldChange = (_event, field) => {

        let field_value = _event.target.value;

        if( _event.target.type === 'checkbox' ) {

            field_value = _event.target.checked;

        } else if( _event.target.type === 'select-one' ) {

            field_value = Number(field_value);

        } else if( _event.target.type === 'select-multiple' ) {

            let select_val = Array();

            for( const option of _event.target ) {

                if( option.selected ) {

                    select_val.push(Number(option.value));

                }
            }

            field_value = select_val;
        }


        if( field_value !== null ){

            onChange((prevState) => ({ ...prevState, [_event.target.name]: field_value }));

        } else {

            onChange((prevState) => {

                const next = { ...prevState };

                delete next[_event.target.name];

                return next;

            });
        }
    }


    const fetchFormField = () => {

        const dataFieldType = objectMetadata.fields[fieldName].type;

        const fieldData = (
            fieldName in formState ?
                formState[fieldName]
            :
                FieldData({
                    metadata: objectMetadata,
                    field_name: fieldName,
                    data: objectData,
                    withFormatting: (
                        (dataFieldType === 'DateTime' && readOnly) ?
                            true
                        :
                            false
                    )
                })
        )

        let updatedFieldData = (isCreate ?objectMetadata.fields[fieldName].initial : fieldData);

        switch( dataFieldType ) {

            case 'Boolean':

                return (
                    <Switch
                        id="simple-switch"
                        key = {fieldName}
                        name = {fieldName}
                        isChecked={fieldData}
                        onChange={handleFieldChange}
                        ouiaId="BasicSwitch"
                    />
                );

            case 'Choice':
            case 'Relationship':

                let selectedOption = null;

                const selectOptions = Object.entries(objectMetadata.fields[fieldName].choices).map(([key, choice]) => {

                        const options = { "component": [] }

                        if(
                            ( typeof(choice.value) === 'number' && Number(fieldData) == choice.value )
                            ||
                            ( typeof(choice.value) === 'string' && String(fieldData) == choice.value )
                        ) {

                            selectedOption = choice.value;

                        }


                        return (
                            <FormSelectOption
                                isDisabled={false}
                                key={key}
                                value={choice.value}
                                label={choice.display_name}
                            />
                        );
                    })

                return (
                    <FormSelect
                        aria-label="FormSelect Input"
                        key = {fieldName}
                        name = {fieldName}
                        onChange={handleFieldChange}
                        ouiaId="BasicFormSelect"
                        value={selectedOption}
                    >
                        <FormSelectOption isDisabled={false} key="empty" value={null} label={''} />
                        {selectOptions}

                    </FormSelect>
                );

            case 'Date':
            case 'DateTime':
            case 'Email':
            case 'GenericField':    // 'UUID':    // todo: fix centurion field type
            case 'String':

                let inputFieldType = "text";

                if( dataFieldType === 'Date' ) {

                    if( !readOnly ) {
                        inputFieldType = "date"
                    }
                } else if( dataFieldType === 'DateTime' ) {

                    if( !readOnly ) {
                        inputFieldType = "datetime-local"
                    }
                } else if( dataFieldType === 'Email' ) {

                    if( !readOnly ) {
                        inputFieldType = "email"
                    }
                }
                }


                return (
                    <TextInput
                        aria-describedby = "simple-form-name-01-helper"
                        isRequired = {isRequired}
                        id = {fieldName}
                        key = {fieldName}
                        name = {fieldName}
                        onChange = {handleFieldChange}
                        readOnly = {readOnly}
                        type = {inputFieldType}
                        value = {updatedFieldData}
                    />
                );

            case 'JSON':
            case 'Markdown':

                if( updatedFieldData?.render ) {
                    updatedFieldData = updatedFieldData.markdown;
                }

                return (
                    <TextArea
                        aria-label = "text area example"
                        isRequired = {isRequired}
                        id = {fieldName}
                        key = {fieldName}
                        name = {fieldName}
                        onChange = {handleFieldChange}
                        readOnly = {readOnly}
                        resizeOrientation = "vertical"
                        value = {updatedFieldData}
                    />
                );

            default:

                if( fieldData?.render ) {
                    return fieldData;
                }
        }
    }


    return (
        <FormGroup
            label = {objectMetadata.fields[fieldName].label}
            labelHelp = {
                <Popover
                    triggerRef = {labelHelpRef}
                    bodyContent = {objectMetadata.fields[fieldName].help_text}
                >
                        <FormGroupLabelHelp ref = {labelHelpRef} aria-label = "More info for name field" />
                        
                </Popover>
            }
            isRequired = {isRequired}
            fieldId = "simple-form-name-01"
        >

            {fetchFormField()}

            <FormHelperText>
            <HelperText>
                <HelperTextItem>
                    {errorState?.errors?.[fieldName] && 

                        errorState.errors[fieldName].map(( errorText ) => {
                        
                            return (
                                <Alert variant = "danger" isInline isPlain title = {errorText.message} />
                            );
                        })
                    }
                </HelperTextItem>
            </HelperText>
            </FormHelperText>
        </FormGroup>
    );


}

export default FormField;
