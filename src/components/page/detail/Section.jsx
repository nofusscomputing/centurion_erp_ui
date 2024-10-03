import DoubleColumn from "./DoubleColumn";
import SingleColumn from "./SingleColumn";
import Table from "../../Table"
import { Link, useParams } from "react-router-dom";


const Section = ({
    layout,
    data,
    metadata,
    tab,
    index = null,
}) => {
    
    let column

    if( layout.layout === 'double' ) {

        column = (
            <DoubleColumn
                data={data}
                metadata={metadata}
                left={layout.left}
                right={layout.right}
            />
        )

    } else if( layout.layout === 'single' ) {

        column = (
            <SingleColumn
                data={data}
                metadata={metadata}
                fields={layout.fields}
            />
        )

    } else if( layout.layout === 'table' ) {

        column = (
            <Table
                data_url_path={String(data._urls[layout.field]).split('api/v2')[1]}
            />
        )

    }


    return (
        <div>
            <div className="content">
                <div className="section">
                    <h3>{'name' in layout ? layout.name : index === 0 ? tab.name : ''}</h3>
                    {column}
                    {(index === 0 && String(tab.name).toLowerCase() == 'details') && <Link to="edit"><button className="common-field form">Edit</button></Link>}
                </div>
            </div>
        </div>
    );
}

export default Section;
