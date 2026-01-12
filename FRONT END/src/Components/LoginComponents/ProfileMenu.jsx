import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, logoutUser } from "../../Services/LoginService";
import "./profilemenu.css";

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUser()
      .then((res) => {
        console.log("ME response:", res.data);
        setUser(res.data);
      })
      .catch((err) => console.error("Unable to fetch user info", err));
  }, []);

  const handleLogout = () => {
    logoutUser().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    });
  };

  const avatarLetter = (user?.personalName || user?.username || "U")
    .charAt(0)
    .toUpperCase();

  return (
    <>
      {/* Avatar */}
      <div className="profile-avatar-fixed" onClick={() => setOpen(!open)}>
        {avatarLetter}
      </div>

      {/* Personal Details Card */}
      {open && (
        <div className="profile-overlay">
          <div className="profile-card">
            <h3 className="profile-title">Personal Details</h3>

            <table className="profile-table">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{user?.personalName}</td>
                </tr>
                <tr>
                  <td>Username</td>
                  <td>{user?.username}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{user?.email}</td>
                </tr>
                <tr>
                  <td>Role</td>
                  <td>{user?.role}</td>
                </tr>
              </tbody>
            </table>

            <button className="profile-logout-btn" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileMenu;
