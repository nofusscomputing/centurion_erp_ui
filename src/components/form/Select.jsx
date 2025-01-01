
const Select = ({
    id,
    error_text=null,
    value = '',
    onChange = null,
    field_data = null
}) => {

    
    if( value === null) {
        value = ''
    }

    if(
        typeof(value) == 'object'
        && ! Array.isArray(value)
    ) {
        value = value.id
    }

    return (
        <fieldset>
            <label className="name" for={id}>{field_data.label}</label>
            <select
                id={id}
                required={field_data.required}
                className="common-field"
                onChange={onChange}
                multiple = {field_data.relationship_type == 'ManyToMany' ? true : false}
            >
                <option value="">Please select an option</option>
                {field_data.choices.map((choice) => {

                    let selected = false

                    if( value !== null ) {

                        if( Array.isArray(value) ) {

                            for(let item of value ) {

                                if( typeof(item) == 'object' ) {

                                    if( choice.value == item.id ) {

                                        selected = ( choice.value == item.id )
            
                                    }
    
                                } else {

                                    if( choice.value == Number(item) ) {

                                        selected = ( choice.value == Number(item) )
            
                                    }
        
                                }

                            }

                        } else {

                            if( choice.value == value ) {

                                selected = ( choice.value === value )
    
                            }

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
            <span className="help-text">{field_data.help_text}</span>
            <span className="error-text">{error_text}</span>
        </fieldset>
    );
}
 
export default Select;
