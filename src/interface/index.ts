export interface RealTimeDataI {
    espClientId: string
    voltage: number
    current: number
    hasWarning?: boolean
}

export interface CardsI {
    espClientId: string
    voltage: number
    current: number
}


export interface ItemI {
     voltage: number;
     current: number;
     timeStamp: string;
}

export interface FullDataI extends ItemI {
     sensorClientId?: string
}

export interface DataI {
    data: string | Record<string, string>[] | { [key: string]: string };
}

export interface PerDayAvgI {
     date: string
     avgVoltage: number
     avgCurrent: number,
     clients?: string[]
}

export interface DataAvgI {
     espClient: string
     voltage: number
     current: number
}

export interface NameI {
     [key: string]: string
}