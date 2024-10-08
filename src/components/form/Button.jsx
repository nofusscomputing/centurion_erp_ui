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
 * @param {{String, String, String, Array, Function}} param0 dict of values for the button
 *   @param {String} button_text Text to show on the button
 *   @param {String} type The type of button, choices are "button|submit|reset"
 *   @param {String} button_align Alignment of the div the button is contained within.
 *   @param {Array} menu_entries Array of dict {display_name, value}
 *   @param {Function} MenuClickCallback function to call on menu entry click
 * @returns Button
 */
const Button = ({
    button_text = 'Submit',
    type = 'submit',
    button_align = 'right',
    menu_entries = null,
    MenuClickCallback = null
}) => {

    let div_align = 'align-'
    if( button_align ) {
        div_align = div_align + button_align
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
                <button className="form common-field" type={type}>{button_text}</button>
            </div>);
    } else if( menu_entries ) {

        return (
            <div
                className={div_align}
            >

                <div className="submit-dropdown-button">
                    <button className="button submit-button" type={type}>{button_text}</button>
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
                    <div id="myDropdown" class="dropdown-content">
                        {menu_entries.map((menu_text) => {

                            if( String(menu_text.display_name).toLowerCase() !== 'action' ) {

                                return (

                                    <button className="dropdown-menu-entry" onClick={handleMenuClick} type="button" value={menu_text.value}>{menu_text.display_name}</button>

                                );
                        }
                        })}

                    </div>
                </div>
            </div>
        );
    }

}
 
export default Button;