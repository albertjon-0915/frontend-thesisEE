import { Card } from 'react-bootstrap'
import useFetchAllias from '../hooks/useFetchAllias.tsx';
import RadioGreen from '../assets/radioGreen.png'
import RadioOrange from '../assets/radioOrange.png'
import { RealTimeDataI } from "../interface/index.ts";
import { computeKiloWattsPerHour } from '../utils';


function MyCard({ props }:{props: RealTimeDataI}) {
  const { nameRef } = useFetchAllias();
  // console.log('props', props.espClientId);
  return (
    <Card className="border-0 px-1" style={{ background: 'none' }}>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '0.8em'}}>
          <img src={props.hasWarning ? RadioOrange : RadioGreen } alt="radio" width={'15px'}/> 
          <span className='ps-1'>
            {nameRef?.[props.espClientId] ?? `esp32 Client ${props.espClientId}`}
          </span>
        </Card.Subtitle>
        <Card.Text className='fw-light d-flex flex-column ms-3 ps-1' style={{ fontSize: '0.7em'}}>
          <span>
          Voltage: { !!props?.voltage && props.voltage.toFixed(4)}
          </span>
          <span>
          current: { !!props?.current && props.current.toFixed(4)}
          </span>
          <span>
          kWh: { !!props?.current && !!props?.current && computeKiloWattsPerHour(props.voltage, props.current, 1).toFixed(4)}
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default MyCard
