const TextArea = ({
    id,
    label,
    helptext=null,
    required=false,
    error_text=null,
    value= '',
    onChange = null
}) => {

    if( value === null ) {
        value = ''
    }

    return (
        <fieldset>
            <label className="name">{label}</label>
            <span className="help-text">{helptext}</span>
            <textarea
                id={id}
                required={required}
                className="common-field"
                onChange={onChange}
    
            >{value}</textarea>
            <span className="error-text">{error_text}</span>
        </fieldset>
     );
}
 
export default TextArea;
