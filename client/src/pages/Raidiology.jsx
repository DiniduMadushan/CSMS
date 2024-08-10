import {
  Button,
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
import ScanQrModalParamarcy from "../components/ScanQrModalParamarcy";
import ScanQrModalRaidiology from "../modal/ScanQrModalRaidiology";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const Radiology = () => {
  const [page, setPage] = useState(1);
  const [datac, setData] = useState(null);
  const [x, setX] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const rowsPerPage = 6;
  const pages = Math.ceil(x.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return x.slice(start, end);
  }, [page, x]);

  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onOpenChange: onModalChange,
  } = useDisclosure();
  // console.log(x[x.length - 1].xray);
  useEffect(() => {
    const fetchXrayData = async () => {
      if (datac) {
        try {
          // const response = await fetch(`http://localhost:5000/patients/${id}`, {
          const response = await fetch(
            `http://localhost:5000/medical-record/xray/${datac?._id}`,
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          if (response.status === 404) {
            toast.error("Xray not found.");
          } else if (response.status === 200) {
            const data = await response.json();
            const xray = data;

            setX(xray);
            toast.success("Successfully retrieved Xray.");
          }
        } catch (error) {
          console.error("Error retrieving Xray:", error);
          toast.error("Failed to retrieve Xray.");
        } finally {
        }
      }
    };
    fetchXrayData();
  }, [datac, refetch]);

  const deliverdXray = async () => {
    console.log(datac);
    try {
      const response = await fetch(
        `http://localhost:5000/medical-record/xray/delivered/${
          x[x.length - 1]?._id
        }`,

        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: datac.firstName,
            lastName: datac.lastName,
            phoneNumber: datac.phoneNumber,
          }),
        }
      );
      if (response.status === 200) {
        toast.success("Xray delivered successfully.");
        setRefetch(!refetch);
      } else {
        toast.error("Failed to deliver Xray.");
      }
    } catch (error) {
      console.error("Error delivering Xray:", error);
      toast.error("Failed to deliver Xray.");
    }
  };

  return (
    <Layout>
      <div className="flex px-10">
        <div className="flex flex-col items-center justify-center">
          <button
            className="bg-blue-700 rounded-lg w-28 mt-5 hover:bg-blue-900 text-white h-10 p-2"
            onClick={openModal}
            color="primary"
          >
            Scan
          </button>
        </div>
      </div>
      <div className="flex flex-row mt-10">
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
        <div className="flex-1 px-5">
          {x ? (
            <h1 className="text-xl font-semibold text-center mt-1">
              X Ray Details
            </h1>
          ) : (
            <div className="border rounded-lg h-60">
              <h1 className="text-2xl font-semibold text-center mt-5">
                X Ray Details
              </h1>
              <h1 className="text-red-500 text-sm mt-10 text-center">
                Not available
              </h1>
            </div>
          )}
          <div className="flex mt-2 items-center justify-center">
            {
              x && (
                // x?.map((data) => (
                <div className="flex w-[520px] gap-10 p-4 rounded-lg border items-center">
                  <div className="flex flex-col gap-2 ml-10">
                    <h1>Issues by:</h1>
                    <h1>Issues date:</h1>
                    <h1>Description</h1>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-blue-500">
                      {x[x.length - 1]?.xrayIssued}
                    </div>
                    <div className="text-blue-500">
                      {new Date(x[x.length - 1]?.date).toLocaleDateString()}
                    </div>
                    <div className="text-blue-500">{x[x.length - 1]?.xray}</div>
                  </div>
                </div>
              )
              // ))
            }
          </div>
          <div className="w-full flex justify-center mt-10">
            <Button onClick={() => deliverdXray()} color="danger">
              Delivered Xray
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-16">
        <div className="w-[1000px] mt-2">
          <Table
            aria-label="Example static collection table"
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="primary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            }
          >
            <TableHeader>
              <TableColumn>Id</TableColumn>
              <TableColumn>Issued By</TableColumn>
              <TableColumn>Date</TableColumn>
              <TableColumn>Description</TableColumn>
              <TableColumn>Delivered</TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.xrayIssued}</TableCell>
                  <TableCell>
                    {new Date(item.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{item.xray}</TableCell>
                  <TableCell>
                    {item.delivered ? "Delivered" : "Not Delivered"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <ScanQrModalRaidiology
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
export default Radiology;
