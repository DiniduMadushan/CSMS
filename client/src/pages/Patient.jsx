import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import PatientsMedicalHistory from "../components/PatientsMedicalHistory";
import { Button, useDisclosure } from "@nextui-org/react";
import RequestNewAppointment from "../modal/RequestNewAppointment";

const PatientPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("authUser");
    if (!user) {
      window.location.href = "/login";
    }

    setUser(JSON.parse(user));
  }, []);

  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onOpenChange: onModalChange,
  } = useDisclosure();

  const ClickOpen = () => {
    openModal();
  };
  const handleShowMore = () => {
    openModal();
  };
  return (
    <Layout>
      <div className="flex justify-center items-center mt-10  flex-col  ">
      <div> 
          <PatientsMedicalHistory />
        <div className="flex">
          <Button color="primary" className="mt-10 ml-[600px]">
            Download E-Book
          </Button>
        </div>
        <div>
          <div className="mt-10 flex p-2 border-2 w-[800px] rounded-md">
            Next Clinic Date :
            <span className="ml-20">
              {new Date().getDate() + 1} / {new Date().getMonth() + 1} /{" "}
              {new Date().getFullYear()}
            </span>
          </div>
        </div>
        <div className="flex">
          <Button
            onClick={() => handleShowMore()}
            color="primary"
            className="mt-10 ml-[600px]"
          >
            Request to new Appointment
          </Button>
        </div>
      </div>
      </div>
      <RequestNewAppointment
        isOpen={isModalOpen}
        onOpenChange={onModalChange}
      />
    </Layout>
  );
};
export default PatientPage;
