import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const AddNewRecordModal = ({ isOpen, onOpenChange, datac }) => {
  const [prescription, setPrescription] = useState("");

  const handlePrescriptionChange = (e) => {
    setPrescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!datac?._id) {
      return toast.error("Patient ID is required please scan the QR code");
    }

    if (!prescription) {
      return toast.error("Prescriotopn is required");
    }

    const medical = {
      patientId: datac?._id,
      prescription: prescription,
    };

    const res = await axios.post(
      "http://localhost:5000/medical-record",
      medical
    );
    console.log(res);
    if (res.status === 200) {
      toast.success("Prescrioption Added Successfully");
      onOpenChange();
    }
  };


  return (
    <Modal
      size="lg"
      placement="top-center"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add prescription
            </ModalHeader>
            <form>
              <ModalBody>
                <div className="flex gap-5">
                  {/* <Input
                    autoFocus
                    label="First Name"
                    placeholder="Enter your first name"
                    variant="bordered"
                  /> */}

                  <Textarea
                    autoFocus
                    label="Add Medicines"
                    placeholder="Add medicines and after adding one, add ',' e.g., Aspirin, Paracetamol, Piriton"
                    onChange={handlePrescriptionChange}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light">
                  Clear
                </Button>
                <Button color="primary" type="submit" onClick={handleSubmit}>
                  Add Prescrioption
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
export default AddNewRecordModal;
