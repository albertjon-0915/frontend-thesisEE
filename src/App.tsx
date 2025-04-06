import "./App.css";
import { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";

import { Context } from "./ContextProvider";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';

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
import useFetchSchedule from "./hooks/useFetchSchedule";

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
     const { dataAvgById } = useFetchDataAvg();
     const { dataAvgPerDay } = useFetchAveragePerDay();
     const { scheduleData, getSchedule, setSchedule, resetSchedule } = useFetchSchedule() as any

     const [flattenDataArr, setFlattenDataArr] = useState<FullDataI[]>([])
     const [realTimeData, setRealTimeData] = useState<RealTimeDataI[]>([])
     const { reload, setShowEdit, showEdit } = useContext(Context);

     const [selectedTime, setSelectedTime] = useState("");

     const handleSelect = (eventKey: any) => {
       setSelectedTime(eventKey);
     };

     const handleReset = async() => {
          await resetSchedule()
          setSelectedTime('')
     }

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
     
     useEffect(() => {
     if (scheduleData.relay === '' && !scheduleData.scheduled) {
          getSchedule();
     }
     }, [scheduleData.relay, scheduleData.scheduled]);

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
                              Montly average per day
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
                              Current average per client
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
               <div className="timer">
                    Scheduled on/off
               </div>
               <p className="text-secondary" style={{ fontSize: '0.89em', fontStyle: 'italic' }}>This is where we schedule a timer for turning on/off of the outlet from client 22(kitchen outlet).</p>
               <p className="text-danger" style={{ fontSize: '0.92em'}}>* Note: Toggle the reset schedule button to turn on outlet. This action will also reset the timer set upon the outlet.</p>
                    <InputGroup className="mb-3">
                    <Form.Control
                         placeholder="Enter custom time (mins)"
                         value={selectedTime}
                         onChange={(e) => setSelectedTime(e.target.value)}
                         disabled={scheduleData.scheduled}
                         type="number"
                         min="1"
                    />
                    <SplitButton
                         variant="outline-secondary"
                         title={selectedTime ? `Set Timer: ${selectedTime} mins` : "Select Time"}
                         id="segmented-button-dropdown-1"
                         onSelect={handleSelect}
                         onClick={async () => await setSchedule(selectedTime)}
                         disabled={scheduleData.scheduled}
                         drop="end"
                    >
                         <Dropdown.Item eventKey="20">20 mins</Dropdown.Item>
                         <Dropdown.Item eventKey="40">40 mins</Dropdown.Item>
                         <Dropdown.Item eventKey="60">1 hr</Dropdown.Item>
                         <Dropdown.Item eventKey="120">2 hrs</Dropdown.Item>
                    </SplitButton>
                    </InputGroup>
                    <p>Selected Time: {selectedTime} mins</p>
                    <Button className="mt-5" variant="danger" onClick={handleReset}>
                         Reset Schedule
                    </Button>
               </div>
                         
          </>
     )
}

export default App;

