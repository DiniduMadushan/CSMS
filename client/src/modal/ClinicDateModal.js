import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  DatePicker,
} from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const ClinicDateModal = ({ isOpen, onOpenChange, datac }) => {
  const [date, setValue] = useState("");
  console.log(date.year + "-" + date.month + "-" + date.day);
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!datac?._id) {
      console.log(datac._id);
      toast.error("Patient ID is required please scan the QR code");
    }

    if (date === "") {
      toast.error("Clinic Date is required");
    }

    const medical = {
      patientId: datac?._id,
      clinicalDate: date.year + "-" + date.month + "-" + date.day,
    };

    const res = await axios.post(
      "http://localhost:5000/medical-record",
      medical
    );

    if (res.status === 200) {
      toast.success("Clinic Date Added Successfully");
      onOpenChange();
    }

    console.log(res);
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
              Clinic Date
            </ModalHeader>
            <form>
              <ModalBody>
                <div className="flex gap-5">
                  <DatePicker
                    autoFocus
                    label="Clinic Date"
                    variant="bordered"
                    showMonthAndYearPickers
                    isRequired
                    onChange={(date) => {
                      setValue(date);
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light">
                  Clear
                </Button>
                <Button color="primary" type="submit" onClick={onSubmit}>
                  Add Clinic Date
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
export default ClinicDateModal;
