
const Select = ({
    label,
    helptext=null,
    required=false,
    error_text=null,
    values
}) => {

    return (
        <fieldset>
            <label className="name">{label}</label>
            <select required={required} className="common-field">
                <option value="">Please select an option</option>
                {values.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            <span className="help-text">{helptext}</span>
            <span className="error-text">{error_text}</span>
        </fieldset>
    );
}
 
export default Select;
