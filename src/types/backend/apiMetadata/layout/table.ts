


/**
 * Table Layout
 * 
 * if an entry in the array, is itself an array, this will render as
 * collapsible under the row in question.
 * 
 * Just like the `dataset.columns` keys, the value can be a link object.
 * see {@link UILayout.dataset} for an example on the object and its keys.
 * 
 * Used by any instance of {@link DisplayTable}
 * 
 * @category Description
 * @since 0.10.0
 */
export interface layoutTable {

    /**
     * This layout is for displaying multiple objects within a dataset.
     */
    table: [string | object]


}
