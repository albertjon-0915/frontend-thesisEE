// import { useState } from "react";
import "./App.css";
import AccordionComponent, { itemI } from "./components/Accordion";
import useFetchAllData from "./hooks/useFetchAllData";
import useFetchDataById from "./hooks/useFetchDataById";

function App() {
     const { fullData } = useFetchAllData();
     const { datasById } = useFetchDataById("3"); // change depending on which id

     const transformedData = fullData?.map((item) => ({
          voltage: Number(item.voltage),
          current: Number(item.current),
          timeStamp: item.timeStamp,
     }));

     return <AccordionComponent ArrOfData={transformedData as itemI[]} />;
}

export default App;
