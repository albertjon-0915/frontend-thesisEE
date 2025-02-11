// import { useState } from "react";
import "./App.css";
import AccordionComponent, { itemI, FullDataI } from "./components/Accordion";
import useFetchAllData from "./hooks/useFetchAllData";
import useFetchDataById from "./hooks/useFetchDataById";
import useFetchCurrentData from "./hooks/useFetchCurrentData";
import ApiService from "./utils/useApi";
import { useCallback, useEffect, useState } from "react";


function App() {
     const { useApi } = ApiService();
     const { fullData } = useFetchAllData();
     const { datasById } = useFetchDataById("1"); // change depending on which id
     const { currentData } = useFetchCurrentData("3"); // change depending on which id

     const [selections, setSelections] = useState<string[]>([])
     const [flattenDataArr, setFlattenDataArr] = useState<FullDataI[]>([])

     const transformedData = datasById?.map((item) => ({
          voltage: Number(item.voltage),
          current: Number(item.current),
          timeStamp: item.timeStamp,
     }));
     
     const flattenData = (dataCollection: any[]): FullDataI[] => {
          if (dataCollection === null || dataCollection.length === 0) return [];
      
          return dataCollection.flatMap((item: any) => {
            const { timeStamp } = item;
            return item.sensorData.map((sensorItem: any) => ({
              timeStamp: timeStamp,
              sensorClientId: sensorItem.sensorClientId,
              voltage: sensorItem.monitoredData.voltage,
              current: sensorItem.monitoredData.current
            }));
          });
        };
      
        useEffect(() => {
          if (flattenDataArr.length === 0) {
            const flattenedData = flattenData(fullData as any[]);
            setFlattenDataArr(flattenedData); // Proper state update after flattening
          }
        }, [flattenDataArr.length, fullData]); 

     const selectionsById = useCallback(async () => {
          const api = useApi(`EE/client-selections`);
          const resp = await api.get()

          if(resp){
               console.log(resp.espClientId)
               setSelections(resp.espClientId)
               return
          }
     }, [])

     useEffect(() => {
          selectionsById()
     }, [])

     return (
          <>
               <div className="parent">
                    <div className="div1 border rounded" > graph</div>
                    <div className="div2 p-2 border rounded" style={{ overflowX: "hidden", overflowY: "auto"}} >
                         <div className="px-1 p-1 text-black fs-3">
                              All data
                         </div>
                         {
                              flattenDataArr !== null && flattenDataArr.length > 0 ?
                              <AccordionComponent ArrOfData={flattenDataArr} styling={{background: '#eff5ff'}}/>
                               : 
                              <div className="text-center mt-5">Loading ....</div>
                         }
                    </div>
                    {/* <div className="div3">
                         <div className="px-1 p-1 text-black fs-3">
                              Current
                         </div>
                    </div> */}
                    <div className="div3 border rounded">bar graph</div>
                    <div className="div4 border rounded">current by id</div>
               </div>
          </>
     )
}

export default App;

