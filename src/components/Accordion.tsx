import useFetchAllias from "../hooks/useFetchAllias";
import Accordion from "react-bootstrap/Accordion";
import { FullDataI, ItemI } from "../interface/index";
import { formatTimeStampToDate, formatTimeStampToDay, formatTimeStamptoTime } from "../utils";

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
                                             <div className="text-secondary fw-light" style={{ fontSize: "12px" }}>
                                                  {nameRef?.[item.sensorClientId as string] ?? `esp32 Client ${item.sensorClientId}`}
                                             </div>
                                             <div className="text-secondary fw-light" style={{ fontSize: "12px" }}>
                                                  {formatTimeStampToDay(item.timeStamp)}
                                             </div>
                                             <div className="text-secondary fw-light" style={{ fontSize: "12px" }}>
                                                  {formatTimeStamptoTime(item.timeStamp)}
                                             </div>
                                        </div>
                                   </Accordion.Header>
                                   <Accordion.Body>
                                        <div className="text-secondary">
                                             Voltage: <span className="fw-medium" style={{ color: '#A96424'}}>{item.voltage.toFixed(4)}</span>
                                        </div>
                                        <div className="text-secondary">
                                             Current: <span className="fw-medium" style={{ color: '#A96424'}}>{item.current.toFixed(4)}</span>
                                        </div>
                                   </Accordion.Body>
                              </Accordion.Item>
                         );
                    })}
          </Accordion>
     );
}

export default AccordionComponent;
