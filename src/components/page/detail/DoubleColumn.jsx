import FieldData from "../../../functions/FieldData";



const DoubleColumn = ({
    data,
    metadata,
    left = [],
    right = []
}) => {

    console.log('doubleColumn: ' + JSON.stringify(metadata.actions.PUT))

    return (
        <div className="double">
            <div className="column">
                {left.map((field) => (
                    (
                        field != "model_notes" ?
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
                            </fieldset> :

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
                                <div className="markdown">
                                    <FieldData
                                        metadata={metadata}
                                        field_name={field}
                                        data={data}
                                    />
                                </div>
                            </fieldset>
                    )
                ))}
            </div>
            <div className="column">
                {right.map((field) => (
                    (
                        field != "model_notes" ?
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
                            </fieldset> :
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
                                <div className="markdown">
                                    <FieldData
                                        metadata={metadata}
                                        field_name={field}
                                        data={data}
                                    />
                                </div>
                            </fieldset>
                    )
                ))}
            </div>
        </div>
    );
}

export default DoubleColumn;
