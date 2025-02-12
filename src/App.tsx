import "./App.css";
import { useEffect, useState } from "react";
import AccordionComponent, { FullDataI } from "./components/Accordion";
import MyCard, { CardsI } from "./components/Card";
import useFetchAllData from "./hooks/useFetchAllData";
import { flattenData } from "./utils";
import useFetchCurrentData from "./hooks/useFetchCurrentData";
import useFetchDataAvg from "./hooks/useFetchDataClientAvg";
import useFetchAveragePerDay from "./hooks/useFetchAveragePerDay";
import Linegraph from "./components/Linegraph";
import Bargraph from "./components/Bargraph";

// TODO: refactor for better data fetching

function App() {
     const { fullData } = useFetchAllData();
     const { currentData } = useFetchCurrentData();
     const { dataAvgById } = useFetchDataAvg()
     const { dataAvgPerDay } = useFetchAveragePerDay()

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
                    <div className="div1 p-2 border rounded" >
                         <div className="px-1 p-1 text-black fs-5">
                              Average per day
                         </div>
                         {
                              dataAvgPerDay && dataAvgPerDay.length > 0 ? 
                              <Linegraph dataArr={dataAvgPerDay}/>
                              : 
                              <div className="text-center mt-5">Loading ....</div>
                         }
                    </div>
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
                    <div className="div3 p-2 border-1  rounded border-top border-end">
                         <div className="px-1 p-1 text-black fs-5">
                              Bar Graph
                         </div>
                         {
                              dataAvgById && dataAvgById.length > 0 ? 
                              <Bargraph dataArr={dataAvgById}/>
                              :
                              <div className="text-center mt-5">Loading ....</div>
                         }
                    </div>
                    <div className="div4 border rounded p-4 overflow-x-auto overflow-y-scroll">
                         <div className="px-1 p-1 py-2 text-black fs-5">
                              Current clients data
                         </div>
                         {
                         (currentData && currentData.length > 0) ? 
                              <div className="d-flex flex-wrap">
                                   {currentData.map((item: CardsI) => (
                                        <MyCard props={{
                                             voltage: item.voltage,
                                             current: item.current,
                                             espClientId: item.espClientId
                                        }} />
                                   ))}
                              </div>
                              : 
                              <div className="text-center mt-5">Loading ....</div>
                         }
                    </div>
               </div>
          </>
     )
}

export default App;

