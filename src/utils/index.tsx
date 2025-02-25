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