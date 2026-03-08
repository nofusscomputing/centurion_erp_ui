import {
    Flex,
    FlexItem
} from "@patternfly/react-core";

import FieldData from "../../../functions/FieldData";



const DoubleColumn = ({
    data,
    metadata,
    left = [],
    right = [],
    textarea_fields = []
}) => {


    return (
        <Flex
            direction={{ default: 'row' }}
            justifyContent={{ default: 'justifyContentCenter' }}
            flexWrap={{ default: 'wrap' }}
            
        >

            <FlexItem>

                {left.map((field) => {
                if( field in metadata.fields ) {

                    return (
                        (
                            ( ! textarea_fields.includes(String(metadata.fields[field].type).toLowerCase()) ) ?
                            <fieldset className="inline">
                                <label>
                                    {
                                        (
                                            field in metadata.fields
                                        ) ?
                                            metadata.fields[field].label
                                            :
                                            ""
                                    }
                                </label>
                                <span className="text">
                                    <FieldData
                                        metadata={metadata}
                                        field_name={field}
                                        data={data}
                                    />
                                </span>
                            </fieldset> :

                            <fieldset className="textarea">
                                <label>
                                    {
                                        (
                                            field in metadata.fields
                                        ) ?
                                            metadata.fields[field].label
                                            :
                                            ""
                                    }
                                </label>
                                <div className="markdown">
                                    <FieldData
                                        metadata={metadata}
                                        field_name={field}
                                        data={data}
                                    />
                                </div>
                            </fieldset>
                        )
                    )
                }
            })}
            </FlexItem>

            <FlexItem>
            {right.map((field) => {

                if( field in metadata.fields ) {
                    return (

                        ( ! textarea_fields.includes(String(metadata.fields[field].type).toLowerCase()) ) ?
                        <fieldset className="inline">
                            <label>
                                {
                                    (
                                        field in metadata.fields
                                    ) ?
                                        metadata.fields[field].label
                                        :
                                        ""
                                }
                            </label>
                            <span className="text">
                                <FieldData
                                    metadata={metadata}
                                    field_name={field}
                                    data={data}
                                />
                            </span>
                        </fieldset> :

                        <fieldset className="textarea">
                            <label>
                                {
                                    (
                                        field in metadata.fields
                                    ) ?
                                        metadata.fields[field].label
                                        :
                                        ""
                                }
                            </label>
                            <div className="markdown">
                                <FieldData
                                    metadata={metadata}
                                    field_name={field}
                                    data={data}
                                />
                            </div>
                        </fieldset>
                    )
                }
            })}
            </FlexItem>
        </Flex>
    );
}

export default DoubleColumn;
