import FieldData from "../functions/FieldData";



const Badge = (params) => {

    let message = params.message ? params.message : '-'

    if( 'children' in params ) {

        if( params.children.type?.name == "TicketStatusIcon" ) {

            message = FieldData({
                metadata: params.children.props.metadata,
                field_name:'status',
                data: params.children.props.page_data
            })

        }

    }

    let style = {
        backgroundColor: 'var(--background-colour-active)'
    }
    if( params.background ) {

        style = {
            backgroundColor: params.background
        }
    }

    let icon_style = 'badge-icon'
    if( params.icon_style ) {
        icon_style = icon_style + ' ' + params.icon_style
    }

    let text_style = 'badge-text'
    if( params.text_style ) {
        text_style = text_style + ' ' + params.text_style
    }

    return (
        <span
            className="badge"
            style={style}
        >
        <span className={icon_style}>
            { params.children }
        </span>
        <span className={text_style}>{message}</span>
     </span>
    );
}

export default Badge
