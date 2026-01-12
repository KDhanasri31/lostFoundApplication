import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllFoundItems, getFoundItemsByUsername } from "../../Services/FoundItemService";
import { getRole } from "../../Services/LoginService";
import "./ReportItem.css";

const FoundItemReport = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    getRole().then((res) => {
      setRole(res.data);

      if (res.data === "Admin") {
        getAllFoundItems().then(r => setItems(r.data));
      } else {
        getFoundItemsByUsername().then(r => setItems(r.data));
      }
    });
  }, []);

  const returnBack = () => {
    if (role === "Admin") navigate("/AdminMenu");
    else navigate("/StudentMenu");
  };

  return (
    <div className="page-container">
      <div className="table-card">

        <h2 className="page-title">
          {role === "Admin"
            ? <>Admin – <span>Found Item List</span></>
            : <>Student – <span>Found Item List</span></>}
        </h2>

        <hr className="divider" />

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Item Id</th>
                <th>Item Name</th>
                <th>Category</th>
                <th>Color</th>
                <th>Brand</th>
                <th>Location</th>
                <th>Found Date</th>
                <th>User Id</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.foundItemId}>
                  <td>{item.foundItemId}</td>
                  <td>{item.foundItemName}</td>
                  <td>{item.category}</td>
                  <td>{item.color}</td>
                  <td>{item.brand}</td>
                  <td>{item.location}</td>
                  <td>{item.foundDate}</td>
                  <td>{item.username}</td>
                  <td>
                    <span className={item.status ? "status-returned" : "status-notreturned"}>
                      {item.status ? "Returned" : "Not Returned"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="button-container">
          <button onClick={returnBack} className="btn-return">
            Return
          </button>
        </div>

      </div>
    </div>
  );
};

export default FoundItemReport;
