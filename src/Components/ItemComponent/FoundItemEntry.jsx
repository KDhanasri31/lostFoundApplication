import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserId } from '../../Services/LoginService';
import { generateId, saveFoundItem } from '../../Services/FoundItemService';
import './Entry.css';

const FoundItemEntry = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const [foundItem, setFoundItem] = useState({
    foundItemId: "",
    foundItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
    username: "",
    foundDate: new Date(),
    status: false,
  });

  const [newId, setNewId] = useState("");
  const [fdate, setFdate] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    generateId().then(res => setNewId(res.data));
    getUserId().then(res => setUserId(res.data));
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFoundItem(prev => ({ ...prev, [name]: value }));
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!foundItem.foundItemName.trim()) { tempErrors.foundItemName = "Item Name is required"; isValid = false; }
    if (!foundItem.color.trim()) { tempErrors.color = "Item color is required"; isValid = false; }
    if (!foundItem.brand.trim()) { tempErrors.brand = "Item brand is required"; isValid = false; }
    if (!foundItem.category.trim()) { tempErrors.category = "Item category is required"; isValid = false; }
    if (!foundItem.location.trim()) { tempErrors.location = "Found Location is required"; isValid = false; }

    setErrors(tempErrors);
    if (isValid) {
      const updatedItem = { ...foundItem, foundItemId: newId, username: userId, foundDate: fdate };
      saveFoundItem(updatedItem).then(() => setShowSuccess(true));
    }
  };

  const returnBack = () => navigate('/StudentMenu');
  const nextItem = () => navigate('/Dummy/2');
  const handleSuccessOk = () => { setShowSuccess(false); navigate('/StudentMenu'); };

  return (
    <div className="found-item-page">
      {/* Title outside container */}
      <h2 className="form-title">Found Item Form Submission</h2>

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
                <td>Found Item Name</td>
                <td>
                  <input name="foundItemName" value={foundItem.foundItemName} onChange={onChangeHandler} />
                  {errors.foundItemName && <span className="error">{errors.foundItemName}</span>}
                </td>
              </tr>
              <tr>
                <td>Item Category</td>
                <td>
                  <input name="category" value={foundItem.category} onChange={onChangeHandler} />
                  {errors.category && <span className="error">{errors.category}</span>}
                </td>
              </tr>
              <tr>
                <td>Item Color</td>
                <td>
                  <input name="color" value={foundItem.color} onChange={onChangeHandler} />
                  {errors.color && <span className="error">{errors.color}</span>}
                </td>
              </tr>
              <tr>
                <td>Item Brand Name</td>
                <td>
                  <input name="brand" value={foundItem.brand} onChange={onChangeHandler} />
                  {errors.brand && <span className="error">{errors.brand}</span>}
                </td>
              </tr>
              <tr>
                <td>Location Found</td>
                <td>
                  <input name="location" value={foundItem.location} onChange={onChangeHandler} />
                  {errors.location && <span className="error">{errors.location}</span>}
                </td>
              </tr>
              <tr>
                <td>Select Found Date</td>
                <td>
                  <input type="date" value={fdate} onChange={e => setFdate(e.target.value)} />
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
            <h3>Found item form submitted successfully</h3>
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

export default FoundItemEntry;
