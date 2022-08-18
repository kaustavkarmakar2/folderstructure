import React, { useState, useEffect } from "react";
import Accordian from "./../../components/Accordion";
import Axios from "axios";
import DomainUrlAPi from "./../../config/project";

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    Axios.get(`${DomainUrlAPi.SERVER_API_URL}=root`).then(
      (response) => {
        setData(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);
  
  return (
    <div className="App">
      <h1 className="header">Folder</h1>
      <Accordian explorer={data} />
    </div>
  );
}
