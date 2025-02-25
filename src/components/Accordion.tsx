import Accordion from "react-bootstrap/Accordion";
import { FullDataI, ItemI } from "../interface/index";

function AccordionComponent({ArrOfData, styling}: { ArrOfData: FullDataI[] | ItemI[] , styling?: React.CSSProperties }) {
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
                                             Voltage: <span className="fw-medium" style={{ color: '#A96424'}}>{item.voltage}</span>
                                        </div>
                                        <div className="text-secondary">
                                             Current: <span className="fw-medium" style={{ color: '#A96424'}}>{item.current}</span>
                                        </div>
                                   </Accordion.Body>
                              </Accordion.Item>
                         );
                    })}
          </Accordion>
     );
}

export default AccordionComponent;
