import { useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";

import { apiFetch } from "../hooks/apiFetch";
import FieldData from "../functions/FieldData";



const Table = ({
    data_url_path,
    callback = null
}) => {

    const [metadata, setMetaData] = useState(null)

    const [is_loaded, setLoaded] = useState(false)

    const [page, setPage] = useState(0)

    const [table_data, setTableData] = useState(null)

    useEffect(() => {

        apiFetch(
            data_url_path,
            (data) =>{

                setMetaData(data)

                if( callback ) {

                    callback(data.name)

                }

            },
            'OPTIONS' )

    }, [])


    useEffect(() =>{

        setLoaded(false)

        let url = null

        if( page != 0 ) {

            url = data_url_path + '?page%5Bnumber%5D=' + String( page );

        }else{

            url = data_url_path;

        }

        apiFetch(url, (data) => {

            setTableData(data)
            
            setLoaded(true)
        })

    }, [
        page,
    ])

    return (
        (is_loaded &&
        <div>
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
                        Page {table_data.meta.pagination.page} of {table_data.meta.pagination.pages}
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

    const qs = String(link).split('?')

    for(let i=0; i<qs.length; i++ ) {

        let param = String(qs[i]).split('=')

        if( String(param[0]) === 'page%5Bnumber%5D' ) {

            return Number(param[1])

        }
    }

    return 0
}