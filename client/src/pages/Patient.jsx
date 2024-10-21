import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import MyFeedbacks from "../components/MyFeedbacks";
import PatientsMedicalHistory from "../components/PatientsMedicalHistory";
import { Button, useDisclosure } from "@nextui-org/react";
import RequestNewAppointment from "../modal/RequestNewAppointment";
import toast from "react-hot-toast";

const PatientPage = () => {
  const [user, setUser] = useState(null);
  const [myemail, setMyemail] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    if (!authUser) {
      window.location.href = "/login";
      return;
    }
    const parsedUser = JSON.parse(authUser);
    setUser(parsedUser);
    setMyemail(parsedUser.email);
    setLoading(false); // Set loading to false after email is set
  }, []);

  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onOpenChange: onModalChange,
  } = useDisclosure();

  const handleShowMore = () => {
    openModal();
  };

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while data is being fetched
  }

  const handleFeedbackdAdd = () => {
    setRefetch(!refetch); // Toggle refetch to update tables
  };

  return (
    <Layout>
      <div className="flex justify-center items-center mt-10 flex-col">
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
              onClick={handleShowMore}
              color="primary"
              className="mt-10 ml-[600px]"
            >
              Request a New Appointment
            </Button>
          </div>

          {myemail ? (
            <MyFeedbacks myemail={myemail} />
          ) : (
            toast.error("User email not available")
          )}
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
