import React, {
    Fragment,
    useState
} from "react";

import {
    Link
} from "react-router";

import {
    Button,
    Content,
    DataList,
    DataListAction,
    DataListCell,
    DataListCheck,
    DataListItem,
    DataListItemCells,
    DataListItemRow,
    Dropdown,
    DropdownItem,
    DropdownList,
    Flex,
    FlexItem,
    MenuToggle,
    MenuToggleCheckbox,
    Pagination,
    PaginationVariant,
    Toolbar,
    ToolbarContent,
    ToolbarItem
} from "@patternfly/react-core";


import {
    EllipsisVIcon
} from '@patternfly/react-icons';

import FieldData from "../functions/FieldData";
import URLSanitize from "../functions/URLSanitize";


/** 
 * Footer for DataSet Component
 * 
 * @summary Contains the pagination for the Dataset component.
 * 
 * @param param Component props
 * @param param.component Container component.
 * @param param.componentProps Additional props passed to the container component.
 * @param param.itemCount Total count of items in the dataset.
 * @param param.pageNumber Current page number.
 * @param param.perPage Number of items to display per page.
 * @param param.setPageNumber Callback to update page number.
 * @param param.setPerPage Callback to update the number of items per page.
 * 
 * @category Component
 * @since 0.8.0
 * 
 */
export const DataSetFooter = ({
    component: Component = Fragment,
    componentProps,
    itemCount,
    pageNumber = 1,
    perPage = 10,
    setPageNumber,
    setPerPage
}: {
    component?: React.ElementType
    componentProps?: object
    itemCount: number
    pageNumber?: number
    perPage?: number
    setPageNumber: (pageNumber: number) => void
    setPerPage: (total: number) => void
}): React.JSX.Element => {

    const onPerPageSelect = (_event, newPerPage, newPage) => {
        setPerPage(newPerPage);
    };


    const onSetPage = (_event, newPage) => {
        setPageNumber(newPage);
    };


    return (
        <Component {...componentProps}>
            <Pagination
                    itemCount = {itemCount}
                    widgetId = "bottom-pagination"
                    perPage = {perPage}
                    perPageOptions = {[
                        { title: '10', value: 10 },
                        // { title: '20', value: 20 },
                        // { title: '50', value: 50 },
                        // { title: '100', value: 100 }
                    ]}
                    page = {pageNumber}
                    variant = {PaginationVariant.bottom}
                    onSetPage = {onSetPage}
                    onPerPageSelect = {onPerPageSelect} />
        </Component>
    );
};



/** 
 * Header for DataSet Component
 * 
 * @summary search, filtering, view Change for the DataSet Components.
 * 
 * @param param Component props
 * @param param.children Additional content to render.
 * @param param.component Container component.
 * @param param.componentProps Additional props passed to the container component.
 * @param param.itemCount Total count of items in the dataset.
 * @param param.metadata Objects metadata as presented by the API.
 * @param param.perPage Number of items to display per page.
 * @param param.selectedRows Row IDs of selected rows from the dataset.
 * @param param.selectRows Callback to update page number.
 * 
 * @category Component
 * @since 0.8.0
 * 
 */
export const DataSetHeader = ({
    children,
    component: Component = Fragment,
    componentProps,
    itemCount,
    metadata,
    perPage,
    selectedRows,
    selectRows,
}: {
    children?: React.ReactNode
    component?: React.ElementType
    componentProps: object
    itemCount: number
    metadata:APIMetadata
    perPage: number
    selectedRows: number[]
    selectRows: (rows: "all" | number | number[]) => void
}): React.JSX.Element => {

    const [isSplitButtonDropdownOpen, setIsCheckItemsDropdownOpen] = useState(false);

    const onCheckItemsSelect = () => {

        setIsCheckItemsDropdownOpen(!isSplitButtonDropdownOpen);

    };


    const onCheckItemsToggle = () => {

        setIsCheckItemsDropdownOpen(!isSplitButtonDropdownOpen);

    };


    const onToggleCheckItems = (value) => {

        if( value === true ) {

            selectRows("all");

        } else {

            selectRows([]);

        }

    };


    const splitButtonDropdownItems = (
        <>
            { selectedRows.length !== 0 &&
                <DropdownItem
                    value = {2}
                    key = "dataset-select-none"
                    onClick={() => selectRows([])}
                >
                    Select none (0 items)
                </DropdownItem>
            }

            {selectedRows.length < (itemCount >= perPage ? perPage : itemCount) &&
                <DropdownItem
                    value = {3}
                    key = "dataset-select-page"
                    onClick = {() => selectRows("all")}
                >
                    Select page ({itemCount >= perPage ? perPage : itemCount} items)
                </DropdownItem>
            }
        </>
    );


    return (
        <Component {...componentProps}>
            <Toolbar>
                <ToolbarContent>

                    <ToolbarItem>
                        <Dropdown
                            onSelect = {onCheckItemsSelect}
                            isOpen = {isSplitButtonDropdownOpen}
                            onOpenChange = {isOpen => setIsCheckItemsDropdownOpen(isOpen)}
                            toggle = {toggleRef => 
                                <MenuToggle
                                    ref = {toggleRef}
                                    isExpanded = {isSplitButtonDropdownOpen}
                                    onClick = {onCheckItemsToggle}
                                    aria-label = "Selected items"
                                    splitButtonItems = {
                                        [
                                            <MenuToggleCheckbox
                                                isChecked = {
                                                    selectedRows.length === (itemCount >= perPage ? perPage : itemCount)
                                                        ? true
                                                        :
                                                            selectedRows.length < perPage && selectedRows.length >= 1
                                                                ? null
                                                                : false
                                                }

                                                key = "dataset-button-checkbox"
                                                id = "dataset-button-checkbox"
                                                aria-label = "Select all"
                                                onChange = {onToggleCheckItems}
                                            >
                                                {selectedRows.length > 0 && <>{selectedRows.length} selected</>}
                                            </MenuToggleCheckbox>
                                        ]
                                    }
                                />
                            }
                        >
                            <DropdownList>{splitButtonDropdownItems}</DropdownList>
                        </Dropdown>
                    </ToolbarItem>

                    {metadata &&
                    <ToolbarItem>
                        <Button
                            variant = "primary"
                            component = {(props) => <Link {...props} to={URLSanitize(metadata.urls.self) + "/add"} />}
                        >
                            Add New
                        </Button>
                    </ToolbarItem>}
                </ToolbarContent>
            </Toolbar>
            {children}
        </Component>
    );
}



/**
 * View Dataset in cards layout
 * 
 * @summary Display the DataSet in card layout
 * 
 * @param param Component props
 * @param param.component Component to use as the container.
 * @param param.componentProps Additional props passed to the container component.
 * 
 * @category Component
 * @since 0.8.0
 * 
 * @ignore
 */
export const DataSetCard = ({
    component: Component = Fragment,
    componentProps
}: {
    component?: React.JSX.ElementType,
    componentProps?: object
}): React.JSX.Element => {


    return (
        <Component {...componentProps}></Component>
    );
}


/** 
 * View Dataset in list layout
 * 
 * @summary Display the DataSet in List layout.
 * 
 * @param param Component props
 * @param param.component Container component.
 * @param param.componentProps Additional props passed to the container component.
 * @param param.metadata Objects metadata as presented by the API.
 * @param param.rowData Data to populate the rows.
 * @param param.selectedRows Row IDs of selected rows from the dataset.
 * @param param.selectRows Callback to update page number.
 * 
 * @category Component
 * @since 0.8.0
 * 
 */
export const DataSetList = ({
    component: Component = Fragment,
    componentProps,
    metadata,
    rowData,
    selectedRows,
    selectRows,
}: {
    component?: React.ElementType
    componentProps?: object
    metadata: APIMetadata
    rowData: APIDataset
    selectedRows: number[]
    selectRows: (rows: "all" | number | number[]) => void
}): React.JSX.Element => {

    const dataListRows = rowData.results.map((row) => {

        return (
            <DataListItem
                key = {row.id}
            >
                <DataListItemRow>
                    <DataListCheck
                        aria-labelledby = {`check-action-item-${row.id}`}
                        isChecked = {selectedRows.includes(row.id)}

                        id = {`row-check-item-${row.id}`}
                        name = {`check-action-item-${row.id}`}
                        onChange = {() => selectRows(row.id)}
                    />

                    <DataSetListCells
                        metadata = {metadata}
                        rowData = {row}
                    />

                    <DataListAction
                        aria-labelledby = {`row-action-item-${row.id}`}
                        id = {`row-action-item-${row.id}`}
                        aria-label = "Row Actions"
                    >
                        <EllipsisVIcon aria-hidden="true" />
                    </DataListAction>
                </DataListItemRow>
            </DataListItem>
        );

    });


    return (
        <Component {...componentProps}>
            <DataList
                aria-label="Dataset"
            >

                {dataListRows}

            </DataList>
        </Component>
    );
};

/** Create Dataset List rows from metadata
 * 
 * @summary Used by {@link DataSetList} to create the cells for the DataSet.
 * 
 * @param param Component props
 * @param param.rowData An individual rows data as presented by the API.
 * @param param.metadata Objects metadata as presented by the API.
 * 
 * @category Component
 * @since 0.8.0
 */
export const DataSetListCells = ({
    rowData,
    metadata,
}: {
    rowData: APIDataObject,
    metadata: APIMetadata,
}): React.JSX.Element => {

    /**
     * by cells then by lines
     */
    const rowLayout = [
        [
            "name",
            "organization",
            "modified"
        ],
        [
            "status_icon"
        ]
    ]

    let cells = rowLayout

    if( Array.isArray(metadata.table_fields?.columns?.[0]) ) {

        cells = metadata.table_fields.columns;
    }


    return (
        <DataListItemCells
            dataListCells = {
                cells.map((cell, cellIndex) => {

                    return(
                        <DataListCell
                            key = {`row-${rowData.id}-cell-${cellIndex}`}
                        >
                            <Flex direction = {{ default: 'column' }}>

                                {cell.map((field, fieldIndex) => {

                                    return (
                                        <FlexItem
                                            key = {`row-${rowData.id}-cell-${cellIndex}-field-${fieldIndex}`}
                                        >
                                            <Content component="p">
                                                {(
                                                    (cellIndex !== 0 && fieldIndex !== 0)
                                                    || (cellIndex === 0 && fieldIndex > 0)
                                                ) &&

                                                    <b>{metadata.fields[field].label}: </b>

                                                }
                                                <FieldData
                                                    autolink = {field === 'name' ? true : false}
                                                    data = {rowData}
                                                    field_name = {field}
                                                    metadata = {metadata}
                                                />
                                                {cellIndex === 0 && fieldIndex === 0 && <span><br /><br /></span>}
                                            </Content>
                                        </FlexItem>
                                    );
                                })}
                            </Flex>
                        </DataListCell>
                    );
                })
            }
        />
    );
}
