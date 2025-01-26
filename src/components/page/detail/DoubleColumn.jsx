import FieldData from "../../../functions/FieldData";



const DoubleColumn = ({
    data,
    metadata,
    left = [],
    right = [],
    textarea_fields = []
}) => {


    return (

        <div className="double">

            <div className="column">
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
            </div>

            <div className="column">
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
            </div>
        </div>
    );
}

export default DoubleColumn;
