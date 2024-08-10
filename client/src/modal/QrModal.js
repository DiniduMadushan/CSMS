import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { CiCircleCheck } from "react-icons/ci";
import html2canvas from "html2canvas";
import React from "react";
import QRCode from "qrcode.react";
import { appF } from "../db/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import axios from "axios";
const storage = getStorage(appF);
const QrModal = ({ isOpen, onOpenChange, onOpen, patientID, patientsData }) => {
  const downloadImage = () => {
    const element = document.getElementById("qr-data");

    const wrapper = document.createElement("div");
    wrapper.style.padding = "10px";
    wrapper.style.width = `${element.offsetWidth}px`;
    wrapper.style.backgroundColor = "#ffffff";

    const clonedElement = element.cloneNode(true);
    wrapper.appendChild(clonedElement);

    document.body.appendChild(wrapper);

    html2canvas(wrapper).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "QR_Data.png";
      link.click();

      document.body.removeChild(wrapper);
    });
  };
  const handleDownload = () => {
    const canvas = document.getElementById("qrcode");
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.png";
    link.click();
  };

  const handleSendEmail = async () => {
    const canvas = document.getElementById("qrcode");
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("attachment", blob, "qrcode.png");
      formData.append("to", `${patientsData.email}`); 
      formData.append("subject", "QR Code");
      formData.append("text", "Here is your QR code.");

      try {
        const response = await axios.post(
          "http://localhost:5000/send-email",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Email sent successfully!");
      } catch (error) {
        console.error("Error sending email:", error);
        alert("Failed to send email. Please try again.");
      }
    });
  };
  return (
    <Modal
      size="lg"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
            <ModalBody>
              <div className="flex flex-col items-center gap-2">
                <CiCircleCheck size={50} color="green" />
                <div className="flex flex-row gap-5 bg-green-600 text-white py-2 px-5 rounded-lg">
                  <span className="text-lg">QR Code Generated</span>
                </div>
                <div className="flex flex-row gap-5">
                  <span className="">Download or Send the QR code</span>
                </div>
              </div>
              <Divider />
              <div
                id="qr-data"
                className="flex  gap-5 border-gray-600 border rounded-lg py-2 px-2"
              >
                <div className=" justify-start flex">
                  {patientID && (
                    <div>
                      <QRCode id="qrcode" value={patientID} />
                    </div>
                  )}
                </div>
                <div className=" justify-start flex">
                  <div className="flex gap-2 justify-start">
                    <div className="flex gap-2 flex-col text-sm justify-center">
                      <div className="font-semibold">Base Hospital</div>
                      <span>Name</span>
                      <span>NIC</span>
                      <span>Phone Number</span>
                      <span>Email</span>
                    </div>
                    <div className="flex gap-2 flex-col text-sm  justify-center">
                      <div className="flex gap-2">
                        <span>:</span>
                        <div className="font-semibold">Kolonna</div>
                      </div>
                      <div className="flex gap-2">
                        <span>:</span>
                        <div className="">
                          {patientsData.firstName + patientsData.lastName}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span>:</span>
                        <div className="">{patientsData.idNumber}</div>
                      </div>
                      <div className="flex gap-2">
                        <span>:</span>
                        <div className="">{patientsData.phoneNumber}</div>
                      </div>
                      <div className="flex gap-2">
                        <span>:</span>
                        <div className="">{patientsData.email}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={patientID ? handleDownload : null}
                color="success"
                variant="solid"
                disabled={!patientID}
                // onPress={onClose}
              >
                Download
              </Button>
              <Button
                color="primary"
                variant="solid"
                onClick={patientID ? handleSendEmail : null}
                disabled={!patientID}
              >
                Send
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
export default QrModal;
