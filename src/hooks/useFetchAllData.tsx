import { useCallback, useEffect, useState } from "react";
import ApiService from "../utils/useApi";

function useFetchAllData() {
     const { useApi } = ApiService();
     const [fullData, setFullData] = useState<Record<string, string>[] | null>(null);

     const fetchData = useCallback(async () => {
          const api = useApi("EE/client-selection/1"); // change to "/EE"
          const resp = await api.get();

          if (resp) {
               setFullData(resp.clientData);
               return;
          }
     }, [fullData]);

     useEffect(() => {
          fetchData();
     }, []);

     return { fullData };
}

export default useFetchAllData;
