import { useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";

export interface itemI {
     voltage: number;
     current: number;
     timeStamp: string;
}

export interface FullDataI extends itemI {
     sensorClientId?: string
}

function AccordionComponent({ArrOfData, styling}: { ArrOfData: FullDataI[] | itemI[] , styling?: React.CSSProperties }) {
     return (
          <Accordion>
               {ArrOfData &&
                    ArrOfData.map((item: FullDataI, index: number) => {
                         return (
                              <Accordion.Item style={{...styling}}  eventKey={`${index}`} key={index}>
                                   <Accordion.Header>
                                        <div className="d-flex flex-column">
                                             <div>{item.timeStamp}</div>
                                             <div className="text-secondary fw-light" style={{ fontSize: "14px" }}>
                                                  esp32 Client {item.sensorClientId}
                                             </div>
                                        </div>
                                   </Accordion.Header>
                                   <Accordion.Body>
                                        <div className="text-secondary">
                                             Voltage: <span className="text-black fw-medium">{item.voltage}</span>
                                        </div>
                                        <div className="text-secondary">
                                             Current: <span className="text-black fw-medium">{item.current}</span>
                                        </div>
                                   </Accordion.Body>
                              </Accordion.Item>
                         );
                    })}
          </Accordion>
     );
}

export default AccordionComponent;
