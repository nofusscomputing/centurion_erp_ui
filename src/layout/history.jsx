import { useParams } from "react-router-dom"

import Table from "../components/Table"
import urlBuilder from "../hooks/urlBuilder";



const History = ({
    setContentHeading,
    SetContentHeaderIcon = null
}) => {

    const params = useParams();
    SetContentHeaderIcon('')

    const url_builder = urlBuilder(
        params
    )

    return (
        <section>
            <div className="content">
                <Table
                    callback={setContentHeading}
                    data_url_path={'core/' + url_builder.params.model + '/' + url_builder.params.pk + '/history'}
                />
            </div>
        </section>
    );
}

export default History;
