import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getAllLostItems, getLostItemsByUsername } from "../../Services/LostItemService";
//import '../../DisplayView.css';
import { getRole } from "../../Services/LoginService";
import './ReportItem.css';

const LostItemReport = () => {
    let navigate = useNavigate();
    const [lostItems, setLostItems] = useState([]);
    const [role, setRole] = useState("");

    const showLostItems = () => {
        getRole().then((response) => {
            setRole(response.data);
            if (response.data === 'Admin') {
                getAllLostItems().then((res1) => {
                    setLostItems(res1.data);
                });
            } else if (response.data === 'Student') {
                getLostItemsByUsername().then((res2) => {
                    setLostItems(res2.data);
                });
            }
        });
    };

    useEffect(() => {
        showLostItems();
    }, []);

    const returnBack = () => {
        if (role === 'Admin') navigate('/AdminMenu');
        else if (role === 'Student') navigate('/StudentMenu');
    };

    return (
        <div className="page-container">
            <div className="table-card">

                {/* Page Heading */}
                <h2 className="page-title">
                    {role === 'Admin' 
                        ? <>Admin – <span>Lost Item List</span></> 
                        : <>Student – <span>Lost Item List</span></>}
                </h2>

                <hr className="divider" />

                {/* Table */}
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
                                <th>Lost Date</th>
                                <th>User Id</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lostItems.map((item) => (
                                <tr key={item.lostItemId}>
                                    <td>{item.lostItemId}</td>
                                    <td>{item.lostItemName}</td>
                                    <td>{item.category}</td>
                                    <td>{item.color}</td>
                                    <td>{item.brand}</td>
                                    <td>{item.location}</td>
                                    <td>{item.lostDate}</td>
                                    <td>{item.username}</td>
                                    <td>
                                        <span className={item.status ? 'status-returned' : 'status-notfound'}>
                                            {item.status ? 'Found' : 'Not Found'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Return Button */}
                <div className="button-container">
                    <button onClick={returnBack} className="btn-return">
                        Return
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LostItemReport;
