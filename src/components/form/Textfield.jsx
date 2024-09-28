import React from "react";

const TextField = ({
    error_text = null,
    fieldset = true,
    helptext = null,
    id = null,
    label = null,
    onchange = null,
    required = false,
    value = null
}) => {

    let field = (
        <input
            className="common-field"
            id={id}
            onChange={e => {
                onchange(e.target.value)
            } }
            placeholder={helptext}
            required={required}
            type="text"
            value={value == null ? '' : value}
        />
    )

    if( fieldset == true ) {
        return (
            <fieldset>
                <label className="name">{label}</label>
                {field}
                <span className="error-text">{error_text}</span>
            </fieldset>

        );

    } else {

        return ( field )
    }

}

export default TextField;
