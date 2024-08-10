import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import html2canvas from "html2canvas";

import stamp from "../assets/stamp.jpg";

const PrintModel = ({ isOpen, onOpenChange, unavailableDrugs }) => {
  const handleDownload = () => {
    const printContent = document.getElementById("print-id");

    html2canvas(printContent, {
      backgroundColor: "#ffffff",
    }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "unavailable-drugs.png";
      link.click();
    });
  };

  return (
    <Modal
      size="sm"
      placement="top-center"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
            <form>
              <ModalBody className="flex flex-row justify-center">
                <div
                  className="flex gap-5"
                  id="print-id"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    width: "250px",
                    height: "300px",
                    position: "relative",
                    padding: "10px",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <img src={stamp} alt="stamp" className="absolute w-20 bottom-0 right-0" />
                  <h1
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      fontWeight: "bold",
                      zIndex: 1,
                    }}
                  >
                    Unavailable Drugs
                  </h1>
                  {unavailableDrugs.length > 0
                    ? unavailableDrugs.map((drug, index) => (
                        <div key={index}>{drug}</div>
                      ))
                    : "No drugs selected"}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={unavailableDrugs.length > 0 ? handleDownload : null}
                >
                  Print
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PrintModel;
