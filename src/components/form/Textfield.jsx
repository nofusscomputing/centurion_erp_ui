
const TextField = ({
    label,
    helptext=null,
    required=false,
    error_text=null,
    value=null
}) => {

    return (
        <fieldset>
            <label className="name">{label}</label>
            <input className="common-field" required={required} type="text" placeholder={helptext} value={value == null ? '' : value} />
            <span className="error-text">{error_text}</span>
        </fieldset>
     );

}

export default TextField;
