import {
    useContext,
    useEffect,
    useState
} from "react";

import {
    Form,
    Link,
    useActionData,
    useLocation,
} from "react-router";

import {
    ActionGroup,
    Alert,
    AlertGroup,
    Button,
    DescriptionList,
    DescriptionListDescription,
    DescriptionListGroup,
    DescriptionListTerm,
    Flex,
    FlexItem,
    List,
    ListItem,
} from "@patternfly/react-core";

import { apiFetch } from "../hooks/apiFetch";
import FieldData from "../functions/FieldData";
import FormField from "./FormField";
import { FormatTime } from "../functions/FormatTime";
import { useIsMobile } from "../hooks/useIsMobile";
import UserContext from "../hooks/UserContext";



export const Fields = ({
    errorState,
    fields,
    formState,
    isCreate = false,
    isEdit,
    objectData,
    objectMetadata,
    onChange,
}) => {

    let textarea_fields = [
        'json',
        'markdown'
    ];

    return fields.map((field) => {

        if(
            String(objectMetadata.fields[field]?.type).toLowerCase() == 'markdown'
            && field !== 'model_notes'
            && textarea_fields.includes(String(objectMetadata.fields[field]?.type).toLowerCase())
            && ! isEdit
        ) {

            return(
                    <FieldData
                        full_width = {true}
                        metadata={objectMetadata}
                        field_name={field}
                        data={objectData}
                    />
            );

        } else {

            if( ! isEdit ) {

                return(
                    <DescriptionListGroup>
                        <DescriptionListTerm>{objectMetadata.fields[field]?.label}</DescriptionListTerm>
                        <DescriptionListDescription>
                            <FieldData
                                metadata={objectMetadata}
                                field_name={field}
                                data={objectData}
                            />
                        </DescriptionListDescription>
                    </DescriptionListGroup>
                );

            }

            /**
             * 
             * 
             *     Pure Form Group
             * 
             */

            if(field in objectMetadata.fields ) {
                return (
                    <FormField
                        errorState={errorState}
                        fieldName = {field}
                        formState = {formState}
                        isCreate = {isCreate}
                        isEdit = {isEdit}
                        objectData = {objectData}
                        objectMetadata = {objectMetadata}
                        onChange = {onChange}
                    />
                );
            } else {
                return;
            }
        }
    })
}



const Column = ({isEdit, isMobile, children}) => {


    if( isEdit ) {

        return (
            <div className="pf-v6-c-form pf-m-horizontal">
                {children}
            </div>
        );

    } else {

        return (
            <DescriptionList
                autoFitMinModifier={{default:"140px"}}
                columnModifier={{
                    default: '1Col'
                }}
                aria-label="Model fields"
                horizontalTermWidthModifier={{default:"140px"}}
                isHorizontal={!isMobile}
                isInlineGrid
            >

                {children}

            </DescriptionList>
        );
    }
}



/** Display Fields
 * 
 * Create the layout for the specified fields.
 * 
 * @todo there needs to be a way to specify if its just going to be markdown/json
 *  field data, or if its going to be a description list group.
 * 
 * @param props
 * @param {object} props.existingFormData Data for the object
 * @param {array} props.layout Page Layout information.
 * @param {boolean} props.isCreate set fields to create mode
 * @param {object} props.metadata API Metadata for the object.
 * 
 * @returns Component ready to be placed on a card.
 */
const DisplayFields = ({
    existingFormData = null,
    isCreate = false,
    layout = null,
    metadata,
    onClose = null,
}) => {

    const actionData = useActionData();

    const [ data, setformData ] = useState(existingFormData);

    const [ pageMetadata, setPageMetadata ] = useState(metadata);

    const [ formState, setFormState ] = useState({});

    const isMobile = useIsMobile();

    const location = useLocation();

    const [ isEdit, setIsEdit ] = useState(true);

    const [ isLoading, setIsLoading ] = useState(true);

    const user = useContext(UserContext);

    const handleOnClose = (_event) => {

        if( _event === true ) {
            if( onClose ) {
                onClose(true);
            }
        }
    };

    useEffect(() => {
        setformData(existingFormData)
        setPageMetadata(metadata)
    }, [existingFormData]);


    useEffect(() => {

        if(actionData?.body && actionData?.ok) {

            setformData(actionData?.body);

            if( isCreate && isLoading ) {

                delete actionData.body;
                delete actionData.errors;
                delete actionData.ok;

                if( onClose ) {
                    onClose(true)
                }

            }

        }
    }, [actionData])


    useEffect(() => {

        setIsEdit(() => {
            if(
                actionData?.errors
                ||
                String(location.pathname).endsWith('/add')
                ||
                isCreate
            ) {
                return true;
            }

            return false;
        })

    }, [actionData, location.pathname])


    let cardData;

    if( layout.layout === 'double' && ! isCreate ) {

        cardData = (
            <>
            <Flex
                gap={{ default: 'gap'}}
            >
                <FlexItem
                    grow={{ default: 'grow'}}
                >
                    <Column
                        isEdit = {isEdit}
                        isMobile={isMobile}
                    >
                        <Fields
                            errorState={actionData}
                            fields={layout.left}
                            formState={formState}
                            isCreate={isCreate}
                            isEdit={isEdit}
                            objectData={data}
                            objectMetadata={pageMetadata}
                            onChange={setFormState}
                        />
                    </Column>
                </FlexItem>

                 <FlexItem
                    grow={{ default: 'grow'}}
                 >
                    <Column
                        isEdit = {isEdit}
                        isMobile={isMobile}
                    >
                        <Fields
                            errorState={actionData}
                            fields={layout.right}
                            formState={formState}
                            isCreate={isCreate}
                            isEdit={isEdit}
                            objectData={data}
                            objectMetadata={pageMetadata}
                            onChange={setFormState}
                        />
                    </Column>
                </FlexItem>
            </Flex>
            </>
        );

    } else if( layout.layout === 'single' || isCreate ) {

        let columnFields = layout.fields

        if( isCreate) {
            columnFields = Object.entries(pageMetadata.fields).map(([fieldName, meta]) => {
                return fieldName;
            });
        }

        cardData = (
            <Column
                isEdit = {isEdit}
                isMobile={isMobile}
            >
                <Fields
                    errorState={actionData}
                    fields={columnFields}
                    formState={formState}
                    isCreate={isCreate}
                    isEdit={isEdit}
                    objectData={data}
                    objectMetadata={pageMetadata}
                    onChange={setFormState}
                />
            </Column>
        );

    }

    const actionGroup = (

            <ActionGroup
                style={
                    isEdit ?
                        undefined
                    :
                    { paddingTop: "var(--pf-t--global--spacer--2xl)" }
                }
            >
                {isEdit &&
                    <Button
                        type="submit"
                        variant="primary"
                    >
                        Save
                    </Button>
                }

                <Button
                    variant={!isEdit ? "primary" : "secondary"}
                    onClick={(_event) => {
                        setIsEdit(_event.target.textContent === 'Cancel' ? false : true)

                        if( _event.target.textContent == 'Cancel' ) {

                            setFormState({})
                            handleOnClose(true)

                        }

                        if( String(location.pathname).endsWith('/add') ) {

                        }

                    }}
                    component={String(location.pathname).endsWith('/add') ? (props) => <Link {...props} to={String(location.pathname).replace('/add', '')}/>:undefined}
                >
                    {isEdit ? "Cancel" : "Edit"}
                </Button>
            </ActionGroup>
    )

    if( isEdit ) {

        cardData = (
            <Form
                id="random"
                method={(String(location.pathname).endsWith('/add') || isCreate) ? "POST" : "PATCH"}
                className = "pf-v6-c-form pf-m-horizontal"
                onSubmit={(_event) => {
                    setIsLoading(true)
                }}
            >
                {actionData?.errors &&
                <AlertGroup>
                    <Alert
                        variant="danger"
                        isInline
                        title="The following field(s) have errors:"
                        timeout={false}
                    >
                        <List>
                        {Object.entries(actionData.errors).map(([fieldKey, fieldErrors]) => {

                            return (<ListItem>{pageMetadata.fields[fieldKey].label}</ListItem>);

                        })}
                        </List>
                    </Alert>
                </AlertGroup>
                }

                {cardData}
                {actionGroup}

                <input id="formState" type="hidden" name="formState" value={JSON.stringify(formState)} />
                <input id="metadata" type="hidden" name="metadata" value={JSON.stringify(pageMetadata)} />
                <input id="tz" type="hidden" name="tz" value={user.settings.timezone} />

            </Form>
        );

    }


    return (
        <>
            {cardData}

            { !isEdit &&
                actionGroup
            }
        </>
    );

}



export default DisplayFields;



/**
 * @function APISubmitAction
 *
 * @description
 * React Router route `action` handler used to submit form data to a backend
 * endpoint (typically a Django REST Framework API). The function processes
 * submitted `FormData`, extracts the serialized `formState`, and constructs
 * a payload object suitable for API submission.
 *
 * This action expects the form submission to include a field named
 * `formState` containing a JSON serialized object representing the
 * client-side form state.
 *
 * The action also reads other standard form fields such as `tz`
 * (timezone) and merges them with the parsed `formState`.
 *
 * @param {Object} params
 * @param {Request} params.request
 * HTTP request object provided by React Router containing the submitted
 * `FormData`.
 *
 * @returns {Promise<Response|Object|null>}
 * Returns the result of the backend submission or null depending on the
 * implementation of the calling code.
 *
 * @throws {Error}
 * Throws if the `formState` field is missing or cannot be parsed as JSON.
 *
 * @example
 * Form submission must include a serialized form state:
 *
 * <Form method={method}>
 *   <input type="hidden" name="formState" value={JSON.stringify(formState)} />
 *   <input type="hidden" name="metadata" value={JSON.stringify(metadata)} />
 *   <input type="hidden" name="tz" value={timezone} />
 * </Form>
 *
 * @example
 * Basic usage inside a React Router route definition:
 *
 * {
 *   path: "/:module/:id",
 *   action: APISubmitAction
 * }
 */
export async function APISubmitAction({ request }) {


    console.debug(request);    // Trace

    const data = await request.formData();

    const metadata = JSON.parse(data.get('metadata'));

    if( !metadata ) {

        throw new Error('metadata field must be provided in the submitted form');

    }

    const formState = JSON.parse(data.get('formState'));

    if( !formState ) {

        throw new Error('formState field must be provided in the submitted form');

    }

    const timezone = data.get('tz');

    if( !timezone ) {

        throw new Error('metadata field must be provided in the submitted form');

    }

    let form_data = {}

    for (const [fieldName, fieldValue] of Object.entries(formState)) {

        if( ['metadata', 'tz'].includes( fieldName ) ) {

            continue;
        }


        if( ! metadata.fields.hasOwnProperty(fieldName) ) {    // field not part of request

            continue;
        }

        let value = '';

        switch( String(metadata.fields[fieldName].type).toLowerCase() ) {


            case 'datetime':    // Convert to the users timezone

                value = FormatTime({
                    time: String(fieldValue),
                    iso: true,
                    tz: timezone
                });

                break;

            default:

                value = fieldValue;

                break;

        }

        if( value !== '' && value !== 0 ){

            form_data = {
                ...form_data,
                [fieldName]: value
            }

        }


    }


    let actionReturn = {
        // errors: {},    // Don't include this key by default. its existance denotes an error has occured.
        ok: false,
        body: null
    }

    const update = await apiFetch(
        // document.location.pathname,
        metadata.urls.self,
        null,
        request.method,
        form_data,
        false,
        false
    )
        .then(async (response) => {

            actionReturn.ok = response.ok;

            if( response.ok ) {

                actionReturn.body = await response.clone().json();

            } else {

                actionReturn.errors = await response.clone().json();

            }


            return response;

        });


    console.debug(update);    // Trace

    console.debug(actionReturn);    // Trace
    
    return actionReturn;

}