import {
    useContext,
    useEffect,
    useState
} from "react";

import {
    Form,
    Link,
    useActionData,
    useLocation
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



const Fields = ({
    fields,
    formState,
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
        ) {

            return(
                <div className="markdown">
                    <FieldData
                        full_width = {true}
                        metadata={objectMetadata}
                        field_name={field}
                        data={objectData}
                    />
                </div>
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
            return (
                <FormField
                    fieldName = {field}
                    formState = {formState}
                    isEdit = {isEdit}
                    objectData = {objectData}
                    objectMetadata = {objectMetadata}
                    onChange = {onChange}
                />
            );

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
                isAutoFit
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
 * @param {{
 *      existingFormData: object,
 *      layout: array,
 *      metadata: object,
 * }}
 * @param existingFormData Data for the object
 * @param layout Page Layout information.
 * @param data API Metadata for the object.
 * 
 * @returns Component ready to be placed on a card.
 */
const DisplayFields = ({
    existingFormData = null,
    layout = null,
    metadata,
}) => {
    const [ data, setformData ] = useState(existingFormData);

    const [ formState, setFormState ] = useState({});

    const isMobile = useIsMobile();

    const location = useLocation();

    const [ isEdit, setIsEdit ] = useState(true);

    const [ isLoading, setIsLoading ] = useState(true);

    const user = useContext(UserContext);

    let cardData;

    if( layout.layout === 'double' ) {

        cardData = (
            <>
            <Flex direction={{ default: 'row' }} >
                <FlexItem flex={{ default: 'flex_1' }} >
                    <Column
                        isEdit = {isEdit}
                        isMobile={isMobile}
                    >
                        <Fields
                            fields={layout.left}
                            formState={formState}
                            isEdit={isEdit}
                            objectData={data}
                            objectMetadata={metadata}
                            onChange={setFormState}
                        />
                    </Column>
                </FlexItem>

                 <FlexItem flex={{ default: 'flex_1' }} >
                    <Column
                        isEdit = {isEdit}
                        isMobile={isMobile}
                    >
                        <Fields
                            fields={layout.right}
                            formState={formState}
                            isEdit={isEdit}
                            objectData={data}
                            objectMetadata={metadata}
                            onChange={setFormState}
                        />
                    </Column>
                </FlexItem>
            </Flex>
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

                        }

                        if( String(location.pathname).endsWith('/add') ) {

                        }

                    }}
                    component={String(location.pathname).endsWith('/add') ? (props) => <Link {...props} to={String(location.pathname).replace('/add', '')}/>:undefined}
                >
                    {isEdit ? "Cancel" : "Edit"}
                </Button>
            </ActionGroup>
            </>
        );

    } else if( layout.layout === 'single' ) {

        cardData = (
            <Column
                isEdit = {true}
                isMobile={isMobile}
            >
                <Fields
                    fields={layout.fields}
                    formState={formState}
                    isEdit={isEdit}
                    objectData={data}
                    objectMetadata={metadata}
                    onChange={setFormState}
                />
            </Column>
        );

    }

    return (
        <>
            {isEdit &&
            <>
            <Form
                id="random"
                method={String(location.pathname).endsWith('/add') ? "POST" : "PATCH"}
                className = "pf-v6-c-form pf-m-horizontal"
                onSubmit={(_event) => {
                    setIsLoading(true)
                }}
            >


                {cardData}

            </Form>
            </>
            }
            { !isEdit && <> {cardData} </> }
        </>
    );

}

export default DisplayFields;