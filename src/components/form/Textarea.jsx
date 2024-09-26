const TextArea = ({
    label,
    helptext=null,
    required=false,
    error_text=null
}) => {

    return (
        <fieldset>
            <label className="name">{label}</label>
            <span className="help-text">{helptext}</span>
            <textarea required={required} className="common-field"></textarea>
            <span className="error-text">{error_text}</span>
        </fieldset>
     );
}
 
export default TextArea;
