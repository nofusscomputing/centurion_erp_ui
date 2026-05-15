import {
    useId
} from "react";

import {
    Link
} from "react-router";

import "../styles/components/badge.css"

import IconLoader from "./IconLoader";



/** Display a Badge
 * 
 * @param {Object} param
 * @param {string} param.background HTML colour for the badge , defaults to pf label gray colour.
 * @param {string} param.classNameSuffix Suffix to append to the CSS class.
 * @param {string} param.icon Name of the icon to use
 * @param {url} param.to HTML colour for the badge.
 * @param {string|null} param.target HTML Link Target _blank or null.
 * 
 * @returns {JSX.Component} Component ready to be placed.
 */
const Badge = ({
    children = null,
    background = null,
    classNameSuffix = null,
    icon = null,
    to = null,
    target = null,
}) => {

    const badgeId = useId()

    let badgeIconStyle = {}, badgeContentStyle = {}


    if( !icon && to ) {
        icon = 'link'
    }


    if( icon && background ) {

            badgeIconStyle["backgroundColor"] = background;
            badgeIconStyle['borderColor'] = background;

            badgeContentStyle['borderColor'] = background;
  
    } else if( ! classNameSuffix ) {

        classNameSuffix = 'default'

    }


    let cssClassName = "centurion-badge", cssIconClassName = "centurion-badge-icon", cssContentClassName = "centurion-badge-content"
    if( classNameSuffix ) {

        cssClassName += ` centurion-badge-style-${classNameSuffix}`

        cssIconClassName += ` centurion-badge-icon-${classNameSuffix}`

        cssContentClassName += ` centurion-badge-content-${classNameSuffix}`
        
    }


    const badgeLayout = (
        <>
            <span className={cssIconClassName} style={badgeIconStyle}>
                { icon && <IconLoader name={icon} fill="var(--background-colour-active)" height='15px' width='15px'/>}
            </span>
            <span className={cssContentClassName} style={badgeContentStyle}>{children}</span>
        </>
    );


    return (
        <span
            className={cssClassName}
            id={badgeId}
        >
            { ! to && badgeLayout}
            { to &&
            <Link to={to} target={target}>
                {badgeLayout}
            </Link>
            }
        </span>
    )

}

export default Badge
