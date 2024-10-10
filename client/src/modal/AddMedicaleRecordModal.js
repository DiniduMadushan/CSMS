import {
  Button,
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

const AddMedicaleRecordModal = ({ isOpen, onOpenChange, datac, docName }) => {
  const [medicalRecord, setMedicalRecord] = useState("");

  const handleMedicalRecordChange = (e) => {
    setMedicalRecord(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for required fields
    if (!datac?._id) {
      return toast.error("Patient ID is required. Please scan the QR code.");
    }

    if (!medicalRecord) {
      return toast.error("Medical Record is required.");
    }

    // Prepare the payload with patientId, medicalRecord, and user_id
    const medical = {
      patientId: datac?._id,
      description: medicalRecord,
      docName: docName,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/medical-record",
        medical
      );

      if (res.status === 201) {
        toast.success("Medical Record Added Successfully");
        // removeQueue(datac._id); 
        onOpenChange(); // Close the modal
      }
    } catch (error) {
      console.error("Error adding medical record:", error);
      toast.error("Failed to add medical record.",error);
    }
  };

  // const removeQueue = async (id) => {
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:5000/medical-record/rm/queue/${id}`
  //     );

  //     if (response.status === 200) {
  //       toast.success(response.data.message);
  //       console.log(response.data.queue);
  //     }
  //   } catch (error) {
  //     console.error("Error removing patient from queue:", error);
  //     toast.error("Failed to remove patient from queue.");
  //   }
  // };

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
              Add Medical Record
            </ModalHeader>
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <div className="flex gap-5">
                  <Textarea
                    label="Medical Record"
                    placeholder="Enter Medical Record"
                    onChange={handleMedicalRecordChange}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={() => setMedicalRecord("")}>
                  Clear
                </Button>
                <Button color="primary" type="submit">
                  Add record
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddMedicaleRecordModal;
