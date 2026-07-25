import React, {
    useEffect,
    useState
} from "react";

import {
    Badge,
    Card,
    CardBody,
    CardExpandableContent,
    CardHeader,
    CardTitle,
    Dropdown,
    DropdownItem,
    DropdownList,
    MenuToggle,
    Skeleton
} from "@patternfly/react-core";

import {
    RhUiEllipsisVerticalFillIcon
} from "@patternfly/react-icons";

import '../styles/components/data_card.css'

import { apiFetch } from "../hooks/apiFetch";
import { DataSetList } from "./DataSet";



/**
 * @summary Props for DataCard
 * 
 * @category Props
 * @expand
 * @since 0.12.0
 */
export type DataCardProps = {

    /**
     * Add a delete button to the row.
     */
    hasRowDelete?: boolean

    /**
     * Should the row be setup as a draggable row?
     */
    isDraggable?: boolean

    /**
     * Setup the card as an expandable card
     */
    isExpandable?: boolean

    /**
     * URL to fetch the data from
     */
    url: string
}


/**
 * A card that contains a {@link DataSetList}.
 * 
 * @summary Display a dataset within a card.
 * 
 * @category Component
 * @since 0.12.0
 */
const DataCard = ({
    hasRowDelete = false,
    isDraggable = false,
    isExpandable = false,
    url = null
}: DataCardProps): React.JSX.Element => {


    const [ isExpanded, setIsExpanded ] = useState(false);

    const [ isActionMenuOpen, setActionMenuIsOpen ] = useState<boolean>(false);

    const [ pageData, setPageData ] = useState<APIDataset>(null)

    const [ metaData, setMetaData ] = useState<APIMetadata>(null)

    const [ refresh, setRefresh ] = useState<Boolean>(false)

    useEffect(() => {

        if( ( pageData && metaData) ) return;

        apiFetch(
            url,
            (data, metaData) => {

                setPageData(data)

                setMetaData(metaData)

                setRefresh(false)

            },
            undefined,
            undefined,
        )
    }, [ url, refresh ])


    const onExpandActionMenu = (event: React.MouseEvent, id: string) => {

        setIsExpanded(!isExpanded);

    };


    const onSelectActionMenu = () => {

        setActionMenuIsOpen(!isActionMenuOpen);

    };


    const cardBody = (
        <CardBody>
            { ! (metaData || pageData) && <Skeleton />}

            { metaData && pageData &&

                <DataSetList
                    hasRowDelete = {hasRowDelete}
                    isCompact = {true}
                    isDraggable = {isDraggable}
                    rowData = {pageData}
                    metadata = {metaData}
                />

            }

        </CardBody>
    );


    return (
        <Card
            className = "data-card"
            isCompact
            {...( isExpandable && {isExpanded: isExpanded})}
        >
            <CardHeader
                actions={{
                    actions: (
                        <Dropdown
                            onSelect={onSelectActionMenu}
                            toggle={
                                toggleRef =>
                                    <MenuToggle
                                        ref={toggleRef}
                                        isExpanded={isActionMenuOpen}
                                        onClick={() => setActionMenuIsOpen(!isActionMenuOpen)}
                                        variant="plain"
                                        aria-label="Card header images and actions example kebab toggle"
                                        icon={<RhUiEllipsisVerticalFillIcon />} />
                            }
                            isOpen={isActionMenuOpen}
                            onOpenChange={isOpen => setActionMenuIsOpen(isOpen)}
                        >
                            <DropdownList>
                                {/* <DropdownItem
                                    onClick={newDependency}
                                >
                                    Add
                                </DropdownItem> */}
                                <DropdownItem
                                    key="refresh"
                                    onClick={() => {
                                        setRefresh(false);
                                        setRefresh(true);
                                        setMetaData(null);
                                        setPageData(null);
                                    }}
                                >
                                    Refresh
                                </DropdownItem>
                            </DropdownList>
                        </Dropdown>
                    ),
                    hasNoOffset: false
                }}
                {...( isExpandable && {onExpand: onExpandActionMenu})}
            >

                <CardTitle>
                    { (! metaData || ! pageData) && <Skeleton />}
                    { metaData && pageData &&
                    <>
                    <span>{metaData.name}</span>
                    &nbsp;
                    <Badge isRead>{pageData.meta.pagination.count}</Badge>
                    </>}
                </CardTitle>
            </CardHeader>

            {! isExpandable &&
            cardBody}

            {isExpandable &&
            <CardExpandableContent>
                {cardBody}
            </CardExpandableContent>}

        </Card>
    );
}
 
export default DataCard;
