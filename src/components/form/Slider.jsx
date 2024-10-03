const Slider = ({
    id,
    label,
    helptext=null,
    required=false,
    error_text=null,
    value=false,
    onChange = null
}) => {

    return (
    <fieldset>
        <label className="name">{label}</label>
        <label className="switch" required={required}>
            <input id={id} type="checkbox" required={required} checked={value} onChange={onChange} />
            <span className="slider round"></span>
        </label>
        <span className="help-text">{helptext}</span>
        <span className="error-text">{error_text}</span>
    </fieldset>);
}
 
export default Slider;
