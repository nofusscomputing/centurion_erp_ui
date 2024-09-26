import DoubleColumn from "./DoubleColumn";



const Section = ({
    data = null,
    metadata,
    left = [],
    name = null,
    right = [],
    index = null,
}) => {
    console.log('Section: ' + JSON.stringify(metadata))
    return (
        <div>
            {(left.length > 0 && right.length > 0) && <div className="content">
                <div className="section">
                    <h3>{name}</h3>
                    <DoubleColumn
                        data={data}
                        metadata={metadata}
                        left={left}
                        right={right}
                    />
                    {index === 0 && <button className="common-field form">Edit</button>}
                </div>
            </div>}
        </div>
    );
}

export default Section;
