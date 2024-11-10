
const Select = ({
    id,
    choices = [],
    label,
    helptext=null,
    required=false,
    error_text=null,
    value = '',
    onChange = null
}) => {

    
    if( value === null ) {
        value = ''
    }

    if( typeof(value) == 'object') {
        value = value.id
    }

    return (
        <fieldset>
            <label className="name" for={id}>{label}</label>
            <select
                id={id}
                required={required}
                className="common-field"
                onChange={onChange}
            >
                <option value="">Please select an option</option>
                {choices.map((choice) => {

                    let selected = false

                    if( value !== null ) {

                        if( choice.value == value ) {

                            selected = ( choice.value === value )

                        }
                    }

                    return (
                        <option
                            selected={selected}
                            key={choice.value}
                            value={choice.value}
                        >{choice.display_name}</option>
                    )

                })}
            </select>
            <span className="help-text">{helptext}</span>
            <span className="error-text">{error_text}</span>
        </fieldset>
    );
}
 
export default Select;
