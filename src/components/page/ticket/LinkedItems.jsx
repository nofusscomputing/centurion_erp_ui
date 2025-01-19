import { useEffect, useState } from "react";
import { apiFetch } from "../../../hooks/apiFetch";
import FieldData from "../../../functions/FieldData";

const LinkedItems = ({
    data_url = null
}) => {

    const [ page_data, setPageData ] = useState(null)
    const [ metadata, setMetaData ] = useState(null)

    useEffect(() => {

        apiFetch(
            data_url,
            (data, metadata) => {

                setPageData(data)

                setMetaData(metadata)

            },
            undefined,
            undefined,
        )
    }, [ data_url ])


    return (
        <section className="linked-items">
            <h3 className="linked-items">Linked Items</h3>
            {page_data && metadata &&
                page_data.results.map((linked_item) => {
                    return (
                        <div className="item" key={linked_item['id']+'-linked_item'}>
                            <div className="markdown align-center">
                                <FieldData
                                    metadata={metadata}
                                    field_name='display_name'
                                    data={linked_item}
                                />
                            </div>
                        </div>)
                })
            }
        </section>
    );
}
 
export default LinkedItems;