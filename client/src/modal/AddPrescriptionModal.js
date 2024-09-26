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

const AddPrescriptionModal = ({ isOpen, onOpenChange, datac, user_id }) => {
  const [prescription, setPrescription] = useState("");

  const handlePrescriptionChange = (e) => {
    setPrescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!datac?._id) {
      return toast.error("Patient ID is required. Please scan the QR code.");
    }

    if (!prescription) {
      return toast.error("Prescription is required.");
    }

    const prescriptionList = {
      patientId: datac?._id,
      doctorId: user_id, // Pass user_id here
      prescription_list: prescription,
    };

    try {
      const res = await axios.post("http://localhost:5000/medical-record/prescriptionList", prescriptionList);
      console.log(res);
      if (res.status === 201) {
        toast.success("Prescription Added Successfully");
        onOpenChange();
      }
    } catch (error) {
      toast.error("Failed to add prescription",error);
      console.error(error);
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
              Add Prescription
            </ModalHeader>
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <div className="flex gap-5">
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
                <Button color="primary" type="submit">
                  Add Prescription
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddPrescriptionModal;
