import { useEffect, useState } from "react";
import { FaMessage, FaUserGear } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import axios from "axios";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
} from "@nextui-org/react";

const DashBordNav = () => {
  const [user, setUser] = useState(null);
  const [idNumber, setIdNumber] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Retrieve the logged-in user
  useEffect(() => {
    const user = localStorage.getItem("authUser");
    if (!user) {
      window.location.href = "/login";
    }
    setUser(JSON.parse(user));
  }, []);

  // Handle search by idNumber
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/admin/search/${idNumber}`); // Update with your backend URL
      setSearchResult({
        type: response.data.type,
        details: response.data.data,
      });
      setError("");
      setIsModalOpen(true); // Open modal on successful search
    } catch (error) {
      setError("No user found with this ID number.");
      setSearchResult(null);
      setIsModalOpen(false); // Ensure modal is closed if there's an error
    }
  };

  return (
    <div>
      <nav className="bg-gray-200 p-2 rounded-lg">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              className="p-2 rounded-lg w-72 h-10"
              placeholder="Search by ID Number"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white px-2 py-1 rounded-lg h-10"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          <div className="flex items-center justify-center gap-10">
            <div className="flex gap-2 items-center text-sm">
              <FaMessage size={16} />
              Messages
            </div>
            <div className="flex gap-2 items-center text-sm">
              <IoIosNotifications size={20} />
              Notifications
            </div>
            <div className="flex items-center gap-5 p-1 px-4">
              <FaUserGear size={20} />
              <div>
                <h1 className="font-semibold">{user?.username}</h1>
                <h2 className="text-gray-700 text-sm">{user?.role}</h2>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Modal for search results */}
      {searchResult && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalContent>
            <ModalHeader>
              {searchResult.type === "patient" ? "Patient Details" : "Staff Member Details"}
            </ModalHeader>
            <ModalBody>
              <table className="table-auto w-full">
                <tbody>
                  {Object.keys(searchResult.details).map((key) => (
                  <tr key={key} className="border-b">
                    <td className="p-2 font-semibold text-gray-700 capitalize">{key}</td>
                    <td className="p-2 text-gray-600">{searchResult.details[key]}</td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </ModalBody>

            <ModalFooter>
              <Button color="primary" onPress={() => setIsModalOpen(false)}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Error message if no user found */}
      {error && <div className="error-message text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default DashBordNav;
