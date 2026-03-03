import { useEffect, useState } from "react";

import FieldData from "../../../functions/FieldData";

import { apiFetch } from "../../../hooks/apiFetch";

import Section from "../../Section";
import IconLoader from "../../IconLoader";



const LinkedItems = ({
    data_url = null
}) => {

    const [ page_data, setPageData ] = useState(null)
    const [ metadata, setMetaData ] = useState(null)
    const [ refresh, setRefresh ] = useState(false)

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
    }, [ data_url, refresh ])


    const handleDeleteLinkedItem = (e) => {

        let url = `${data_url}/${e.currentTarget.id}`

        console.log(`Removing Linked Item ${url}`)

        apiFetch(
            url,
            null,
            'DELETE',
            null,
            false
        )

        setRefresh( refresh ? false : true )

    }

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
                                display: 'flex',
                                margin: '0 .5rem',
                                width: 'fit-content',
                                height: 'var(--line-height-common)',
                            }}
                        >

                            <FieldData
                                metadata={metadata}
                                field_name='display_name'
                                data={linked_item}
                            />
                            <span
                                className={"icon"}
                                style={{
                                    justifyContent: 'flex-end',
                                    marginRight: '.5rem',
                                    width: '50px',
                                }}
                            >
                                <span
                                    id={linked_item['id']}
                                    onClick={handleDeleteLinkedItem}
                                >
                                    <IconLoader
                                        name='delete'
                                    />
                                </span>
                            </span>

                        </div>
                    )

                })}
            </div>

        </Section>
    );
}
 
export default LinkedItems;