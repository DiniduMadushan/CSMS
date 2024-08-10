import {
  Button,
  DateInput,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";

import toast from "react-hot-toast";

const RequestNewAppointment = ({ isOpen, onOpenChange }) => {
  const [date, setDate] = useState(null);
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
              Request New Appointment
            </ModalHeader>
            <ModalBody>
              <DateInput
                // onChange={(e) => setDate(e.target.value)}
                placeholder="new appointment date"
              />
            </ModalBody>
            <ModalFooter>
              <Button
                type="date"
                color="success"
                variant="light"
                onPress={onClose}
              >
                Close
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  toast.success("new appointment date Requested Successfully");
                  onClose();
                }}
              >
                Request
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
export default RequestNewAppointment;
