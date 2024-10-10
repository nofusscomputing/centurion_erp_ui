import { useParams } from "react-router-dom"

import Table from "../components/Table"



const History = ({
    setContentHeading,
    SetContentHeaderIcon = null
}) => {

    const params = useParams();
    SetContentHeaderIcon('')

    return (
        <section>
            <div className="content">
                <Table
                    callback={setContentHeading}
                    data_url_path={'core/' + params.model + '/' + params.pk + '/history'}
                />
            </div>
        </section>
    );
}

export default History;
