import { useCallback, useEffect, useState } from "react";
import ApiService from "../utils/useApi";

function useFetchDataById(id: string) {
     const { useApi } = ApiService();
     const [datasById, setDatasById] = useState<Record<string, string>[] | null>(null);

     const fetchDataById = useCallback(async (id: string) => {
          const api = useApi(`EE/client-selection/${id}`); 
          const resp = await api.get();

          if (resp) {
            console.log(resp.clientData);
               setDatasById(resp.clientData);
               return;
          }
     }, [datasById]);

     useEffect(() => {
          fetchDataById(id);
     }, []);

     return { datasById };
}

export default useFetchDataById;
