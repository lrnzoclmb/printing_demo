import "./App.css";
import { useState } from "react";
import { storage, db } from './firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as dbRef, push } from "firebase/database";
import { v4 } from "uuid";

function App() {
  const [fileUpload, setFileUpload] = useState(null);

  const uploadFile = () => {
    if (fileUpload == null) return;

    const fileRef = storageRef(storage, `files/${fileUpload.name + v4()}`);
    const databaseRef = dbRef(db, 'uploadedFiles');

    
    uploadBytes(fileRef, fileUpload).then(() => {
      
      getDownloadURL(fileRef).then((downloadURL) => {
        
        const fileData = {
          name: fileUpload.name,
          url: downloadURL,
          timestamp: Date.now(),
        };

        
        push(databaseRef, fileData).then(() => {
          alert("File Uploaded");
        })
        .catch((error) => {
          console.error("Error pushing data to database:", error);
        });
      });
    })
    .catch((error) => {
      console.error("Error uploading file to storage:", error);
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
