import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@/components/Modal";
import ThemeButton from "@/components/ThemeButton";
import { useAuth } from "@/contexts/auth";

function Profile() {
  const { user, logout } = useAuth();
  const [logoutModal, setLogoutModal] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      {/* Settings */}
      <header className="mb-4">
        <h1 className="text-3xl font-semibold">Settings</h1>
      </header>

      <section className="mb-4">
        <h2 className="text-xl border-b mb-4 pb-2 font-medium">Theme</h2>
        <ThemeButton />
      </section>
      {user && (
        <>
          <section className="mb-4">
            <h2 className="text-xl border-b mb-4 pb-2 font-medium">Account</h2>
            <p>
              <span className="font-semibold">Id:</span> {user.id}
            </p>
            {user.firstName && user.lastName && (
              <p>
                <span className="font-semibold">Name:</span> {user.firstName}{" "}
                {user.lastName}
              </p>
            )}
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold">Joined:</span>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </section>
          <section className="mb-4">
            <h2 className="text-xl border-b mb-4 pb-2 font-medium">Logout</h2>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 transition-colors text-white font-bold py-2 px-4 rounded"
              onClick={() => setLogoutModal(true)}
            >
              Logout
            </button>
            <Modal isOpen={logoutModal} onClose={() => setLogoutModal(false)}>
              <div className="flex flex-col">
                <h1 className="text-xl font-semibold pr-14 mb-6">
                  Are you sure?
                </h1>
                <div className="flex flex-row flex-nowrap">
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex-1 mr-1"
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex-1 ml-1"
                    onClick={() => setLogoutModal(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </Modal>
          </section>
        </>
      )}
    </div>
  );
}
export default Profile;
