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

    let data = useLoaderData();

    useEffect(() => {

        apiFetch(
            data_url_path,
            (data) =>{

                setMetaData(data)

                if( callback ) {

                    callback(data.name)

                }
                
                setLoaded(true)

            },
            'OPTIONS' )

    }, [data, data_url_path])

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
                    {data.results.map((data) => {

                    return (
                        <tr id={data.id} key={data.id}>
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
                <p style={{
                    'display': 'inline-block',
                    'padding': '0px',
                }}>
                    <a href={data.links.prev}>&lt;&lt;</a>&nbsp;&nbsp;&nbsp;
                    <a href={data.links.first}>First </a>
                    Page {data.meta.pagination.page} of {data.meta.pagination.pages}
                    <a href={data.links.last}> Last</a>&nbsp;&nbsp;&nbsp;
                    <a href={data.links.next}>&gt;&gt;</a> 
                    </p>
            </div>
        </div>
        )
    );
}
 
export default Table;