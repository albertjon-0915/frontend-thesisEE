import { Card } from 'react-bootstrap'
import Radio from '../assets/radio.png'

export interface CardsI {
    voltage: number
    current: number
    espClientId: string
}

function MyCard({props}:{props: CardsI}) {
  return (
    <Card className="border-0 px-1" style={{ background: 'none' }}>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '0.8em'}}><img src={Radio} alt="radio" width={'15px'}/> esp32 Client {props.espClientId}</Card.Subtitle>
        <Card.Text className='fw-light' style={{ fontSize: '0.7em'}}>
          <div>
          Voltage: {props.voltage}
          </div>
          <div>
          current: {props.current}
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default MyCard
