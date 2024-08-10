import PatientsList from "../components/PatientsList";
import Layout from "../layout/Layout";
import { Button, Input } from "@nextui-org/react";

const DashboardAddPatient = () => {
  return (
    <Layout>
      <div className="flex w-full justify-center items-center h-[500px]">
        <PatientsList />
      </div>
    </Layout>
  );
};
export default DashboardAddPatient;
