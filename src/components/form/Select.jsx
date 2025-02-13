
const Select = ({
    error_text = null,
    field_data = null,
    field_only = false,
    id,
    onChange = null,
    value = '',
}) => {

    
    if( value === null) {
        value = ''
    }

    if(
        typeof(value) == 'object'
        && ! Array.isArray(value)
    ) {
        value = Number(value.id)
    }

    const field = () => {

        return(
            <select
                id={id}
                name = {id}
                required={field_data.required}
                className="common-field"
                onChange={onChange}
                multiple = {field_data.relationship_type == 'ManyToMany' ? true : false}
                disabled = {field_data.read_only}
            >
                { field_data.relationship_type !== 'ManyToMany' &&
                <option selected value={""}> - Please select an option - </option>}

                {field_data.choices.map((choice) => {

                    let selected = false

                    if( value !== null ) {

                        if( Array.isArray(value) ) {

                            for(let item of value ) {

                                if( typeof(item) == 'object' ) {

                                    if( choice.value === item.id ) {

                                        selected = ( choice.value == item.id )
            
                                    }
    
                                } else {

                                    if( choice.value === Number(item) ) {

                                        selected = ( choice.value == Number(item) )
            
                                    }
        
                                }

                            }

                        } else {

                            if( Number(choice.value) === Number(value) ) {

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
        )
    }


    if( field_only ) {

        return field();

    } else {

        return (
            <fieldset>
                <label className="name" for={id}>{field_data.label}</label>

                {field()}
                
                <span className="help-text">{field_data.help_text}</span>
                <span className="error-text">{error_text}</span>
            </fieldset>
        );
    }
}
 
export default Select;
