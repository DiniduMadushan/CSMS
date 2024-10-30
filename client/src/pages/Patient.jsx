import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import PatientsMedicalHistory from "../components/PatientsMedicalHistory";
import { Button, useDisclosure } from "@nextui-org/react";
import RequestNewAppointment from "../modal/RequestNewAppointment";
import axios from "axios";

const PatientPage = () => {
  const [nextClinicDate, setNextClinicDate] = useState("no appointment");
  const [clincIssuedBy, setClinicIssuedBy] = useState('');
  const [patientId , setPatientId] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("authUser"));
    axios.get(`http://localhost:5000/patients/email2id/${user.email}`)
    .then( (response) => {
      const patientId = response.data.patientId;
      setPatientId(patientId);
      //get next clinc date
      axios.get(`http://localhost:5000/medical-record/appointments/${patientId}`)
      .then(response => {
        const data = response.data;
        if (data.message === "appointment"){
          const date = new Date(data.appointment.date);
          setClinicIssuedBy(data.appointment.doctorId);
          setNextClinicDate(date);
        }
        else {setNextClinicDate("no appointment")}
      })
    })
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

  // Download full report
  const fullReportDownload = () => {
    const payload = {
      patientId: patientId
    };

    axios.post("http://localhost:5000/report/full", payload, {
      responseType: 'blob'
    })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement('a');
      link.href = url;

      const fileName = response.headers['content-disposition'] 
                        ? response.headers['content-disposition'].split('filename=')[1] 
                        : 'Full_Report.pdf';
                        
      link.setAttribute('download', fileName);
      
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
    })
    .catch(error => {
      console.error('Error downloading the report:', error);
    });
  };

  return (
    <Layout>
      <div className="flex justify-center items-center mt-10  flex-col  ">
      <div> 
          <PatientsMedicalHistory />
        <div className="flex">
          <Button color="primary" className="mt-10 ml-[600px]" onClick={fullReportDownload}>
            Download E-Book
          </Button>
        </div>
        <div>
          <div className="mt-10 flex p-2 border-2 w-[800px] rounded-md">
            Next Clinic Date :
            <span className="ml-20">
              {nextClinicDate != "no appointment" ? (
                <span>{nextClinicDate.getFullYear()}/{nextClinicDate.getMonth()+1}/{nextClinicDate.getDate()}</span>
              ) : "No Appointment"}
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
        patientId = {patientId}
        doctorId={clincIssuedBy}
        isOpen={isModalOpen}
        onOpenChange={onModalChange}
      />
    </Layout>
  );
};
export default PatientPage;
