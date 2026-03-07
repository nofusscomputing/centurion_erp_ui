import {
    useEffect,
    useState
} from "react";

import { Link } from "react-router";

import {
    Pagination,
    PaginationVariant,
    Toolbar,
    ToolbarContent,
    ToolbarItem
} from "@patternfly/react-core";

import { Table, Tbody, Td, Th, Thead, Tr } from "@patternfly/react-table";

import { apiFetch } from "../hooks/apiFetch";
import FieldData from "../functions/FieldData";
import IconLoader from "./IconLoader";
import Button from "./form/Button";



/**
 * Create a Table with pagination
 * 
 * if a table field is not a string but an array of strings, they will be rendered
 * as a collapsible row directly underneath each row.
 * 
 * @param {{String, Function}} param0 Object for table
 * @param data_url_path url where the data will be fetched
 * @param callback function that will be passed value `data.name`
 * @param add_button_filter List of kecys to filter the dynamic add button
 * @returns 
 */
const DisplayTable = ({
    data_url_path,
    callback = null,
    SetContentHeaderIcon = null,
    loader_metadata = null,
    loader_data = null,
    add_button_filter = []
}) => {

    const API_SPLIT = String('api/v2')

    const [loaded, setPageLoaded] = useState(loader_data ?  true : false)

    const [metadata, setMetaData] = useState(null);

    const [pageNumber, setPageNumber] = useState(1);

    const [perPageNumber, setPerPage] = useState(10);


    const [table_data, setTableData] = useState(null);

    let collapsable_fields = []

    let table_columns_count = 0;

    if( ! String(data_url_path).startsWith('/') ) {
        data_url_path = '/' + data_url_path
    }


    useEffect(() => {

        setMetaData(loader_metadata)
        setTableData(loader_data)

        if( SetContentHeaderIcon ) {

            SetContentHeaderIcon(
                <>
                    {loader_metadata['documentation'] &&
                        <Link to={loader_metadata['documentation']} target="_new">
                            <IconLoader
                                name='help'
                            />
                        </Link>
                    }
                </>
            )
        }

        if( callback ) {

            if( loader_metadata ) {

                callback(loader_metadata.name)

            }
        }


    }, [
        loader_data
    ])


    useEffect(() =>{    // Fetch the table data if the page number has changed.

        let url = null

        if( pageNumber !== 1) {

            url = data_url_path + '?page%5Bnumber%5D=' + String( pageNumber );

        }else{

            url = data_url_path;

        }

        if( loaded === false || table_data?.meta.page !== pageNumber ) {
            apiFetch( url )
                .then((result) => {

                    if( result.status == 200 ) {

                        if( result.api_metadata !== null ) {

                            setMetaData(result.api_metadata)
        
                        }
        
                        setTableData(result.api_page_data)

                        if( Array(result.api_metadata.table_fields).length < 2 ) {

                            console.error("Missing Table Fields")

                        }

                        if( SetContentHeaderIcon ) {

                            SetContentHeaderIcon(
                                <>
                                    {result.api_metadata['documentation'] &&
                                        <Link to={result.api_metadata['documentation']} target="_new">
                                            <IconLoader
                                                name='help'
                                            />
                                        </Link>
                                    }
                                </>
                            )
                        }

                        if( callback ) {

                            callback(result.api_metadata.name)

                        }

                        setPageLoaded(true)
                    }
                }
            )
        }
    }, [
        pageNumber,
    ]);


    const AddButton = () => {

        if(
            metadata?.urls?.sub_models != null
            && add_button_filter.length > 0
        ) {

            return Object.keys(metadata.urls.sub_models).map((model_name) => {

                if( add_button_filter.includes(model_name) ) {            
                    return (
                        <Link to={String(metadata.urls.sub_models[model_name]).split(API_SPLIT)[1] + "/add"}>
                            <button className="common-field form">Add {model_name}</button>
                        </Link>
                    )
                }else{
                    return
                }
            })

        } else {

            return (
                <Link to={String(metadata.urls.self).split(API_SPLIT)[1] + "/add"}>
                    <button className="common-field form">Add</button>
                </Link>
            )
        }
    }



    const PaginationBottom = () => {

        const onSetPage = (_event, newPage) => {
            setPageNumber(newPage)
        };

        const onPerPageSelect = (_event, newPerPage, newPage) => {
            setPerPage(newPerPage)
        };

        return (
            <Pagination
                itemCount={table_data.meta.pagination.count}
                widgetId="bottom-pagination"
                perPage={perPageNumber}
                perPageOptions={[
                    { title: '10', value: 10 },
                    // { title: '20', value: 20 },
                    // { title: '50', value: 50 },
                    // { title: '100', value: 100 }
                ]}
                page={pageNumber}
                variant={PaginationVariant.bottom}
                onSetPage={onSetPage}
                onPerPageSelect={onPerPageSelect} />
        );
    };



    const toolbar = (
        <Toolbar id="search-input-filter-toolbar">
            <ToolbarContent>
                <ToolbarItem>
                    { metadata && metadata.allowed_methods.includes('POST') && <AddButton /> }
                </ToolbarItem>
            </ToolbarContent>
        </Toolbar>
    );


    return (
        <>
        { loaded && (metadata && table_data) &&
            <div>
                
                {toolbar}
                    <Table>
                        <Thead>
                            <Tr>
                            {metadata.table_fields.map((key, index) => {

                                collapsable_fields = []

                                if( table_columns_count === 0 ) {

                                    for( let field of metadata.table_fields ) {

                                        if(
                                            typeof(field) === 'string'
                                            || typeof(field) === 'object'
                                        ) {

                                            table_columns_count += 1

                                        }
                                    }
                                }

                                if(
                                    key in metadata.fields
                                    || String(key).startsWith('-action_')
                                ) {

                                    if( typeof(key) === 'string' ) {


                                        if (key === 'nbsp') {

                                            return (
                                                <Th>&nbsp;</Th>
                                            )

                                        } else if ( key === '-action_delete-' ) {

                                            return (
                                                <Th key={key}>&nbsp;</Th>
                                            )

                                        } else {

                                            return (
                                                <Th key={key}>{metadata.fields[key].label}</Th>  
                                            )
                                        }
                                    }

                                } else if( typeof(key) === 'object' ) {

                                    if(
                                        typeof(key) === 'object'
                                        && key.field
                                    ) {

                                        return (
                                            <Th key={key}>{metadata.fields[key.field].label}</Th>
                                        )

                                    } else {

                                        for( let sub_key of key ) {

                                            collapsable_fields.push(sub_key)

                                        }

                                        console.log(`collapsable fields ${JSON.stringify(key)}`)

                                    }

                                }

                            })}
                            { table_columns_count > 0 &&
                                <Td>&nbsp;</Td>
                            }
                            </Tr>
                        </Thead>
                        <Tbody>

                            {table_data && table_data.results.map((data) => {

                            return (
                                <>
                                    <Tr key={data.id}>
                                        {
                                            metadata.table_fields.map(key => {

                                                if (
                                                    key in metadata.fields
                                                    || String(key).startsWith('-action_')
                                                    || String(key?.type) === 'link'
                                                ) {

                                                    if( typeof(key) === 'string' ) {

                                                        if (key === 'nbsp') {

                                                            return (
                                                                <Td>&nbsp;</Td>
                                                            )

                                                        } else if (key === '-action_delete-') {

                                                            return (
                                                                <Td>
                                                                    <Link to={String(data._urls._self).split('api/v2')[1] + '/delete'}>
                                                                        <Button
                                                                            id = {data.id}
                                                                            button_text = 'Delete'
                                                                            type="button"
                                                                        />
                                                                    </Link>
                                                                </Td>
                                                            )

                                                        }else {

                                                            let autolink = false

                                                            if(
                                                                key == 'name'
                                                                || key == 'title'
                                                                || Boolean(metadata.fields[key].autolink)
                                                            ) {
                                                                autolink = true
                                                            }

                                                            return (
                                                                <Td>
                                                                    <FieldData
                                                                        metadata={metadata}
                                                                        field_name={key}
                                                                        data={data}
                                                                        autolink = {autolink}
                                                                    />
                                                                </Td>
                                                            )

                                                        }
                                                    } else if( typeof(key) === 'object' ) {

                                                        if( String(key.type) === 'link' ) {

                                                            return (
                                                                <Td>
                                                                    <FieldData
                                                                        metadata={metadata}
                                                                        field_name={key}
                                                                        data={data}
                                                                        autolink = {true}
                                                                    />
                                                                </Td>
                                                            )
    
                                                        }

                                                    }
                                                }

                                            })
                                        }
                                        { collapsable_fields.length > 0 &&
                                            <Td
                                                onClick={(e) => {
                                                    let a = e
                                                    document.getElementById('expandable-' + data.id).classList.toggle("hide-expandable-row")
                                                }}
                                            >
                                                <IconLoader
                                                    name='navdown'
                                                    fill='#ccc'
                                                />
                                            </Td>
                                        }

                                    </Tr>
                                    {collapsable_fields.length > 0 &&
                                        <Tr
                                            key={data.id + 'collapsible'}
                                            className='collapsible-row' 
                                        >
                                            <Td colspan={(metadata.table_fields.length)}>
                                                <div
                                                    className="hide-expandable-row"
                                                    id={'expandable-' + data.id} 
                                                    key={'expandable-' + data.id}
                                                >
                                                {collapsable_fields.map((collapsable_field,) => {
                                                    return (
                                                        <div className="dual-column"
                                                        >
                                                            <span style={{
                                                                display: 'block',
                                                                fontWeight: 'bold',
                                                                textAlign: 'center',
                                                                width: '100%'
                                                            }}>{collapsable_field}</span>
                                                            <FieldData
                                                                metadata={metadata}
                                                                field_name={collapsable_field}
                                                                data={data}
                                                            />
                                                        </div>
                                                    )
                                                })}
                                                </div>
                                            </Td>
                                        </Tr>
                                    }
                                </>
                            );
                        })}
                        </Tbody>
                    </Table>
                {table_data && <PaginationBottom />}
            </div>
        }
        </>
    );
}
 
export default DisplayTable;


function getPageNumber(link) {

    if( ! link ) {
        return 0
    }

    const qs = String(link).split('?');

    for(let i=0; i<qs.length; i++ ) {

        let param = String(qs[i]).split('=');

        if( String(param[0]) === 'page%5Bnumber%5D' ) {

            return Number(param[1]);

        }
    }

    return 0
}