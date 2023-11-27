import "./App.css";
import { useState } from "react";
import { storage, db } from './firebase';
import { ref, uploadBytes } from "firebase/storage";
import { ref, push } from "firebase/database";
import { v4 } from "uuid";

function App() {
  const [fileUpload, setFileUpload] = useState(null);
  const uploadFile = () => {
    if (fileUpload == null) return;
    const fileRef = ref(storage,`files/${fileUpload.name + v4()}`);
    uploadBytes(fileRef, fileUpload).then(() => {
      alert("File Uploaded");
    });
  };

  return (
  <div className="App">
    <input 
      type="file" 
      onChange={(event) => {
        setFileUpload(event.target.files[0])}}>
      
    </input>
    <button onClick={uploadFile}>Upload File</button>
    </div>
    );
}

export default App;
