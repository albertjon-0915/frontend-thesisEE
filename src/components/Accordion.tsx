import { VariableSizeList as List, ListChildComponentProps } from 'react-window';
import { useRef, useState, useCallback } from 'react';
import Accordion from 'react-bootstrap/Accordion';

import useFetchAllias from '../hooks/useFetchAllias';
import { FullDataI, ItemI } from '../interface/index';
import {
  computeKiloWattsPerHour,
  formatTimeStampToDate,
  formatTimeStampToDay,
  formatTimeStamptoTime,
} from '../utils';

function AccordionComponent({
  ArrOfData,
  styling,
}: {
  ArrOfData: FullDataI[] | ItemI[];
  styling?: React.CSSProperties;
}) {
  const { nameRef } = useFetchAllias();
  const listRef = useRef<List | null>(null);
  const [openIndex, setOpenIndex] = useState<null | number>(null);

  const getItemSize = useCallback(
    (index: number) => (openIndex === index ? 200 : 100),
    [openIndex]
  );

  const Row: React.FC<ListChildComponentProps> = ({ index, style, data }) => {
    const isOpen = openIndex === index;

     const toggleAccordion = () => {
     const newIndex = isOpen ? null : index;
     setOpenIndex(newIndex);
     
     if (listRef.current) {
     listRef.current.resetAfterIndex(0, true);
     }
     };
     
    return (
      <div style={style}>
        <Accordion activeKey={isOpen ? `${index}` : undefined} className='pe-2'>
          <Accordion.Item style={{ ...styling }} eventKey={`${index}`} key={index}>
            <Accordion.Header onClick={toggleAccordion}>
              <div className="d-flex flex-column">
                <div className="mb-1">{formatTimeStampToDate(data[index].timeStamp)}</div>
                <div className="text-secondary fw-light" style={{ fontSize: '11px' }}>
                  {nameRef?.[data[index].sensorClientId as string] ??
                    `esp32 Client ${data[index].sensorClientId}`}
                </div>
                <div className="text-secondary fw-light" style={{ fontSize: '11px' }}>
                  {formatTimeStampToDay(data[index].timeStamp)}
                </div>
                <div className="text-secondary fw-light" style={{ fontSize: '11px' }}>
                  {formatTimeStamptoTime(data[index].timeStamp)}
                </div>
              </div>
            </Accordion.Header>
            <Accordion.Body style={{ fontSize: '13px' }}>
              <div
                className="d-flex justify-content-between text-secondary mb-1"
                style={{ maxWidth: '10em' }}
              >
                <span>Voltage: </span>
                <span className="fw-medium" style={{ minWidth: '5em', color: '#A96424' }}>
                  {!!data[index]?.voltage && data[index].voltage.toFixed(4)}
                </span>
              </div>
              <div
                className="d-flex justify-content-between text-secondary mb-1"
                style={{ maxWidth: '10em' }}
              >
                <span>Current: </span>
                <span className="fw-medium" style={{ minWidth: '5em', color: '#A96424' }}>
                  {!!data[index]?.current && data[index].current.toFixed(4)}
                </span>
              </div>
              <div
                className="d-flex justify-content-between text-secondary mb-1"
                style={{ maxWidth: '10em' }}
              >
                <span>kWh: </span>
                <span className="fw-medium" style={{ minWidth: '5em', color: '#A96424' }}>
                  {!!data[index]?.voltage &&
                    !!data[index]?.current &&
                    computeKiloWattsPerHour(data[index].voltage, data[index].current, 1).toFixed(4)}
                </span>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    );
  };

  return (
    <List
      ref={listRef}
      height={600}
      itemCount={ArrOfData.length}
      itemSize={getItemSize}
      itemData={ArrOfData}
      width="100%"
      overscanCount={2}
      className="accordion-scrollbar"
    >
      {Row}
    </List>
  );
}

export default AccordionComponent;
