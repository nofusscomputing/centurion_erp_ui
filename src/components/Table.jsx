import { useEffect, useId, useState } from "react";

import { apiFetch } from "../hooks/apiFetch";
import FieldData from "../functions/FieldData";
import TextField from "./form/Textfield";
import { Link, useParams } from "react-router";
import IconLoader from "./IconLoader";
import urlBuilder from "../hooks/urlBuilder";
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
 * @returns 
 */
const Table = ({
    data_url_path,
    callback = null,
    SetContentHeaderIcon = null,
    loader_metadata = null,
    loader_data = null
}) => {

    const API_SPLIT = String('api/v2')

    const [loaded, setPageLoaded] = useState(false)

    const [metadata, setMetaData] = useState(null);

    const [page_number_value, setPageNumberValue] = useState(1);

    const [page, setPage] = useState(0);

    const [table_data, setTableData] = useState(null);

    let collapsable_fields = []

    let table_columns_count = 0;

    const pagefieldId = useId();

    const params = useParams();

    const url_builder = urlBuilder(
        params
    )

    if( ! String(data_url_path).startsWith('/') ) {
        data_url_path = '/' + data_url_path
    }


    if( String(window.location.pathname).includes('/ticket/') ) {
        
        data_url_path = '/' + url_builder.params.module + '/ticket/' + url_builder.params.model

    }

    useEffect(() => {

        setPageLoaded(false)
        setMetaData(loader_metadata)
        setTableData(loader_data)
        setPageNumberValue(1)
        setPage(0)

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

        setPageLoaded(true)

    }, [
        // loader_metadata,
        loader_data
    ])


    useEffect(() =>{

        setPageLoaded(false)

        let url = null

        if( page !== 0 ) {

            url = data_url_path + '?page%5Bnumber%5D=' + String( page );

        }else{

            url = data_url_path;

        }

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

                    if( page !== 0 ) {
                        
                        setPageNumberValue(page)

                    }

                    setPageLoaded(true)

                }

            })

    }, [
        page,
    ]);


    const updatePageField = ( event ) => {

        setPageNumberValue(event.target.value)

    };

    const submitPageField = ( event ) => {

        if( event.key === 'Enter' ) {

                if( page_number_value <= 0 ) {

                    setPage(1)
                    setPageNumberValue(1)

                } else if( page_number_value <= table_data.meta.pagination.pages ) {

                    setPage(page_number_value)

                } else if( page_number_value > table_data.meta.pagination.pages ) {

                    setPage(table_data.meta.pagination.pages)
                    setPageNumberValue(table_data.meta.pagination.pages)

                }

        }

    };


    return (
        <>
        { loaded &&
        <>
        { metadata &&
            <div>
                { metadata.allowed_methods.includes('POST') && (<Link to={String(metadata.urls.self).split(API_SPLIT)[1] + "/add"}><button className="common-field form">Add</button></Link>)}
                    <table>
                        <thead>
                            <tr>
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
                                                <th>&nbsp;</th>
                                            )

                                        } else if ( key === '-action_delete-' ) {

                                            return (
                                                <th key={key}>&nbsp;</th>
                                            )

                                        } else {

                                            return (
                                                <th key={key}>{metadata.fields[key].label}</th>  
                                            )
                                        }
                                    }

                                } else if( typeof(key) === 'object' ) {

                                    if(
                                        typeof(key) === 'object'
                                        && key.field
                                    ) {

                                        return (
                                            <th key={key}>{metadata.fields[key.field].label}</th>
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
                                <td>&nbsp;</td>
                            }
                            </tr>
                        </thead>
                        <tbody>

                            {table_data && table_data.results.map((data) => {

                            return (
                                <>
                                    <tr key={data.id}>
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
                                                                <td>&nbsp;</td>
                                                            )

                                                        } else if (key === '-action_delete-') {

                                                            return (
                                                                <td>
                                                                    <Link to={String(data._urls._self).split('api/v2')[1] + '/delete'}>
                                                                        <Button
                                                                            id = {data.id}
                                                                            button_text = 'Delete'
                                                                            type="button"
                                                                        />
                                                                    </Link>
                                                                </td>
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
                                                                <td>
                                                                    <FieldData
                                                                        metadata={metadata}
                                                                        field_name={key}
                                                                        data={data}
                                                                        autolink = {autolink}
                                                                    />
                                                                </td>
                                                            )

                                                        }
                                                    } else if( typeof(key) === 'object' ) {

                                                        if( String(key.type) === 'link' ) {

                                                            return (
                                                                <td>
                                                                    <FieldData
                                                                        metadata={metadata}
                                                                        field_name={key}
                                                                        data={data}
                                                                        autolink = {true}
                                                                    />
                                                                </td>
                                                            )
    
                                                        }

                                                    }
                                                }

                                            })
                                        }
                                        { collapsable_fields.length > 0 &&
                                            <td
                                                onClick={(e) => {
                                                    let a = e
                                                    document.getElementById('expandable-' + data.id).classList.toggle("hide-expandable-row")
                                                }}
                                            >
                                                <IconLoader
                                                    name='navdown'
                                                    fill='#ccc'
                                                />
                                            </td>
                                        }

                                    </tr>
                                    {collapsable_fields.length > 0 &&
                                        <tr
                                            key={data.id + 'collapsible'}
                                            className='collapsible-row' 
                                        >
                                            <td colspan={(metadata.table_fields.length)}>
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
                                            </td>
                                        </tr>
                                    }
                                </>
                            );
                        })}
                        </tbody>
                    </table>
                {table_data && 
                    <div style={{
                        'display': 'flexbox',
                        'height': '60px',
                        'margin': '0px',
                        'padding': '0px',
                        'textAlign': 'center',
                        'verticalAlign': 'middle'
                    }}>
                        <p className="table-pagination">

                            <span className="table-pagination-button" onClick={() => {

                                const url = table_data.links.prev

                                if( url ) {

                                    setPage(getPageNumber(url))

                                }

                            }}>&lt;&lt;</span>

                            <span className="table-pagination-button" onClick={() => {

                                const url = table_data.links.first

                                if( url ) {

                                    setPage(getPageNumber(url))

                                }

                            }}>First</span>

                            <span className="table-pagination-text">
                                Page
                                <TextField
                                    fieldset = {false}
                                    id={pagefieldId}
                                    onChange={updatePageField}
                                    type = "number"
                                    onKeyUp = {submitPageField}
                                    required = {true}
                                    value={page_number_value}
                                />
                                of {table_data.meta.pagination.pages}
                            </span>

                            <span className="table-pagination-button"onClick={() => {

                                const url = table_data.links.last

                                if( url ) {

                                    setPage(getPageNumber(url))

                                }

                            }}>Last</span>

                            <span className="table-pagination-button" onClick={() => {

                            const url = table_data.links.next

                                if( url ) {

                                    setPage(getPageNumber(url))

                                }

                            }}>&gt;&gt;</span>

                        </p>
                    </div>
                }
            </div>
        }
        </>
        }
        </>
    );
}
 
export default Table;


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