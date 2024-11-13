const TextArea = ({
    id,
    label,
    helptext=null,
    required=false,
    error_text=null,
    value= '',
    onChange = null,
    class_name = null
}) => {

    if( value === null ) {
        value = ''
    }

    return (
        <fieldset className={class_name}>
            <label className="name" for={id}>{label}</label>
            <span className="help-text">{helptext}</span>
            <textarea
                id={id}
                required={required}
                className="common-field"
                onChange={onChange}
                onKeyUp={(e) =>{

                    const currentScrollY = window.scrollY

                    e.target.style.height = "1px";
                    e.target.style.height = ( 25 + e.target.scrollHeight ) + "px";

                    window.scrollTo(0, currentScrollY);    // Prevent window scrolling to y=0

                }}
                onClick={(e) =>{

                    e.target.style.height = "1px";
                    e.target.style.height = ( 25 + e.target.scrollHeight ) + "px";

                }}
    
            >{value}</textarea>
            <span className="error-text">{error_text}</span>
        </fieldset>
     );
}
 
export default TextArea;
