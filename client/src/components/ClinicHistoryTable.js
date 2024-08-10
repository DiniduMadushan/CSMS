import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa6";

import { useMemo, useState } from "react";
import { Clinic } from "../data/clinic";
const ClinicHistoryTable = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;
  const pages = Math.ceil(Clinic.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return Clinic.slice(start, end);
  }, [page, Clinic]);

  const handleShowMore = (patient) => {};

  return (
    <div className="w-[1000px] mt-2 ">
      <div className="flex justify-between p-2">
        <h1 className="text-center mt-2 font-semibold">Clinic History List</h1>
      </div>
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
          <TableColumn>Date of Visit</TableColumn>
          <TableColumn>Doctor Name</TableColumn>
          <TableColumn>Remark</TableColumn>

          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.dateOfVisit}</TableCell>
              <TableCell>{item.doctorName}</TableCell>
              <TableCell>{item.remark}</TableCell>

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
    </div>
  );
};
export default ClinicHistoryTable;
