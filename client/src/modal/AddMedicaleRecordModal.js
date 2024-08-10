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


const AddMedicaleRecordModal = ({ isOpen, onOpenChange, datac }) => {
  const [medicalRecode, setMedicalRecode] = useState("");

  const handleMedicalRecodeChange = (e) => {
    setMedicalRecode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!datac?._id) {
      return toast.error("Patient ID is required please scan the QR code");
    }

    if (!medicalRecode) {
      return toast.error("Medical Record is required");
    }

    const medical = {
      patientId: datac?._id,
      medicalRecode: medicalRecode,
    };

    const res = await axios.post(
      "http://localhost:5000/medical-record",
      medical
    );
    console.log(res);
    if (res.status === 200) {
      toast.success("Medical Record Added Successfully");
      removeQueue(datac._id);
      onOpenChange();
    }
  };

   const removeQueue = async (id) => {
     try {
       const response = await axios.put(
         `http://localhost:5000/medical-record/rm/queue/${id}`
       );

       if (response.status === 200) {
         toast.success(response.data.message);
         console.log(response.data.queue);
       }
     } catch (error) {
       console.error("Error adding patient to queue:", error);
       toast.error("Failed to add patient to queue.");
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
              Add Medicale Record
            </ModalHeader>
            <form>
              <ModalBody>
                <div className="flex gap-5">
                  <Textarea
                    label="Medical Record"
                    placeholder="Enter Medical Record"
                    onChange={handleMedicalRecodeChange}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light">
                  Clear
                </Button>
                <Button color="primary" type="submit" onClick={handleSubmit}>
                  Register
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
