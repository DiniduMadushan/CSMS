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

const NewXrayModal = ({ isOpen, onOpenChange, datac }) => {
  const [xray, setXray] = useState("");

  const handleXrayChange = (e) => {
    setXray(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!datac?._id) {
      return toast.error("Patient ID is required please scan the QR code");
    }

    if (!xray) {
      return toast.error("X-Ray is required");
    }

    //this one want get logged doctor name
    const xrayIssued = "Dr Isuru";
    const medical = {
      patientId: datac?._id,
      xray: xray,
      xrayIssued,
    };

    const res = await axios.post(
      "http://localhost:5000/medical-record/xray",
      medical
    );
    console.log(res);
    if (res.status === 200) {
      toast.success("X-Ray Added Successfully");
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
            <ModalHeader className="flex flex-col gap-1">New X-ray</ModalHeader>
            <form>
              <ModalBody>
                <div className="flex gap-5">
                  <Textarea
                    autoFocus
                    label="X-Ray"
                    placeholder="Enter X-Ray"
                    onChange={handleXrayChange}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light">
                  Clear
                </Button>
                <Button color="primary" type="submit" onClick={handleSubmit}>
                  Add X-Ray
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
export default NewXrayModal;
