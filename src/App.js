import "./App.css";
import { useState } from "react";
import { storage, db } from './firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as dbRef, push } from "firebase/database";
import { v4 } from "uuid";

function App() {
  const [fileUpload, setFileUpload] = useState(null);

  const uploadFile = () => {
    if (fileUpload == null) return;

    const fileRef = ref(storage,`files/${fileUpload.name + v4()}`);
    const databaseRef = dbRef(db, 'uploadedFiles');

    // Upload file to storage
    uploadBytes(fileRef, fileUpload).then(() => {
      // Get the download URL of the uploaded file
      getDownloadURL(fileRef).then((downloadURL) => {
        // Save file information to the Realtime Database
        const fileData = {
          name: fileUpload.name,
          url: downloadURL,
          timestamp: Date.now(),
        };

        // Push the fileData to the database
        push(databaseRef, fileData).then(() => {
          alert("File Uploaded");
        });
      });
    });
  };

  return (
    <div className="App">
      <input 
        type="file" 
        onChange={(event) => {
          setFileUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}>Upload File</button>
    </div>
  );
}

export default App;
