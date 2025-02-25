import { Card } from 'react-bootstrap'
import RadioGreen from '../assets/radioGreen.png'
import RadioOrange from '../assets/radioOrange.png'
import { CardsI } from "../interface/index.ts";


function MyCard({props, hasWarning }:{props: CardsI, hasWarning?: boolean}) {
  return (
    <Card className="border-0 px-1" style={{ background: 'none' }}>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '0.8em'}}><img src={hasWarning ? RadioOrange : RadioGreen } alt="radio" width={'15px'}/> esp32 Client {props.espClientId}</Card.Subtitle>
        <Card.Text className='fw-light d-flex flex-column' style={{ fontSize: '0.7em'}}>
          <span>
          Voltage: {props.voltage}
          </span>
          <span>
          current: {props.current}
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default MyCard
