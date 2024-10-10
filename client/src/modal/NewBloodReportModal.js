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

const NewBloodReportModal = ({ isOpen, onOpenChange, datac,docName }) => {
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
      return toast.error("Report request is required");
    }

    const bloodReportRequest = {
      patientId: datac?._id,
      report_desc: bloodReport,
      reportRequested: docName,
    };

    const res = await axios.post(
      "http://localhost:5000/medical-record/lab",
      bloodReportRequest
    );
    console.log(res);
    if (res.status === 200) {
      toast.success("Report Request is Added Successfully");
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
              Request Lab Report
            </ModalHeader>
            <form>
              <ModalBody>
                <div className="flex gap-5">
                  <Textarea
                    autoFocus
                    label="Lab Test Request"
                    placeholder="Enter test description"
                    onChange={handleBloodReportChange}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light">
                  Clear
                </Button>
                <Button color="primary" type="submit" onClick={handleSubmit}>
                  Add test Request
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
