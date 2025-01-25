import IconLoader from "../IconLoader"


/** Form Button
 * 
 * ## Submit button
 * 
 * set `type=submit`
 * 
 * ## Menu
 * 
 * set `menu_entries=Array({display_name: String, value: String})` and `MenuClickCallback=Function`
 * on click of any menu entry callback `MenuClickCallback` will run passing the menu entry value to 
 * the callback.
 * 
 * @param {String} button_align Alignment of the div the button is contained within.
 * @param {String} button_text Text to show on the button
 * @param {String} id id for the button
 * @param {String} type The type of button, choices are "button|submit|reset"
 * @param {Array} menu_entries Array of dict {display_name, value}
 * @param {Function} MenuClickCallback function to call on menu entry click
 * @param {Function} onClick Buttons onClick event handler.
 * @returns Button
 */
const Button = ({
    button_align = 'right',
    button_class = '',
    button_text = 'Submit',
    id=null,
    type = 'submit',
    menu_entries = null,
    MenuClickCallback = null,
    onClick = null,
}) => {

    let div_align = 'align-'
    button_class = button_class + ' form common-field'

    if( button_align ) {
        div_align = div_align + button_align
        button_class += ' ' + div_align
    }


    const handleButtonClick = (e) => {

        if( onClick ) {

            if( ! e.target.disabled && onClick) {

                onClick(e)

            }
        }

    }


    const handleMenuClick = (e) => {
        e.currentTarget.parentElement.classList.toggle("show")
        MenuClickCallback(Number(e.target.value))
    }


    if( ! menu_entries ) {
        return (
            <div
                className={div_align}
            >
                <button id={'button-' + String(button_text).toLowerCase()} className={button_class} onClick={handleButtonClick} type={type}>{button_text}</button>
            </div>);
    } else if( menu_entries ) {

        return (
            <div
                className={div_align}
            >

                <div className="submit-dropdown-button">
                    <button id={'button-' + String(button_text).toLowerCase()} className="button submit-button" onClick={handleButtonClick} type={type}>{button_text}</button>
                    <div
                        className="button dropdown-button"
                        onClick={(e) =>

                            e.currentTarget.parentElement.children[2].classList.toggle("show")

                        }
                    >
                        <IconLoader 
                            name='navdown'
                            height="35px"
                            width="35px"
                        />
                    </div>
                    <div id="myDropdown" className="dropdown-content">
                        {menu_entries.map((menu_text) => {

                            if( String(menu_text.display_name).toLowerCase() !== 'action' ) {

                                return (

                                    <button id={'button-dropdown-' + String(button_text).toLowerCase()} key={'button-dropdown-' + String(button_text).toLowerCase() + '-' + menu_text.value} className="dropdown-menu-entry" onClick={handleMenuClick} type="button" value={menu_text.value}>{menu_text.display_name}</button>

                                );
                            } else{

                                return (<></>);

                            }
                        })}

                    </div>
                </div>
            </div>
        );
    }

}
 
export default Button;