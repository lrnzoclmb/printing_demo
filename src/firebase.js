import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAFT22vxY8L1pXUtBZpm6VUxdjS6IFleRs",
  authDomain: "fileuploading-67153.firebaseapp.com",
  projectId: "fileuploading-67153",
  storageBucket: "fileuploading-67153.appspot.com",
  messagingSenderId: "421584813648",
  appId: "1:421584813648:web:455fea7f8670ab43b09b55"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);