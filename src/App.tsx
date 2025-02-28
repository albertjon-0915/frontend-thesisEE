import "./App.css";
import { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";

import { Context } from "./ContextProvider";
import { Button } from "react-bootstrap";

import AccordionComponent from "./components/Accordion";
import MyCard from "./components/Card";
import Linegraph from "./components/Linegraph";
import Bargraph from "./components/Bargraph";

import useFetchAllData from "./hooks/useFetchAllData";
// import useFetchCurrentData from "./hooks/useFetchCurrentData";
import useFetchDataAvg from "./hooks/useFetchDataClientAvg";
import useFetchAveragePerDay from "./hooks/useFetchAveragePerDay";

import { flattenData } from "./utils";
import { RealTimeDataI, FullDataI } from "./interface";

import { IoMdRefresh } from "react-icons/io";

import BSU from './assets/BSU.jpg'

const socket = io(import.meta.env.VITE_API_URL);
socket.on('connect', () => {
     console.log('Now connected to id: ', socket.id);
});

function App() {
     const { fullData } = useFetchAllData();
     // const { currentData } = useFetchCurrentData();
     const { dataAvgById } = useFetchDataAvg()
     const { dataAvgPerDay } = useFetchAveragePerDay()

     const [flattenDataArr, setFlattenDataArr] = useState<FullDataI[]>([])
     const [realTimeData, setRealTimeData] = useState<RealTimeDataI[]>([])
     const { reload } = useContext(Context);

     socket.on('raspData', (message: any) => {
          console.log('Received data: ', message);
          if(!!message){
               setRealTimeData(message);
          }
     })

     useEffect(() => {
          if (flattenDataArr.length === 0) {
            const flattenedData = flattenData(fullData as any[]);
            setFlattenDataArr(flattenedData);
          }
     }, [flattenDataArr.length, fullData]); 

     return (
          <>
          <div className="parent">
               <div className="header rounded border">
                    <div className="background"></div>
                    <div style={{ position: 'relative', zIndex: '1' }}>Energy Monitoring System</div>
                    <div className="logo d-none d-xl-block"></div>
               </div>
              <div className="d-flex justify-content-end py-5">
                <Button className="px-5" variant="outline-success" onClick={reload}>
                   <span className="d-flex justify-between gap-lg-2">
                     <IoMdRefresh style={{ marginTop: '5px' }}/>
                    refresh
                   </span>
               </Button>
              </div>

               <div className="bento">
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
                    <div className="div3 p-2 rounded border">
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
                         // TODO: use realtime data ----> realTimeData variable coming from raspberry pi
                         (realTimeData && realTimeData.length > 0) ? 
                              <div className="d-flex flex-wrap">
                                   {realTimeData.map((item: RealTimeDataI, index) => (
                                        <MyCard key={`${item}${index}`} props={{
                                             voltage: item.voltage,
                                             current: item.current,
                                             espClientId: item.espClientId,
                                             hasWarning: item.hasWarning 
                                        }}
                                         />
                                   ))}
                              </div>
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

