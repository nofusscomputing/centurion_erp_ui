import DoubleColumn from "./DoubleColumn";
import SingleColumn from "./SingleColumn";



const Section = ({
    layout,
    data,
    metadata,
    tab,
    index = null,
}) => {
    console.log('Section: ' + JSON.stringify(metadata))
    
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

    }


    return (
        <div>
            <div className="content">
                <div className="section">
                    <h3>{'name' in layout ? layout.name : index === 0 ? tab.name : ''}</h3>
                    {column}
                    {index === 0 && <button className="common-field form">Edit</button>}
                </div>
            </div>
        </div>
    );
}

export default Section;
