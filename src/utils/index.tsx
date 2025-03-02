import { FullDataI } from "../interface/index";

export const flattenData = (dataCollection: any[]): FullDataI[] => {
          if (dataCollection === null || dataCollection.length === 0) return [];
      
    return dataCollection.flatMap((item: any) => {
      const { timeStamp } = item;
      return item.sensorData.map((sensorItem: any) => ({
              timeStamp: timeStamp,
              sensorClientId: sensorItem.sensorClientId,
              voltage: sensorItem.monitoredData.voltage,
              current: sensorItem.monitoredData.current
      }));
    });
};

export const formatTimeStampToDate = (timeStampString: string) => {
  const date = new Date(timeStampString);
  return date.toLocaleDateString('en-US', {  month: 'long', day: 'numeric', year: 'numeric' });
}

export const formatTimeStampToDay = (timeStampString: string) => {
  const date = new Date(timeStampString);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

export const formatTimeStamptoTime = (timeStampString: string) => {
  const date = new Date(timeStampString);
  return date.toLocaleTimeString('en-US', {  hour: 'numeric', minute: 'numeric' });
}

export const computeKiloWattsPerHour = (voltage: number, current: number, hours: number) => {
  // watt = voltage x current
  // kWh = ( watt x hours ) / 1000
  const watt = voltage * current;
  const kwh = watt * hours / 1000;
  return kwh; 
}