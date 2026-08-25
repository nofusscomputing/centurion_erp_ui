import { fieldRelationship } from "./choice"


/**
 * 
 * @category Type
 * @since xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 */
export interface fieldCommon {

    help_text: string

    label: string

    read_only: boolean

    required: boolean

    write_only: boolean
}


/**
 * Available field types ...................
 * 
 * @category Type
 * @expandType choiceField
 * @expandType relationshipField
 */
export type fieldType =
    fieldRelationship