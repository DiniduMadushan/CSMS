import Layout from "../layout/Layout";
import { useState } from "react";
import QrReader from "react-qr-scanner";
import React from "react";
import { useDisclosure } from "@nextui-org/react";
import ScanQrModal from "../modal/ScanQrModal";
import ClinicHistoryTable from "../components/ClinicHistoryTable";
import AddMedicaleRecordModal from "../modal/AddMedicaleRecordModal";
import AddNewRecordModal from "../modal/AddNewRecordModal";
import NewXrayModal from "../modal/NewXrayModal";
import NewBloodReportModal from "../modal/NewBloodReportModal";
import ClinicDateModal from "../modal/ClinicDateModal";

const DashboardDoctor = () => {
  const [datac, setDatac] = useState(null);

  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onOpenChange: onModalChange,
  } = useDisclosure();

  const {
    isOpen: isAddMedicaleRecordOpen,
    onOpen: openAddMedicaleRecord,
    onOpenChange: onAddMedicaleRecordChange,
  } = useDisclosure();

  const {
    isOpen: isAddNewRecordOpen,
    onOpen: openAddNewRecord,
    onOpenChange: onAddNewRecordChange,
  } = useDisclosure();

  const {
    isOpen: isXrayOpen,
    onOpen: openXray,
    onOpenChange: onXrayChange,
  } = useDisclosure();

  const {
    isOpen: isBloodOpen,
    onOpen: openBlood,
    onOpenChange: onBloodChange,
  } = useDisclosure();

  const {
    isOpen: isClinicDateOpen,
    onOpen: openClinicDate,
    onOpenChange: onClinicDateChange,
  } = useDisclosure();

  return (
    <Layout>
      <div className="flex justify-start flex-col items-start">
        <div className="flex flex-col items-center justify-center">
          <div className="mt-2">
            {/* {scan && (
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: "150px" }}
              />
            )} */}
          </div>
          <button
            className="bg-blue-700 rounded-lg w-28 mt-5 hover:bg-blue-900 text-white h-10 p-2 "
            onClick={openModal}
            color="primary"
          >
            Scan
          </button>
        </div>
      </div>
      <div className="flex py-5">
        <div className="flex-1 px-5">
          {datac && (
            <h1 className="text-xl  font-semibold text-center mt-1">
              Patient Details
            </h1>
          )}
          {!datac && (
            <div className="border rounded-lg  h-60">
              <h1 className="text-2xl  font-semibold text-center mt-5">
                Patient Details
              </h1>
              <h1 className="text-red-500 text-sm mt-10 text-center">
                No patient data found. Please scan a QR code.
              </h1>
            </div>
          )}
          <div className="flex mt-2 items-center justify-center">
            {datac && (
              <div className="flex w-[520px] gap-10 p-4 rounded-lg border  items-center ">
                <div className="flex flex-col gap-2 ml-10">
                  <h1 className="">Patient Name :</h1>
                  <h1 className="">Id Number :</h1>
                  <h1 className="">Birth Day:</h1>
                  <h1 className="">Phone Number :</h1>
                  <h1 className="">Email :</h1>
                  <h1 className="">Address :</h1>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-blue-500">
                    {" "}
                    {datac.firstName + " " + datac.lastName}
                  </div>
                  <div className="text-blue-500">{datac.idNumber}</div>
                  <div className="text-blue-500">
                    {new Date(datac.dob).toLocaleDateString()}
                  </div>
                  <div className="text-blue-500">{datac.phoneNumber}</div>
                  <div className="text-blue-500">{datac.email}</div>
                  <div className="text-blue-500">{datac.address}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className=" flex-1 justify-center flex mt-1 ">
          <div className="flex flex-col gap-3">
            <button
              onClick={openAddMedicaleRecord}
              className="border px-20 py-2 rounded-lg border-white text-sm bg-blue-600 text-white hover:bg-blue-800"
            >
              Add Medicale Record
            </button>
            <button
              onClick={openAddNewRecord}
              className="border px-20 py-2 rounded-lg border-white text-sm bg-blue-600 text-white hover:bg-blue-800"
            >
              Add prescription
            </button>

            <button
              onClick={openXray}
              className="border px-20 py-2 rounded-lg border-white text-sm bg-blue-600 text-white hover:bg-blue-800"
            >
              New X-ray
            </button>

            <button
              onClick={openBlood}
              className="border px-20 py-2 rounded-lg border-white text-sm bg-blue-600 text-white hover:bg-blue-800"
            >
              New Blood Report
            </button>

            <button
              onClick={openClinicDate}
              className="border px-20 py-2 rounded-lg border-white text-sm bg-blue-600 text-white hover:bg-blue-800"
            >
              Select Clinic Date
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <ClinicHistoryTable />
      </div>
      <ScanQrModal
        setDatac={setDatac}
        isOpen={isModalOpen}
        onOpenChange={onModalChange}
      />
      <AddMedicaleRecordModal
        isOpen={isAddMedicaleRecordOpen}
        onOpenChange={onAddMedicaleRecordChange}
        datac={datac}
      />

      <AddNewRecordModal
        isOpen={isAddNewRecordOpen}
        onOpenChange={onAddNewRecordChange}
        datac={datac}
      />

      <NewXrayModal
        isOpen={isXrayOpen}
        onOpenChange={onXrayChange}
        datac={datac}
      />

      <NewBloodReportModal
        isOpen={isBloodOpen}
        onOpenChange={onBloodChange}
        datac={datac}
      />

      <ClinicDateModal
        isOpen={isClinicDateOpen}
        onOpenChange={onClinicDateChange}
        datac={datac}
      />
    </Layout>
  );
};

export default DashboardDoctor;
