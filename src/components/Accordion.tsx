import Accordion from "react-bootstrap/Accordion";

export interface itemI {
     voltage: number;
     current: number;
     timeStamp: string;
}

function AccordionComponent({ArrOfData}: { ArrOfData: itemI[] }) {
     return (
          <Accordion>
               {ArrOfData &&
                    ArrOfData.map((item: itemI, index: number) => {
                         return (
                              <Accordion.Item eventKey={`${index}`} key={index}>
                                   <Accordion.Header>{item.timeStamp}</Accordion.Header>
                                   <Accordion.Body>
                                        <div className="text-secondary">
                                             Voltage: <span className="text-primary">{item.voltage}</span>
                                        </div>
                                        <div className="text-secondary">
                                             Current: <span className="text-success">{item.current}</span>
                                        </div>
                                   </Accordion.Body>
                              </Accordion.Item>
                         );
                    })}
               )
          </Accordion>
     );
}

export default AccordionComponent;
