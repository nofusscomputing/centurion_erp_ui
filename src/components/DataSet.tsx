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
 * Props for DataSetFooter component.
 *
 * @typeParam T - React element type used for the container component.
 * 
 * @category Type
 * @expand
 * @since 0.9.0
 */
export type DataSetFooterProps<T extends React.ElementType = React.ElementType> = {

    /**
     * Container component used to wrap the footer UI.
     */
    component?: T

    /**
     * Props forwarded to the container component.
     */
    componentProps?: React.ComponentPropsWithoutRef<T>

    /**
     * Total number of items in the dataset.
     */
    itemCount: number

    /**
     * Current page index (1-based).
     */
    pageNumber?: number

    /**
     * Number of items displayed per page.
     */
    perPage?: number

    /**
     * Callback to update the current page number.
     */
    setPageNumber: (pageNumber: number) => void

    /**
     * Callback to update items per page.
     */
    setPerPage: (total: number) => void
}


/** 
 * Footer for DataSet Component
 * 
 * @summary Contains the pagination for the Dataset component.
 * 
 * @typeParam T - React element type used for the container component.
 * 
 * @category Component
 * @expand
 * @since 0.9.0
 * 
 */
export const DataSetFooter = <
    T extends React.ElementType = React.ElementType
>({
    component,
    componentProps,
    itemCount,
    pageNumber = 1,
    perPage = 10,
    setPageNumber,
    setPerPage
}: DataSetFooterProps<T>): React.JSX.Element => {

    const Component = component ?? Fragment

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
 * Props for DataSetFooter component.
 *
 * @typeParam T - React element type used for the container component.
 * 
 * @category Type
 * @expand
 * @since 0.9.0
 */
export type DataSetHeaderProps<T extends React.ElementType = React.ElementType> = {

    /**
     * Additional content to render.
     */
    children?: React.ReactNode
   
    /**
     * Container component used to wrap the footer UI.
     */
    component?: T

    /**
     * Props forwarded to the container component.
     */
    componentProps?: React.ComponentPropsWithoutRef<T>

    /**
     * Total count of items in the dataset.
     */
    itemCount: number

    /**
     * Objects metadata as presented by the API.
     */
    metadata:APIMetadata

    /**
     * Number of items to display per page.
     */
    perPage: number

    /**
     * Row IDs of selected rows from the dataset.
     */
    selectedRows: number[]

    /**
     * Callback to update page number.
     * 
     * @param rows - Rows to select.
     */
    selectRows: (rows: "all" | number | number[]) => void
};



/** 
 * Header for DataSet Component
 * 
 * @summary search, filtering, view Change for the DataSet Components.
 * 
 * @category Component
 * @since 0.9.0
 * 
 */
export const DataSetHeader = <
    T extends React.ElementType = React.ElementType
>({
    children,
    component,
    componentProps,
    itemCount,
    metadata,
    perPage,
    selectedRows,
    selectRows,
}: DataSetHeaderProps<T>): React.JSX.Element => {

    const Component = component ?? Fragment

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
            <Toolbar
                id = "dataset-header-toolbar"
            >
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
};



/**
 * Props for DataSetFooter component.
 *
 * @typeParam T - React element type used for the container component.
 * 
 * @category Type
 * @expand
 * @since 0.9.0
 */
export type DataSetCardProps<T extends React.ElementType = React.ElementType> = {

    /**
     * Container component used to wrap the footer UI.
     */
    component?: T

    /**
     * Props forwarded to the container component.
     */
    componentProps?: React.ComponentPropsWithoutRef<T>

}




/**
 * View Dataset in cards layout
 * 
 * @summary Display the DataSet in card layout
 * 
 * @category Component
 * @since 0.9.0
 * 
 */
export const DataSetCard = <
    T extends React.ElementType = React.ElementType
>({
    component,
    componentProps
}: DataSetCardProps<T>): React.JSX.Element => {

    const Component = component ?? Fragment

    return (
        <Component {...componentProps}></Component>
    );
}



/**
 * Props for DataSetList component.
 *
 * @typeParam T - React element type used for the container component.
 * 
 * @category Type
 * @expand
 * @since 0.9.0
 */
export type DataSetListProps<T extends React.ElementType = React.ElementType> = {

    /**
     * Container component used to wrap the footer UI.
     */
    component?: T

    /**
     * Props forwarded to the container component.
     */
    componentProps?: React.ComponentPropsWithoutRef<T>

    /**
     * Objects metadata as presented by the API.
     */
    metadata: APIMetadata

    /**
     * Data to populate the rows.
     */
    rowData: APIDataset

    /**
     * Row IDs of selected rows from the dataset.
     */
    selectedRows: number[]

    /**
     * Callback to update page number.
     * 
     * @param rows - Rows to select.
     */
    selectRows: (rows: "all" | number | number[]) => void
}



/** 
 * View Dataset in list layout
 * 
 * @summary Display the DataSet in List layout.
 * 
 * @category Component
 * @since 0.9.0
 * 
 */
export const DataSetList = <
    T extends React.ElementType = React.ElementType
>({
    component,
    componentProps,
    metadata,
    rowData,
    selectedRows,
    selectRows,
}: DataSetListProps<T>): React.JSX.Element => {

    const Component = component ?? Fragment

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
                id = "dataset-list"
                aria-label="Dataset"
            >

                {dataListRows}

            </DataList>
        </Component>
    );
};



/**
 * Props for DataSetList component.
 *
 * @typeParam T - React element type used for the container component.
 * 
 * @category Type
 * @expand
 * @since 0.9.0
 */
export type DataSetListCellsProps = {

    /**
     * An individual rows data as presented by the API.
     */
    rowData: APIDataObject,

    /**
     * Objects metadata as presented by the API.
     */
    metadata: APIMetadata,
}



/** Create Dataset List rows from metadata
 * 
 * @summary Used by {@link DataSetList} to create the cells for the DataSet.
 * 
 * @category Component
 * @since 0.9.0
 */
export const DataSetListCells = ({
    rowData,
    metadata,
}: DataSetListCellsProps): React.JSX.Element => {

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

    if( Array.isArray(metadata.layout?.cells?.[0]) ) {

        cells = metadata.layout.cells;
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

                                {cell.filter(field => field in metadata.fields).map((field, fieldIndex) => {

                                    return (
                                        <FlexItem
                                            key = {`row-${rowData.id}-cell-${cellIndex}-field-${fieldIndex}`}
                                        >
                                            <Content component="p">
                                                {(
                                                    (
                                                        (cellIndex == 0 && fieldIndex > 0)
                                                        || (cellIndex > 0 && fieldIndex >= 0)
                                                    )
                                                    && "label" in metadata.fields[field]
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
