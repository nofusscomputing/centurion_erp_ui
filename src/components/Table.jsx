import { useEffect, useId, useState } from "react";

import { apiFetch } from "../hooks/apiFetch";
import FieldData from "../functions/FieldData";
import TextField from "./form/Textfield";
import { Link, useParams } from "react-router-dom";
import IconLoader from "./IconLoader";


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
    SetContentHeaderIcon = null
}) => {

    const [metadata, setMetaData] = useState(null);

    const [is_loaded, setLoaded] = useState(false);

    const [page, setPage] = useState(0);

    const [table_data, setTableData] = useState(null);

    let collapsable_fields = []

    let table_columns_count = 0;

    const pagefieldId = useId();

    const params = useParams();

    if( ! String(data_url_path).startsWith('/') ) {
        data_url_path = '/' + data_url_path
    }


    if( String(window.location.pathname).includes('/ticket/') ) {
        
        data_url_path = '/' + params.module + '/ticket/' + params.model

    }


    useEffect(() => {

        apiFetch(
            data_url_path,
            (data) =>{

                setMetaData(data)


                if( SetContentHeaderIcon ) {

                    SetContentHeaderIcon(
                        <>
                            {data['documentation'] &&
                                <Link to={data['documentation']} target="_new">
                                    <IconLoader
                                        name='help'
                                    />
                                </Link>
                            }
                        </>
                    )
                }

                if( table_data ) {

                    setLoaded(true)
    
                }
    
                if( callback ) {

                    callback(data.name)

                }

            },
            'OPTIONS' )

    }, [
        data_url_path,
        table_data
    ]);


    useEffect(() =>{

        setLoaded(false)

        let url = null

        if( page !== 0 ) {

            url = data_url_path + '?page%5Bnumber%5D=' + String( page );

        }else{

            url = data_url_path;

        }

        apiFetch(url, (data) => {

            setTableData(data)

            if( metadata ) {

                setLoaded(true)

            }
        })

    }, [
        data_url_path,
        page,
    ]);


    const updatePageField = ( value ) => {

        if( value <= 0 ) {

            setPage(1)

        } else if( value <= table_data.meta.pagination.pages ) {

            setPage(value)

        } else if( value > table_data.meta.pagination.pages ) {

            setPage(table_data.meta.pagination.pages)

        }

    };


    return (
        (is_loaded &&
        <div>
            { metadata.allowed_methods.includes('POST') && (<Link to={data_url_path + "/add"}><button className="common-field form">Add</button></Link>)}
            <table>
                <thead>
                    <tr>
                    {metadata.table_fields.map((key, index) => {

                        collapsable_fields = []

                        if( table_columns_count === 0 ) {

                            for( let field of metadata.table_fields ) {

                                if( typeof(field) === 'string' ) {

                                    table_columns_count += 1

                                }
                            }

                        }

                        if( key in metadata.fields ) {

                            if( typeof(key) === 'string' ) {


                                if (metadata.table_fields[key] === 'nbsp') {

                                    return (
                                        <th>&nbsp;</th>
                                    )

                                } else {

                                    return (
                                        <th key={key}>{metadata.fields[key].label}</th>  
                                    )
                                }
                            } 
                        } else if( typeof(key) === 'object' ) {

                            for( let sub_key of key ) {

                                collapsable_fields.push(sub_key)

                            }

                            console.log(`collapsable fields ${JSON.stringify(key)}`)

                        }

                    })}
                    { table_columns_count > 0 &&
                        <td>&nbsp;</td>
                    }
                    </tr>
                </thead>
                <tbody>
                    {table_data.results.map((data) => {

                    return (
                        <>
                            <tr key={data.id}>
                                {
                                    metadata.table_fields.map(key => {

                                        if (key in metadata.fields) {

                                            if( typeof(key) === 'string' ) {

                                                if (metadata.table_fields[key] === 'nbsp') {

                                                    return (
                                                        <td>&nbsp;</td>
                                                    )

                                                } else {

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
                            onchange={updatePageField}
                            required = {true}
                            value={table_data.meta.pagination.page}
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
        </div>
        )
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