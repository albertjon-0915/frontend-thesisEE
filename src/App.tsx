import "./App.css";
import AccordionComponent, { FullDataI } from "./components/Accordion";
import MyCard, { CardsI } from "./components/Card";
import useFetchAllData from "./hooks/useFetchAllData";
import { flattenData } from "./utils";
import useFetchCurrentData from "./hooks/useFetchCurrentData";
import { useEffect, useState } from "react";


function App() {
     const { fullData } = useFetchAllData();
     const { currentData } = useFetchCurrentData(); // change depending on which id

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
                    <div className="div4 border rounded p-4 overflow-x-auto overflow-y-scroll">
                         <div className="px-1 p-1 py-2 text-black fs-5">
                              Current clients data
                         </div>
                         <div className="d-flex flex-wrap">
                         {
                        (currentData && currentData.length > 0) ? 
                         currentData.map((item: CardsI) => (
                              <MyCard props={{
                                   voltage: item.voltage,
                                   current: item.current,
                                   espClientId: item.espClientId
                              }} />
                         ))
                         : 
                         <div className="text-center mt-5">Loading ....</div>
                    }
                         </div>
                    </div>
               </div>
          </>
     )
}

export default App;

