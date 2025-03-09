import React, { useRef } from 'react';
import './ImportFile.css';

const ImportManualButton: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      console.log('Selected PDF file:', selectedFile);

      const formData = new FormData();
      formData.append('pdf', selectedFile);

      try {
        const response = await fetch("http://localhost:8080/api/warranties2", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        console.log("Server Response:", data);

        if (response.ok) {
          console.log("File upload successful");
          alert('File upload successful');
        } else {
          console.error("File upload failed:", data);
          alert("nu merge pentru ca response.ok.");
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Yese din try');
      }
    } else {
      alert('Please select a valid PDF file.');
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Programmatically trigger the file input
  };

  return (
    <div className="import-manual-container">
      <input
        type="file"
        id="file-upload"
        className="file-input"
        onChange={handleFileChange}
        accept="application/pdf"
        ref={fileInputRef}
      />
      <button className="import-manual-button" onClick={handleButtonClick}>
        Import manual
      </button>
    </div>
  );
};

export default ImportManualButton;