import React, { useId } from "react";

/**
 * Content Section
 * 
 * This component servess the purpose of being setup for immediate use for any
 * content you wish to display.
 * 
 * @param {String} className the inputes
 * @param {React.JSX.Element} children Elements to be included inside of section
 * @param {React.JSX.Element} titleBar Elements to be included as the heading. normally (h2-6)
 * @param {String} id the id given to the section element
 * @param {Object} style JSX style object
 * @returns {React.JSX.Element} 
 */
const Section = ({
    className,
    children= null,
    titleBar = null,
    id = null,
    style = {}
}) => {

    const sectionId = useId();

    return (
        <section
            className={className}
            id={ id ? id : sectionId}
            style={{
                ...style,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {titleBar}
            <span
                style={{
                    padding: ".5rem"
                }}
            >

                {children}

            </span>

        </section>
    );
}
 
export default Section;
