// import { useState } from "react";
import "./App.css";
import useFetchAllData from "./hooks/useFetchAllData";
import useFetchDataById from "./hooks/useFetchDataById";

function App() {
     const { fullData } = useFetchAllData();
     const { datasById } = useFetchDataById("3"); // change depending on which id

     return datasById?.map((item: any, index: number) => (
          <div key={index}>
               <div>{item.voltage}</div>
               <div>{item.current}</div>
               <div>{item.timeStamp}</div>
          </div>
     ));
}

export default App;
