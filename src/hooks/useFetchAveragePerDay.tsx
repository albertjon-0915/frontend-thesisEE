import { useCallback, useEffect, useState } from "react";
import ApiService from "./useApi";

export interface PerDayAvgI {
     date: string
     avgVoltage: number
     avgCurrent: number,
     clients?: string[]
}

function useFetchAveragePerDay() {
     const { useApi } = ApiService();
     const [dataAvgPerDay, setDataAvgPerDay] = useState<PerDayAvgI[] | null>(null);

     const fetchByIdAvg = useCallback(async () => {
          const api = useApi(`EE/client-avg/monthly`); 
          const resp = await api.get();

          if (resp) {
                setDataAvgPerDay(resp.averagePerDay);
               return;
          }
     }, [dataAvgPerDay]);

     useEffect(() => {
          fetchByIdAvg();
     }, []);

     return { dataAvgPerDay };
}

export default useFetchAveragePerDay;

