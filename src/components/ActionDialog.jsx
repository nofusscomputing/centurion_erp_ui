import { WarningModal } from "@patternfly/react-component-groups";
import { Button, ButtonVariant, Spinner } from "@patternfly/react-core";
import { useState } from "react";
import { apiFetch } from "../hooks/apiFetch";


const sleep = ms => new Promise(r => setTimeout(r, ms))

/** Delete the object.
 * 
 * Performs a HTTP/DELETE on the provided URL.
 * 
 * @param {object} param
 * @param {string} param.deleteURL URL of the object.
 * @returns {boolean} true when deleted, false otherwise.
 */
const ActionDeleteRow = async (
    deleteURL
) => {

    const action = await apiFetch(
        deleteURL,
        null,
        "DELETE",
        null,
        false,
        false
    )
        .then((response) => {

            if( response.status === 204) {

                return true
            }
        })


    return action;
}



/** Action Dialog Box
 * 
 * A self contained action dialog box that performs certain actions,
 * i.e. delete a row.
 * 
 * @param {object} props
 * @param {"delete"} [props.actionType="delete"] Type of action dialog.
 * @param {object} props.objectData The objects data as received from the backend.
 * @param {object} props.objectMetadata The objects metadata as received from the backend.
 * @param {(success: boolean, id: number) => void} props.updateCallback Callback fired after action completes.
 * 
 * @returns Self contained component ready to place.
 */
const ActionDialog = ({
    actionType = 'delete',
    objectData,
    objectMetadata,
    updateCallback,
}) => {

    const [isOpen, setIsOpen] = useState(false);

    const [ isLoading, setIsLoading ] = useState(false)



    const onConfirm = async () => {

        setIsLoading(true)

        let action = false;

        switch(actionType) {

            case 'delete':

                action = await ActionDeleteRow(
                    objectData._urls._self
                );

                break;

            default:
                throw Error('Unknown action requested');
        }

        setIsLoading(false)

        setIsOpen(false)

        updateCallback(action, objectData.id)

    }


    const onClose = () => {

        setIsLoading(false)

        setIsOpen(false)
    }


    return (
        <>
            <Button onClick={() => setIsOpen(true)}>
                Delete
            </Button>
            <WarningModal
                checkboxLabel = "Are you sure?"
                confirmButtonVariant = {ButtonVariant.danger}
                isOpen = {isOpen}
                title = "Confirm Delete"
                onClose = {onClose}
                onConfirm = {onConfirm}
                onEscapePress = {onClose}
                withCheckbox = {isLoading ? false : true}
            >
                {!isLoading && <>You are about to delete {objectMetadata.name} with id {objectData.id}. do you wish to continue?</>}
                {isLoading && <Spinner aria-label="Processing" /> }
            </WarningModal>
        </>
    );
}

export default ActionDialog;
