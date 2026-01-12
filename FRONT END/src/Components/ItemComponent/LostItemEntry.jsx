import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getUserId } from '../../Services/LoginService';
import { generateId, saveLostItem } from "../../Services/LostItemService";
import './Entry.css';

const LostItemEntry = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const [lostItem, setLostItem] = useState({
    lostItemId: "",
    lostItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
    username: "",
    lostDate: new Date(),
    status: false,
  });

  const [newId, setNewId] = useState("");
  const [ldate, setLdate] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    generateId().then(res => setNewId(res.data));
    getUserId().then(res => setUserId(res.data));
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setLostItem(prev => ({ ...prev, [name]: value }));
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!lostItem.lostItemName.trim()) { tempErrors.lostItemName = "Item Name is required"; isValid = false; }
    if (!lostItem.color.trim()) { tempErrors.color = "Item color is required"; isValid = false; }
    if (!lostItem.brand.trim()) { tempErrors.brand = "Item brand is required"; isValid = false; }
    if (!lostItem.category.trim()) { tempErrors.category = "Item category is required"; isValid = false; }
    if (!lostItem.location.trim()) { tempErrors.location = "Lost Location is required"; isValid = false; }

    setErrors(tempErrors);
    if (isValid) {
      const updatedItem = { ...lostItem, lostItemId: newId, username: userId, lostDate: ldate };
      saveLostItem(updatedItem).then(() => setShowSuccess(true));
    }
  };

  const returnBack = () => navigate("/StudentMenu");
  const nextItem = () => navigate("/Dummy/1");
  const handleSuccessOk = () => { setShowSuccess(false); navigate('/StudentMenu'); };

  return (
    <div className="found-item-page">
      {/* Title outside container */}
      <h2 className="form-title">Lost Item Form Submission</h2>

      <div className="found-item-form">
        <form onSubmit={handleValidation}>
          <table className="lost-item-table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Input</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Item Id</td>
                <td><input value={newId} readOnly /></td>
              </tr>
              <tr>
                <td>Lost Item Name</td>
                <td>
                  <input name="lostItemName" value={lostItem.lostItemName} onChange={onChangeHandler} />
                  {errors.lostItemName && <span className="error">{errors.lostItemName}</span>}
                </td>
              </tr>
              <tr>
                <td>Item Category</td>
                <td>
                  <input name="category" value={lostItem.category} onChange={onChangeHandler} />
                  {errors.category && <span className="error">{errors.category}</span>}
                </td>
              </tr>
              <tr>
                <td>Item Color</td>
                <td>
                  <input name="color" value={lostItem.color} onChange={onChangeHandler} />
                  {errors.color && <span className="error">{errors.color}</span>}
                </td>
              </tr>
              <tr>
                <td>Item Brand Name</td>
                <td>
                  <input name="brand" value={lostItem.brand} onChange={onChangeHandler} />
                  {errors.brand && <span className="error">{errors.brand}</span>}
                </td>
              </tr>
              <tr>
                <td>Location of Lost Item</td>
                <td>
                  <input name="location" value={lostItem.location} onChange={onChangeHandler} />
                  {errors.location && <span className="error">{errors.location}</span>}
                </td>
              </tr>
              <tr>
                <td>Select Lost Date</td>
                <td>
                  <input type="date" value={ldate} onChange={e => setLdate(e.target.value)} />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="button-group">
            <button type="submit" className="return-btn">Submit</button>
            <button type="button" className="return-btn" onClick={returnBack}>Return</button>
          </div>
        </form>
      </div>

      {showSuccess && (
        <div className="success-overlay">
          <div className="success-card">
            <h3>Lost item form submitted successfully</h3>
            <div className="success-buttons">
              <button className="success-ok-btn" onClick={handleSuccessOk}>OK</button>
              <button className="success-ok-btn" onClick={nextItem}>Next Item Entry</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LostItemEntry;
