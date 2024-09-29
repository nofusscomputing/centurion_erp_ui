import FieldData from "../../../functions/FieldData";



const SingleColumn = ({
    data,
    metadata,
    fields = []
}) => {

    let fieldClass = 'text'

    return (
        <div className="single">
            <div className="column">
                {fields.map((field) => {

                    if(
                        field == "model_notes"
                        || String(metadata.actions.PUT[field].type).toLowerCase() == "json"
                    ) {

                        return(

                            <fieldset className="textarea">
                                <label>
                                    {
                                        (
                                            field in metadata.actions.PUT
                                        ) ?
                                            metadata.actions.PUT[field].label
                                            :
                                            ""
                                    }
                                </label>
                                    <FieldData
                                        full_width = {true}
                                        metadata={metadata}
                                        field_name={field}
                                        data={data}
                                    />
                            </fieldset>
                        )

                    } else {

                        return (
                            <fieldset className="inline">
                                <label>
                                    {
                                        (
                                            field in metadata.actions.PUT
                                        ) ?
                                            metadata.actions.PUT[field].label
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
                            </fieldset>
                        )
                    }
                })}
            </div>
        </div>
    );
}

export default SingleColumn;
