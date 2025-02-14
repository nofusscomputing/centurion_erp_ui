import React from "react";

const TextField = ({
    error_text = null,
    fieldset = true,
    helptext = null,
    id = null,
    label = null,
    required = false,
    type = 'text',
    value = null,
    onChange = null,
    onKeyUp = null,
    disabled = false
}) => {

    if( value === null ) {
        value = ''
    }

    let field = (
        <input
            className="common-field"
            id={id}
            key={id}
            name={id}
            disabled = {disabled}
            onChange={onChange}
            onKeyUp={onKeyUp}
            placeholder={helptext}
            required={required}
            type={type}
            value={value ? value : ""}
        />
    )


    if( type === 'datetime-local') {

        if(
            String(value).includes('+')
            ||
            String(value).includes('-')
        ) {

            value = String(value).replace(/[+|-]\d{2}\:\d{2}$/, '')

        } else if( String(value).endsWith('Z') ) {

            value = String(value).replace('Z', '')

        }

        field = (
            <input
                className="common-field"
                format="%Y-%m-%dT%H:%M"
                id={id}
                key={id}
                name={id}
                disabled = {disabled}
                onChange={onChange}
                onKeyUp={onKeyUp}
                // placeholder={helptext}
                required={required}
                type={type}
                value={value}
            />
        )

    }

    if( fieldset == true ) {

        return (
            <fieldset>
                <label className="name" for={id}>{label}</label>
                {field}
                <span className="error-text">{error_text}</span>
            </fieldset>

        );

    } else {

        return ( field )
    }

}

export default TextField;
