import {
    Flex,
    FlexItem
} from '@patternfly/react-core';

import {
    css
} from '@patternfly/react-styles';

import styles from '@patternfly/react-styles/css/components/List/list';



/** Props for ListItem
 * 
 * @category Props
 * @since 0.12.0 
 */
export interface ListItemProps extends React.HTMLProps<HTMLLIElement> {
  /**
   * Additional classes added to the list item
   */
  className?: string;
  /**
   * Anything that can be rendered inside of list item
   */
  children: React.ReactNode;
  /** Icon for the list item */
  icon?: React.ReactNode | null;
  /**
   * Display list elements as a block instead of inline.
   */
  isBlock?: Boolean
}


/**
 * This `ListItem` provides customization for the list object to have elements
 * displayed as `block` elements.
 * 
 * ## Origin
 * 
 * This custom component is/was required as the PatternFly component of the
 * same name only worked with string objects.
 * 
 * @summary `ListItem` with support for block items
 * 
 * @category Component
 * @since 0.12.0 
 */
// const ListItem: React.FunctionComponent<ListItemProps> = ({
const ListItem = ({
  className,
  children = null,
  icon = null,
  isBlock = false,
  ...props
}: ListItemProps): React.JSX.Element => {

    return (

        <li
            className={css(className)}
            {...props}
        >
            <>
                { isBlock &&
                <>

                    <Flex
                        alignItems = {{ default: 'alignItemsFlexStart'}}
                        direction={{ default: 'row' }}
                    >
                        { icon && <FlexItem>{icon}</FlexItem>}
                        <FlexItem
                            className={icon && css(`${styles.list}__item-text`)}
                            grow={{ default: 'grow' }}
                        >
                            {children}
                        </FlexItem>
                    </Flex>
                </>}

                { ! isBlock &&
                <>
                    {icon &&
                    <span className={css(styles.listItemIcon)}>{icon}</span>
                    }

                    <span className={icon && css(`${styles.list}__item-text`)}>{children}</span>
                </>}
            </>
        </li>
    );

}

// ListItem.displayName = 'ListItem';

export default ListItem;
