import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import classes from './ProductCreatePage.module.scss';

interface ErrorResponse {
  detail?: string;
}

const ProductCreatePage: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [userInfo, setUserInfo] = useState<any>({});
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    // Use optional chaining to simplify null check
    const storedUserInfo = localStorage.getItem('userInfo');
    const storedAccessToken = localStorage.getItem('accessToken');
    
    if (storedUserInfo && storedAccessToken) {
      const userInfoData = JSON.parse(storedUserInfo);
      setUserInfo(userInfoData);
      setAccessToken(storedAccessToken);
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
    setSuccessMessage(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('stock', stock.toString());
      formData.append('image', image || '');

      const { data } = await axios.post('/api/product-create/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setSuccessMessage('Product created successfully!');
      setShowModal(true);
      console.log('Product created:', data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        console.error('Error creating product:', axiosError.response?.data?.detail || 'Unknown error');
      } else if (typeof error === 'string') {
        console.error('Error creating product:', error);
      } else {
        console.error('Error creating product:', 'Unknown error');
      }
    }
  };

  const isAdmin = userInfo?.role === 'admin';

  return (
    <div className={classes.formContainer}>
      {isAdmin && (
        <>
          {/* Extract the input fields into a separate function for better readability */}
          {renderFormInputs()}

          <button className={classes.createButton} onClick={() => setShowModal(true)}>
            Create Product
          </button>

          {showModal && (
            <div className={classes.modalOverlay}>
              <div className={classes.modalContent}>
                <button className={classes.closeButton} onClick={closeModal}>
                  Close
                </button>
                <form onSubmit={onSubmit}>
                  {/* Render the form inputs again inside the modal */}
                  {renderFormInputs()}

                  <button className={classes.submitButton} type="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}

          {successMessage && <div className={classes.successMessage}>{successMessage}</div>}
        </>
      )}
      {!isAdmin && <div>You do not have permission to create products.</div>}
    </div>
  );

  // Extract the input fields for better readability
  function renderFormInputs() {
    return (
      <>
        <label className={classes.label}>
          Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className={classes.label}>
          Description: <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label className={classes.label}>
          Price: <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <label className={classes.label}>
          Stock: <input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
        </label>
        <label className={classes.label}>
          Image: <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
        </label>
      </>
    );
  }
};

export default ProductCreatePage;
