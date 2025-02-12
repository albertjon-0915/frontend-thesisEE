// import { useState } from "react";
import "./App.css";
import AccordionComponent, { FullDataI } from "./components/Accordion";
import MyCard from "./components/Card";
import useFetchAllData from "./hooks/useFetchAllData";
import { flattenData } from "./utils";
// import useFetchDataById from "./hooks/useFetchDataById";
// import useFetchCurrentData from "./hooks/useFetchCurrentData";
import { useEffect, useState } from "react";


function App() {
     const { fullData } = useFetchAllData();
     // const { datasById } = useFetchDataById("1"); // change depending on which id
     // const { currentData } = useFetchCurrentData("3"); // change depending on which id

     const [flattenDataArr, setFlattenDataArr] = useState<FullDataI[]>([])

     useEffect(() => {
          if (flattenDataArr.length === 0) {
            const flattenedData = flattenData(fullData as any[]);
            setFlattenDataArr(flattenedData);
          }
     }, [flattenDataArr.length, fullData]); 

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
                    <div className="div3 p-2 border rounded">
                         <div className="px-1 p-1 text-black fs-5">
                              Bar Graph
                         </div>
                    </div>
                    <div className="div4 border rounded p-4">
                    <MyCard props={{    voltage: 2,
                                        current: 3,
                                        espClientId: 'string'}}/>
                         {/* {
                              allCurrentById !== null && allCurrentById.length > 0 ?
                              // <div>asfalsas</div>
                              // allCurrentById.map(item => (
                                   <MyCard props={{    voltage: 2,
                                        current: 3,
                                        espClientId: 'string'}}/>
                              // ))
                               : 
                              <div className="text-center mt-5">Loading ....</div>
                         } */}
                    </div>
               </div>
          </>
     )
}

export default App;

