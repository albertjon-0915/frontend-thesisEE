import { useCallback, useEffect, useState } from "react";
import ApiService from "./useApi";
import { DataAvgI } from "../interface";

function useFetchDataAvg() {
     const { useApi } = ApiService();
     const [dataAvgById, setDataAvgById] = useState<DataAvgI[] | null>(null);

     const fetchByIdAvg = useCallback(async () => {
          const api = useApi(`EE/client-avg`); 
          const resp = await api.get();

          if (resp) {
               setDataAvgById(resp.clientData);
               return;
          }
     }, [dataAvgById]);

     useEffect(() => {
          fetchByIdAvg();
     }, []);

     return { dataAvgById };
}

export default useFetchDataAvg;
