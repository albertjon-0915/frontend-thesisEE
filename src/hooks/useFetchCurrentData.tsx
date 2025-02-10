import { useCallback, useEffect, useState } from "react";
import ApiService from "../utils/useApi";

function useFetchCurrentData(id: string) {
     const { useApi } = ApiService();
     const [currentData, setCurrentData] = useState<Record<string, string>[] | null>(null);

     const fetchData = useCallback(async (id: string) => {
          const api = useApi(`EE/current/${id}`);
          const resp = await api.get();

          if (resp) {
            setCurrentData(resp.clientData);
            return;
          }
     }, [currentData]);

     useEffect(() => {
          fetchData(id);
     }, []);

     return { currentData };
}

export default useFetchCurrentData;
