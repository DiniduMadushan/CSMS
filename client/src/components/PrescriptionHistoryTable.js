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
  Button,
} from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa6";
import { useMemo, useState, useEffect } from "react";
import axios from "axios"; // Import Axios for making API calls

const PrescriptionHistoryTable = ({ patientId }) => {
  const [page, setPage] = useState(1);
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const rowsPerPage = 6;

  useEffect(() => {
    // Fetch prescriptions based on patientId
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/medical-record/prescriptionhistory/${patientId}`
        );
        const sortedPrescriptions = response.data.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date (newest first)
        setPrescriptions(sortedPrescriptions);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    if (patientId) {
      fetchPrescriptions();
    }
  }, [patientId]);

  const pages = Math.ceil(prescriptions.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return prescriptions.slice(start, end);
  }, [page, prescriptions]);

  const handleShowMore = (prescription) => {
    setSelectedPrescription(prescription);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPrescription(null);
  };

  return (
    <div className="w-[1000px] mt-2">
      <div className="flex justify-between p-2">
        <h1 className="text-center mt-2 font-semibold">Prescription History</h1>
      </div>
      <Table
        aria-label="Prescription history table"
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
          <TableColumn>Date of Issue</TableColumn>
          <TableColumn>Time</TableColumn>
          <TableColumn>Issued by Dr</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={item._id}>
              <TableCell>{index + 1 + (page - 1) * rowsPerPage}</TableCell>
              <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(item.date).toLocaleTimeString()}</TableCell>
              <TableCell>{item.docName}</TableCell>
              <TableCell className="flex gap-6">
                <Tooltip content="View Prescription">
                  <span
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    onClick={() => handleShowMore(item)}
                  >
                    <FaRegEye />
                  </span>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Prescription Modal */}
      <Modal isOpen={isModalOpen} onOpenChange={handleCloseModal}>
        <ModalContent>
          {selectedPrescription && (
            <ModalHeader>
              Prescription List on{" "}
              {new Date(selectedPrescription.date).toLocaleDateString()}{" "}
              {new Date(selectedPrescription.date).toLocaleTimeString()}
            </ModalHeader>
          )}
          <ModalBody>
            {selectedPrescription ? (
              <div>
                <ul>
                  {selectedPrescription.prescription.split(",").map((item, index) => (
                    <li key={index}>{item.trim()}</li> // Trim to remove extra spaces
                  ))}
                </ul>
              </div>
            ) : (
              <p>No prescription details available.</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCloseModal}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PrescriptionHistoryTable;
