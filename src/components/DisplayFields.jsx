import {
    DescriptionListDescription,
    DescriptionListTerm
} from "@patternfly/react-core";

import FieldData from "../functions/FieldData";



/** Display Fields
 * 
 * Create the layout for the specified fields.
 * 
 * @todo there needs to be a way to specify if its just going to be markdown/json
 *  field data, or if its going to be a description list group.
 * 
 * @param {Object} data Data for the object
 * @param {Array} fields Fields to display
 * @param {object} data API Metadata for the object.
 * 
 * @returns Component ready to be placed on a card.
 */
const DisplayFields = ({
    data,
    fields,
    metadata,
}) => {


    let textarea_fields = [
        'json',
        'markdown'
    ]

    return(
        fields.map((field) => {

            if(
                String(metadata.fields[field]?.type).toLowerCase() == 'markdown'
                && field !== 'model_notes'
                && textarea_fields.includes(String(metadata.fields[field]?.type).toLowerCase())
            ) {

                return(
                    <div className="markdown">
                        <FieldData
                            full_width = {true}
                            metadata={metadata}
                            field_name={field}
                            data={data}
                        />
                    </div>
                )

            } else {

                return(
                    <>
                        <DescriptionListTerm>{metadata.fields[field]?.label}</DescriptionListTerm>
                        <DescriptionListDescription>
                            <FieldData
                                full_width = {true}
                                metadata={metadata}
                                field_name={field}
                                data={data}
                            />
                        </DescriptionListDescription>
                    </>
                )

            }
        })
    )


}

export default DisplayFields;