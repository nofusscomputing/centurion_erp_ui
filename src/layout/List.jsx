import { useEffect, useState } from "react"
import { Link, useLoaderData, useLocation, useParams } from "react-router-dom"
import FieldData from "../functions/FieldData"



const List = ({ setContentHeading }) => {

    const [metadata, setMetaData] = useState(null)

    let devices = useLoaderData();

    useEffect(() => {

        fetch('http://localhost:8003/api/' + params.module + '/' + params.model + '/option')

            .then(response => {

                if (!response.ok) {

                    throw new Response(response.statusText, { 'status': response.status });

                }
                return response.json()
            })

            .then(data => {

                setMetaData(data)

            })

            .catch(err => {

                throw Error(err)

            });

    }, [devices])


    let params = useParams();

    let location = useLocation();

    return (
        <section>
            {(devices != null && metadata != null) && <div className="content">

                <table>
                    <thead>
                        <tr>

                            {metadata.fields.map(key => {

                                setContentHeading(metadata.name)

                                if (key in metadata.actions.POST) {

                                    if (metadata.fields[key] === 'nbsp') {

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
                        {devices.results.map((device) => {

                            return (
                                <tr id={device.id} key={device.id}>
                                    {
                                        metadata.fields.map(key => {

                                            if (key in metadata.actions.POST) {

                                                if (metadata.fields[key] === 'nbsp') {

                                                    return (
                                                        <td>&nbsp;</td>

                                                    )

                                                } else {

                                                    if (
                                                        key === 'name'
                                                        || key === 'title'
                                                    ) {

                                                        let url = location.pathname + '/' + device['id']

                                                        return (
                                                            <td>
                                                                <Link to={url}>{device[key]}</Link>
                                                            </td>
                                                        )

                                                    } else {

                                                        return (
                                                            <td>
                                                                <FieldData
                                                                    metadata={metadata}
                                                                    field_name={key}
                                                                    data={device}
                                                                />
                                                            </td>
                                                        )

                                                    }
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
                        <a href={devices.links.prev}>&lt;&lt;</a>&nbsp;&nbsp;&nbsp;
                        <a href={devices.links.first}>First </a>
                        Page {devices.meta.pagination.page} of {devices.meta.pagination.pages}
                        <a href={devices.links.last}> Last</a>&nbsp;&nbsp;&nbsp;
                        <a href={devices.links.next}>&gt;&gt;</a> 
                        </p>
                </div>
            </div>}
        </section>
    );
}

export default List;