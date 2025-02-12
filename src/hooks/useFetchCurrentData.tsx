import { useCallback, useEffect, useState } from "react";
import ApiService from "./useApi";
import { CardsI } from "../components/Card";


function useFetchCurrentData() {
     const { useApi } = ApiService();
     const [currentData, setCurrentData] = useState<CardsI[] | null>(null);

     const fetchData = useCallback(async () => {
          const api = useApi(`EE/current/`);
          const resp = await api.get();

          if (resp) {
            setCurrentData(resp.current);
            return;
          }
     }, [currentData]);

     useEffect(() => {
          fetchData();
     }, []);

     return { currentData };
}

export default useFetchCurrentData;
