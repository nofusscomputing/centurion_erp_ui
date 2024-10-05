import { useEffect, useId, useState } from "react";

import { apiFetch } from "../hooks/apiFetch";
import FieldData from "../functions/FieldData";
import TextField from "./form/Textfield";
import { Link, useParams } from "react-router-dom";


/**
 * Create a Table with pagination
 * 
 * @param {{String, Function}} param0 Object for table
 * @param data_url_path url where the data will be fetched
 * @param callback function that will be passed value `data.name`
 * @returns 
 */
const Table = ({
    data_url_path,
    callback = null
}) => {

    const [metadata, setMetaData] = useState(null);

    const [is_loaded, setLoaded] = useState(false);

    const [page, setPage] = useState(0);

    const [table_data, setTableData] = useState(null);

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
                    {metadata.table_fields.map(key => {

                        if (key in metadata.actions.POST) {

                            if (metadata.table_fields[key] === 'nbsp') {

                                return (
                                    <th>&nbsp</th>
                                )
                            } else {

                                return (
                                    <th key={key}>{metadata.actions.POST[key].label}</th>
                                )
                            }
                        }

                    })}
                    </tr>
                </thead>
                <tbody>
                    {table_data.results.map((data) => {

                    return (
                        <tr id={table_data.id} key={table_data.id}>
                            {
                                metadata.table_fields.map(key => {

                                    if (key in metadata.actions.POST) {

                                        if (metadata.table_fields[key] === 'nbsp') {

                                            return (
                                                <td>&nbsp;</td>
                                            )

                                        } else {

                                            return (
                                                <td>
                                                    <FieldData
                                                        metadata={metadata}
                                                        field_name={key}
                                                        data={data}
                                                    />
                                                </td>
                                            )

                                        }
                                    }

                                })}

                        </tr>
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