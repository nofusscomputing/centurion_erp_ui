import {
    useEffect,
    useState,
} from "react";

import {
    Link,
    useLoaderData,
    useOutletContext,
} from "react-router"

import {
    PageSection
} from "@patternfly/react-core";

import {
    DataSetFooter,
    DataSetHeader,
    DataSetList
} from "../components/DataSet";
import IconLoader from "../components/IconLoader";



/**
 * List layout
 * 
 * This component is intended to display a dataset. That is many rows of data
 * that is of the same type.
 * 
 * @summary List Page Layout
 * 
 * @category Layout
 * @since 0.1.0
 */
const List = (): React.JSX.Element => {

    
    const {
        // @ts-ignore TS2339
        setPageDescription, setPageHeading, setPageHeaderIcons
    } = useOutletContext()

    const {metadata, page_data} = useLoaderData();

    const [pageNumber, setPageNumber] = useState(1);

    const [perPage, setPerPage] = useState(10);

    const [ selectedRows, setSelectedRows ] = useState([]);


    
    /** Update the Selected DataList rows
     * 
     * `rowIds` can be any of the following:
     * 
     * - `all` - Will Select all rows
     * 
     * - a single number - if the number exists in the data, will be removed. otherwise it's added.
     * 
     * - An array of numbers - Will replace the current values.
     * 
     * @param {"all" | number | number[]} rowIds Row IDs for all of the select rows 
     */
    const selectRows = ( rowIds ) => {

        if( rowIds === "all" ) {

            setSelectedRows( page_data.results.map(item => item.id) );

        } else if( typeof(rowIds) === "number") {

            setSelectedRows(
                selectedRows.includes(rowIds)
                ? selectedRows.filter(v => v !== rowIds)
                : [...selectedRows, rowIds]
            );

        } else {

            setSelectedRows( rowIds );

        }

    }


    useEffect(() => {

        setPageHeading(metadata?.name)
        setPageDescription(metadata?.description)


        setPageHeaderIcons(
            <>
                {metadata?.['documentation'] &&
                    <Link to={metadata['documentation']} target="_new">
                        <IconLoader
                            name='help'
                            size="xl"
                            inline={false}
                        />
                    </Link>
                }
            </>
        );

        setPageNumber(1);

        setPerPage(10);

        setSelectedRows([]);


    }, [ metadata ])


    return (
        metadata && page_data &&
        <>
            <DataSetHeader
                component = {PageSection}
                itemCount = {page_data.meta.pagination.count}
                metadata = {metadata}
                perPage = {perPage}
                selectedRows = {selectedRows}
                selectRows = {selectRows}
            />
            <DataSetList
                component = {PageSection}
                componentProps = {{
                    isFilled: true
                }}
                rowData = {page_data}
                metadata = {metadata}
                selectedRows = {selectedRows}
                selectRows = {selectRows}
            />

            <DataSetFooter
                component = {PageSection}
                componentProps={{
                    stickyOnBreakpoint: { default: "bottom" }
                }}
                itemCount = {page_data.meta.pagination.count}
                pageNumber = {pageNumber}
                perPage = {perPage}
                setPageNumber = {setPageNumber}
                setPerPage = {setPerPage}
            />
        </>
    );
}

export default List;
