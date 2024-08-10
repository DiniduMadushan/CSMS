import {
  Button,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import Layout from "../layout/Layout";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import axios from "axios";
import ScanQrModalAttendant from "../modal/ScanQrModalAttendant";

const Attendant = () => {
  const [datac, setData] = useState(null);
  const [queue, setQueue] = useState([]);
  const [refetch, setRefetch] = useState(false);
  //   console.log(queue[0].queue);

  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onOpenChange: onModalChange,
  } = useDisclosure();

  const addQueue = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/medical-record/queue/${datac._id}`
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        console.log(response.data.queue);
        setRefetch(!refetch);
      }
    } catch (error) {
      console.error("Error adding patient to queue:", error);
      toast.error("Failed to add patient to queue.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/medical-record/queue/get`
        );

        if (response.status === 200) {
          //   console.log(response.data);
          setQueue(response.data);
        }
      } catch (error) {
        console.error("Error fetching queue data:", error);
        toast.error("Failed to fetch queue data.");
      }
    };

    fetchData();
  }, [refetch]);

  return (
    <Layout>
      <div className="flex px-10 justify-between mt-5">
        <div className="flex flex-col items-center justify-between">
          <button
            className="bg-blue-700 rounded-lg w-28 mt-5 hover:bg-blue-900 text-white h-10 p-2"
            onClick={openModal}
            color="primary"
          >
            Scan
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="">
            <div className="flex flex-col items-center justify-center w-44 text-center   rounded-lg text-xl p-2 border-2">
              Patient In The Queue : {queue ? queue[0]?.queue?.length : "0"}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-10">
        <div className="flex-1 px-5">
          {datac ? (
            <h1 className="text-xl font-semibold text-center mt-1">
              Patient Details
            </h1>
          ) : (
            <div className="border rounded-lg h-60">
              <h1 className="text-2xl font-semibold text-center mt-5">
                Patient Details
              </h1>
              <h1 className="text-red-500 text-sm mt-10 text-center">
                No patient data found. Please scan a QR code.
              </h1>
            </div>
          )}
          <div className="flex mt-2 items-center justify-center">
            {datac && (
              <div className="flex w-[520px] gap-10 p-4 rounded-lg border items-center">
                <div className="flex flex-col gap-2 ml-10">
                  <h1>Patient Name:</h1>
                  <h1>Id Number:</h1>
                  <h1>Birth Day:</h1>
                  <h1>Phone Number:</h1>
                  <h1>Email:</h1>
                  <h1>Address:</h1>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-blue-500">
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
        <div className="flex justify-center">
          <Button
            className="p-2 border mt-5 px-10 "
            color="primary"
            onClick={addQueue}
          >
            Add patient to the queue
          </Button>
        </div>
      </div>

      <ScanQrModalAttendant
        setData={setData}
        isOpen={isModalOpen}
        onOpenChange={onModalChange}
      />

      {/* <PrintModel
        isOpen={isPrintModalOpen}
        onOpenChange={onPrintModalChange}
        unavailableDrugs={unavailableDrugs}
      /> */}
    </Layout>
  );
};
export default Attendant;
