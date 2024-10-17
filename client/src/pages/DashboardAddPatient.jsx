import PatientsList from "../components/PatientsList";
import RegistrarCards from "../components/Registrarcards"
import Layout from "../layout/Layout";
import { Button, Input } from "@nextui-org/react";

const DashboardAddPatient = () => {
  return (
    <Layout>
    <RegistrarCards/>
      <div className="flex w-full justify-center items-center h-[500px]">
        <PatientsList />
      </div>
    </Layout>
  );
};
export default DashboardAddPatient;
