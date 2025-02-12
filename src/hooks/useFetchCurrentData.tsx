import { useCallback, useEffect, useState } from "react";
import ApiService from "./useApi";
import { CardsI } from "../components/Card";

export interface CurrentDataI extends CardsI {
     _id: string;
}

function useFetchCurrentData(id: string) {
     const { useApi } = ApiService();
     const [currentData, setCurrentData] = useState<CurrentDataI | null>(null);

     const fetchData = useCallback(async (id: string) => {
          const api = useApi(`EE/current/${id}`);
          const resp = await api.get();

          if (resp) {
            setCurrentData(resp.currentData);
            return;
          }
     }, [currentData]);

     useEffect(() => {
          fetchData(id);
     }, []);

     return { currentData };
}

export default useFetchCurrentData;
