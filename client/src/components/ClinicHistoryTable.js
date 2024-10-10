import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  Button
} from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa6";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const ClinicHistoryTable = ({ patientId }) => {
  const [page, setPage] = useState(1);
  const [clinicHistory, setClinicHistory] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const rowsPerPage = 6;

  // Fetch clinic history based on patientId
  useEffect(() => {
    const fetchClinicHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/medical-record/medicalhistory/${patientId}`
        );
        const sortedHistory = response.data.sort((a, b) => new Date(b.date) - new Date(a.date)); 
        setClinicHistory(sortedHistory);
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

  const handleShowMore = (record) => {
    setVisible(true);
    setSelectedRecord(record);
  };

  const closeHandler = () => {
    setVisible(false);
    setSelectedRecord(null);
  };

  return (
    <div className="w-[1000px] mt-2">
      <div className="flex justify-between p-2">
        <h1 className="text-center mt-2 font-semibold">Patient Medical records</h1>
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
          <TableColumn>Time of Visit</TableColumn>
          <TableColumn>Responsible Doctor</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={item._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(item.date).toLocaleTimeString()}</TableCell>
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
              {/* Only displaying the medical record description */}
              <Textarea
                readOnly
                label="Medical Record Description"
                value={selectedRecord.description}
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
