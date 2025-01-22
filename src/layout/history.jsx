import { useParams } from "react-router"

import Table from "../components/Table"
import urlBuilder from "../hooks/urlBuilder";
import { useState } from "react";
import ContentHeader from "../components/page/ContentHeader";



const History = () => {

    const [ content_heading, setContentHeading ] = useState(null)
    const [ content_header_icon, SetContentHeaderIcon ] = useState(null)

    const params = useParams();
    SetContentHeaderIcon('')

    const url_builder = urlBuilder(
        params
    )

    return (
        <>
        <ContentHeader
            content_heading={content_heading}
            content_header_icon={content_header_icon}
        />
        <section>
            <div className="content">
                <Table
                    callback={setContentHeading}
                    data_url_path={'core/' + url_builder.params.model + '/' + url_builder.params.pk + '/history'}
                />
            </div>
        </section>
        </>
    );
}

export default History;
