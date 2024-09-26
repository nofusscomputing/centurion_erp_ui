import FieldData from "../functions/FieldData";



const Badge = (params) => {

    let message = params.message ? params.message : '-'

    if( params.children.type.name == "TicketStatusIcon" ) {

        message = FieldData({
            metadata: params.children.props.metadata,
            field_name:'status',
            data: params.children.props.page_data
        })

    }

    return (
        <span className="badge">
        <span className="badge-icon">
            { params.children }
        </span>
        <span className="badge-text">{message}</span>
     </span>
    );
}

export default Badge
