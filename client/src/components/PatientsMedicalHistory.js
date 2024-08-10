import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { medicalHistory } from "../data/PatientsMedicalHistory";

const PatientsMedicalHistory = () => {
  return (
    <div>

      <div className="w-[800px] mt-2">
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Date</TableColumn>
            <TableColumn>Doctor Name</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody>
            {medicalHistory.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{item.dateOfVisit}</TableCell>
                <TableCell>{item.doctorName}</TableCell>
                <TableCell>
                  <button className="bg-transparent border-2 p-1 rounded-md">Download</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default PatientsMedicalHistory;
