// import { useState } from "react";
import "./App.css";
import AccordionComponent, { itemI } from "./components/Accordion";
import useFetchAllData from "./hooks/useFetchAllData";
import useFetchDataById from "./hooks/useFetchDataById";
import useFetchCurrentData from "./hooks/useFetchCurrentData";
import ApiService from "./utils/useApi";
import { useCallback, useEffect, useState } from "react";

function App() {
     const { useApi } = ApiService();
     const { fullData } = useFetchAllData();
     const { datasById } = useFetchDataById("3"); // change depending on which id
     const { currentData } = useFetchCurrentData("3"); // change depending on which id

     const [selections, setSelections] = useState([])

     const transformedData = fullData?.map((item) => ({
          voltage: Number(item.voltage),
          current: Number(item.current),
          timeStamp: item.timeStamp,
     }));

     const selectionsById = useCallback(async () => {
          const api = useApi(`EE/client-selections`);
          const resp = await api.get()

          if(resp){
               setSelections(resp.espClientId)
               return
          }
     }, [])

     useEffect(() => {
          selectionsById()
     }, [])

     // return <AccordionComponent ArrOfData={transformedData as itemI[]} />;
     return (
          <>
               <div className="parent">
                    <div className="div1"> graph</div>
                    <div className="div2"> list all</div>
                    <div className="div3"> current </div>
                    <div className="div4">list by id </div>
                    <div className="div5">bar graph </div>
               </div>
          </>
     )
}

export default App;

