import { useEffect, useState } from "react";

import FieldData from "../../../functions/FieldData";

import { apiFetch } from "../../../hooks/apiFetch";

import Section from "../../Section";



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
        <Section
            className="linked-items"
            style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
            }}
            titleBar={(
                <h3
                    className="linked-items"
                    style={{
                        fontSize: 'var(--font-size)',
                        margin: '0',
                    }}
                >
                    Linked Items
                </h3>
            )}
        >
            <div
                className="items"
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                }}
            >
                {page_data && metadata &&
                page_data.results?.map((linked_item) => {

                    return (
                        <div
                            className="item" key={linked_item['id']+'-linked_item'}
                            style={{
                                margin: '0 .5rem',
                            }}
                        >

                            <FieldData
                                metadata={metadata}
                                field_name='display_name'
                                data={linked_item}
                            />

                        </div>
                    )

                })}
            </div>

        </Section>
    );
}
 
export default LinkedItems;