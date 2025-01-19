const TextArea = ({
    id,
    error_text=null,
    fieldset = true,
    value='',
    onChange = null,
    class_name = null,
    field_data = null
}) => {


    let field_class_name = "common-field"
    let helptext = null
    let required = false
    let label = ''

    if( field_data ) {

        field_data = Object(field_data)



        if( 'help_text' in field_data) {

            helptext = field_data['help_text']

        }

        if( 'label' in field_data ) {

            label = field_data['label']

        }

        if( 'required' in field_data) {

            required = field_data['required']

        }

        if( 'style' in field_data ) {

            if( 'class' in field_data.style ) {

                field_class_name += String( ' ' + field_data['style']['class'])

            }
        }
    }

    let field = (
        <>
        <textarea
            id={id}
            required={required}
            className={fieldset ? field_class_name : field_class_name + ' ' + class_name}
            onChange={onChange}
            onKeyUp={(e) =>{

                    const currentScrollY = window.scrollY

                    if( e.code === 'Enter' ) {

                        e.target.style.height = ( 25 + e.target.scrollHeight ) + "px";

                    }

                    window.scrollTo(0, currentScrollY);    // Prevent window scrolling to y=0

                }}
                onClick={(e) =>{


                    if( e.target.scrollHeight > e.target.clientHeight) {

                        e.target.style.height = ( 25 + e.target.scrollHeight ) + "px";

                    }

                }}
    
            >{value}</textarea>
        </>
    )


    if( fieldset ) {

        return (
            <fieldset className={class_name}>
                <label className="name" for={id}>{label}</label>
                <span className="help-text">{helptext}</span>
                {field}
                <span className="error-text">{error_text}</span>
            </fieldset>
        );

    } else {

        return ( 
            <>
            {field}
            </>
        )
    }
}
 
export default TextArea;
