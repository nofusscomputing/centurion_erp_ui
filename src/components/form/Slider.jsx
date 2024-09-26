const Slider = ({
    label,
    helptext=null,
    required=false,
    error_text=null,
    value=null
}) => {

    return (
    <fieldset>
        <label className="name">{label}</label>
        <label class="switch" required={required}>
            <input type="checkbox" required={required}/>
            <span class="slider round"></span>
        </label>
        <span className="help-text">{helptext}</span>
        <span className="error-text">{error_text}</span>
    </fieldset>);
}
 
export default Slider;
