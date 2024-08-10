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

const NewBloodReportModal = ({ isOpen, onOpenChange, datac }) => {
  const [bloodReport, setBloodReport] = useState("");

  const handleBloodReportChange = (e) => {
    setBloodReport(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!datac?._id) {
      return toast.error("Patient ID is required please scan the QR code");
    }

    if (!bloodReport) {
      return toast.error("Blood Report is required");
    }

    const medical = {
      patientId: datac?._id,
      report: bloodReport,
      reportIssued: "Isuru sajith",
    };

    const res = await axios.post(
      "http://localhost:5000/medical-record/lab",
      medical
    );
    console.log(res);
    if (res.status === 200) {
      toast.success("Blood Report Added Successfully");
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
              New Blood Report
            </ModalHeader>
            <form>
              <ModalBody>
                <div className="flex gap-5">
                  <Textarea
                    autoFocus
                    label="Blood Report"
                    placeholder="Enter Blood Report"
                    onChange={handleBloodReportChange}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light">
                  Clear
                </Button>
                <Button color="primary" type="submit" onClick={handleSubmit}>
                  Add Blood Report
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
export default NewBloodReportModal;
