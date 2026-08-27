import { fieldCommon } from "."

/**
 * 
 * @category Description
 * @expandType relationshipChoiceFieldChoices
 * @since xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 */
export interface fieldRelationship extends fieldCommon {

    /**
     * Available choices for this field.
     */
    choices: Array<relationshipChoiceFieldChoices>

    type: "Relationship"
}


/**
 * 
 * @category Type
 * @since xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 */
export interface relationshipChoiceFieldChoices {

    /**
     * This value is intended to be the ID / Primary Key of the objet in
     * question.
     */
    value: number

    display_name: string
}