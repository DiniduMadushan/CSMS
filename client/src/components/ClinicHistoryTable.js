import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa6";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const ClinicHistoryTable = ({ patientId }) => {
  const [page, setPage] = useState(1);
  const [clinicHistory, setClinicHistory] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [xrays, setXrays] = useState([]);
  const [labs, setLabs] = useState([]);
  const rowsPerPage = 6;

  // Fetch clinic history based on patientId
  useEffect(() => {
    const fetchClinicHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/medical-record/medicalhistory/${patientId}`
        );
        setClinicHistory(response.data); // Assuming response contains the medical records array
      } catch (error) {
        console.error("Error fetching clinic history:", error);
      }
    };

    if (patientId) {
      fetchClinicHistory();
    }
  }, [patientId]);

  const pages = Math.ceil(clinicHistory.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return clinicHistory.slice(start, end);
  }, [page, clinicHistory]);

  const handleShowMore = async (record) => {
    setVisible(true);
    setSelectedRecord(record);

    // Fetch related data
    try {
      const prescriptionsResponse = await axios.get(
        `http://localhost:5000/prescriptionhistory/${record.patientId}`
      );
      setPrescriptions(prescriptionsResponse.data);

      const xraysResponse = await axios.get(
        `http://localhost:5000/xrayhistory/${record.patientId}`
      );
      setXrays(xraysResponse.data);

      const labsResponse = await axios.get(
        `http://localhost:5000/labhistory/${record.patientId}`
      );
      setLabs(labsResponse.data);
    } catch (error) {
      console.error("Error fetching related data:", error);
    }
  };

  const closeHandler = () => {
    setVisible(false);
    setSelectedRecord(null);
    setPrescriptions([]);
    setXrays([]);
    setLabs([]);
  };

  return (
    <div className="w-[1000px] mt-2">
      <div className="flex justify-between p-2">
        <h1 className="text-center mt-2 font-semibold">Patient Clinic History</h1>
      </div>
      <Table
        aria-label="Patient clinic history table"
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
          <TableColumn>#</TableColumn>
          <TableColumn>Date of Visit</TableColumn>
          <TableColumn>Responsible Doctor</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={item._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
              <TableCell>{item.docName}</TableCell>
              <TableCell>
                {item.description.slice(0, 50)}
                {item.description.length > 50 ? "..." : ""}
              </TableCell>
              <TableCell className="flex gap-6">
                <Tooltip content="Details">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <FaRegEye onClick={() => handleShowMore(item)} />
                  </span>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal for displaying detailed information */}
      {selectedRecord && (
        <Modal isOpen={visible} onClose={closeHandler} size="lg">
          <ModalContent>
            <ModalHeader>
              Details for {new Date(selectedRecord.date).toLocaleDateString()}
            </ModalHeader>
            <ModalBody>
              <Textarea
                readOnly
                label="Medical Record Description"
                value={selectedRecord.description}
                minRows={3}
              />

              {/* Display prescriptions */}
              <Textarea
                readOnly
                label="Prescriptions"
                value={prescriptions.length > 0 ? prescriptions.map(p => `${p.date}: ${p.prescription}`).join('\n') : 'No prescriptions found.'}
                minRows={3}
              />

              {/* Display X-ray requests */}
              <Textarea
                readOnly
                label="X-ray Requests"
                value={xrays.length > 0 ? xrays.map(x => `${x.date}: ${x.xrayIssued}`).join('\n') : 'No X-ray requests found.'}
                minRows={3}
              />

              {/* Display lab report requests */}
              <Textarea
                readOnly
                label="Lab Report Requests"
                value={labs.length > 0 ? labs.map(l => `${l.date}: ${l.reportRequested}`).join('\n') : 'No lab report requests found.'}
                minRows={3}
              />
            </ModalBody>
            <ModalFooter>
              <Button auto flat color="error" onClick={closeHandler}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default ClinicHistoryTable;
