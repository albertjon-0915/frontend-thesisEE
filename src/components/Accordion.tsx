import useFetchAllias from "../hooks/useFetchAllias";
import Accordion from "react-bootstrap/Accordion";
import { FullDataI, ItemI } from "../interface/index";
import { computeKiloWattsPerHour, formatTimeStampToDate, formatTimeStampToDay, formatTimeStamptoTime } from "../utils";

function AccordionComponent({ArrOfData, styling}: { ArrOfData: FullDataI[] | ItemI[] , styling?: React.CSSProperties }) {
     const { nameRef } = useFetchAllias();

     return (
          <Accordion>
               {ArrOfData &&
                    ArrOfData.map((item: FullDataI, index: number) => {
                         return (
                              <Accordion.Item style={{...styling}}  eventKey={`${index}`} key={index}>
                                   <Accordion.Header>
                                        <div className="d-flex flex-column">
                                             <div className="mb-1">{formatTimeStampToDate(item.timeStamp)}</div>
                                             <div className="text-secondary fw-light" style={{ fontSize: "11px" }}>
                                                  {nameRef?.[item.sensorClientId as string] ?? `esp32 Client ${item.sensorClientId}`}
                                             </div>
                                             <div className="text-secondary fw-light" style={{ fontSize: "11px" }}>
                                                  {formatTimeStampToDay(item.timeStamp)}
                                             </div>
                                             <div className="text-secondary fw-light" style={{ fontSize: "11px" }}>
                                                  {formatTimeStamptoTime(item.timeStamp)}
                                             </div>
                                             
                                        </div>
                                   </Accordion.Header>
                                   <Accordion.Body style={{ fontSize: "13px" }}>
                                        <div className="d-flex justify-content-between text-secondary mb-1" style={{ maxWidth: '10em'}}>
                                             <span>Voltage: </span>
                                             <span className="fw-medium" style={{ minWidth: '5em', color: '#A96424'}}>{item.voltage.toFixed(4)}</span>
                                        </div>
                                        <div className="d-flex justify-content-between text-secondary mb-1" style={{ maxWidth: '10em'}}>
                                             <span>Current: </span>
                                             <span className="fw-medium" style={{ minWidth: '5em', color: '#A96424'}}>{item.current.toFixed(4)}</span>
                                        </div>
                                        <div className="d-flex justify-content-between text-secondary mb-1" style={{ maxWidth: '10em'}}>
                                             <span>kWh: </span> 
                                             <span className="fw-medium" style={{ minWidth: '5em', color: '#A96424'}}>
                                                  {computeKiloWattsPerHour(item.voltage, item.current, 1).toFixed(4)}
                                             </span>
                                        </div>
                                   </Accordion.Body>
                              </Accordion.Item>
                         );
                    })}
          </Accordion>
     );
}

export default AccordionComponent;
