import "./App.css";
import { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";

import { Context } from "./ContextProvider";
import { Button } from "react-bootstrap";

import Edit from "./assets/edit.png"
import Close from "./assets/close.png"

import AccordionComponent from "./components/Accordion";
import EditAllias from "./components/EditAllias";
import MyCard from "./components/Card";
import Linegraph from "./components/Linegraph";
import Bargraph from "./components/Bargraph";

import useFetchAllData from "./hooks/useFetchAllData";
import useFetchDataAvg from "./hooks/useFetchDataClientAvg";
import useFetchAveragePerDay from "./hooks/useFetchAveragePerDay";

import { flattenData } from "./utils";
import { RealTimeDataI, FullDataI } from "./interface";

import { IoMdRefresh } from "react-icons/io";

const socket = io(import.meta.env.VITE_API_URL, { 
     transports: ['websocket'],  
     pingInterval: 10000, 
     pingTimeout: 5000, 
} as any);

socket.on('connect', () => {
     console.log('Now connected to id: ', socket.id);
});

function App() {
     const { fullData } = useFetchAllData();
     const { dataAvgById } = useFetchDataAvg()
     const { dataAvgPerDay } = useFetchAveragePerDay()

     const [flattenDataArr, setFlattenDataArr] = useState<FullDataI[]>([])
     const [realTimeData, setRealTimeData] = useState<RealTimeDataI[]>([])
     const { reload, setShowEdit, showEdit } = useContext(Context);

     socket.on('raspData', (message: any) => {
          // console.log(message)
          if(!!message){
               setRealTimeData(message);
          }
     })

     const showIsEditView = () => setShowEdit(!showEdit)

     useEffect(() => {
          if (flattenDataArr.length === 0) {
            const flattenedData = flattenData(fullData as any[]);
            setFlattenDataArr(flattenedData);
          }
     }, [flattenDataArr.length, fullData]); 

     const renderCurrentDataOrEdit = () => {
          if (showEdit) {
               return <EditAllias />
          } else {
               return (realTimeData && realTimeData.length > 0) ? 
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
     }

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
                    <div className="position-relative div4 border rounded p-4 overflow-x-auto overflow-y-scroll">
                         <div className="d-flex justify-content-between px-1 p-1 py-2 text-black fs-5">
                              <span>Current clients data</span>
                              <button 
                                   onClick={showIsEditView} 
                                   className="border-0 bg-transparent" 
                                   style={{ marginTop: '-5px'}}
                              >
                                   <img src={showEdit ? Close : Edit} alt="edit" width={'25px'}/>
                              </button>
                         </div>
                         { renderCurrentDataOrEdit() }
                    </div>
               </div>
          </div>

          </>
     )
}

export default App;

