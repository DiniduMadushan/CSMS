import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import axios from "axios";

const DeletePatientModel = ({
  isOpen,
  onOpenChange,
  selectedPatientId,
  setSelectedPatientId,
  setRefetch,
}) => {
  const deletePatient = () => {
    if (selectedPatientId) {
      try {
        axios.delete(`http://localhost:5000/patients/${selectedPatientId}`);
        setSelectedPatientId(null);
        setRefetch(true);
      } catch (error) {
        console.log(error);
      }
    }
    onOpenChange();
  };

  console.log(selectedPatientId);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Patient
            </ModalHeader>
            <ModalBody>
              <div>
                if you delete this patient, all the information will be lost
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="success" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                disabled={!selectedPatientId}
                color="danger"
                variant="solid"
                onClick={deletePatient}
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
export default DeletePatientModel;
