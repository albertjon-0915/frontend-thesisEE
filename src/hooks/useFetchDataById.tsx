import { useCallback, useEffect, useState } from "react";
import ApiService from "../utils/useApi";

function useFetchDataById(id: string) {
     const { useApi } = ApiService();
     const [datasById, setDatasById] = useState<Record<string, string>[] | null>(null);

     const fetchDataById = useCallback(async (id: string) => {
          const api = useApi(`EE/client-selections/${id}`); 
          const resp = await api.get();

          if (resp) {
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
