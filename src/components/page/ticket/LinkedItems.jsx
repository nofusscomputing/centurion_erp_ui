import {
    useEffect,
    useState
} from "react";

import {
    Card,
    CardBody,
    CardTitle,
    Flex,
    FlexItem
} from "@patternfly/react-core";

import { apiFetch } from "../../../hooks/apiFetch";
import FieldData from "../../../functions/FieldData";
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
        <Card
            className="linked-items"
            isCompact
        >
            <CardTitle>Linked Items</CardTitle>
            <CardBody>
            <div
                className="items"
            >
                <Flex>
                {page_data && metadata &&
                page_data.results?.map((linked_item) => {

                    return (
                        <FlexItem>
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
                        </FlexItem>
                    )

                })}
                </Flex>
            </div>
            </CardBody>
        </Card>
    );
}
 
export default LinkedItems;
