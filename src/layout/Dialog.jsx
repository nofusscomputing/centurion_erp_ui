import {
    useState
} from "react";

import {
    useRouteLoaderData
} from "react-router";

import {
    Modal,
    ModalBody,
    ModalHeader,
    ModalVariant
} from "@patternfly/react-core";

import DisplayFields from "../components/DisplayFields";


const Dialog = ({
    handleOnClose,
    isCreate = false,
    objectMetadata,
}) => {

    const [isModalOpen, setModalOpen] = useState(true);

    const pageData = useRouteLoaderData('sub-model-add');


    const handleModalToggle = (_event) => {

        handleOnClose(_event)

        setModalOpen(!isModalOpen);
    };


    const defaultLayout = {
        "layout": "single",
        "fields": objectMetadata.table_fields
    };

    return (

      <Modal
        variant={ModalVariant.small}
        isOpen={isModalOpen}
        onClose={handleModalToggle}
        aria-labelledby="form-modal-title"
        aria-describedby="modal-box-description-form"
        elementToFocus="#modal-custom-focus-confirm-button"
      >
        <ModalHeader
          title={isCreate ? `Add ${objectMetadata.name}` : ""}
          description={objectMetadata.description}
          descriptorId="modal-box-description-form"
          labelId="form-modal-title"
        />
        <ModalBody id="modal-custom-focus-confirm-button">
                <DisplayFields
                    id="modal-custom-focus-confirm-button"
                    // layout = {objectMetadata.layout.length && objectMetadata.layout[0].sections.length ? objectMetadata.layout[0].sections[0] : defaultLayout}
                    layout = {defaultLayout}
                    metadata = {objectMetadata}
                    isCreate = {isCreate}
                    onClose = {handleModalToggle}
                />
        </ModalBody>
        {/* <ModalFooter>
          <Button id="modal-custom-focus-confirm-button" key="create" variant="primary" form="modal-with-form-form" onClick={handleModalToggle}>
            Confirm
          </Button>
          <Button key="cancel" variant="link" onClick={handleModalToggle}>
            Cancel
          </Button>
        </ModalFooter> */}
      </Modal>
    );


}

export default Dialog
