import { useState,useEffect, useCallback } from "react";
import ApiService from "./useApi";
import { NameI } from "../interface";


function useFetchAllias() {
     const { useApi } = ApiService();
     const [nameRef, setNameRef] = useState<Record<string, string> | null>({});

     const fetchDataRef = useCallback(async () => {
          const api = useApi(`name/`);
          const resp = await api.get();

          if (resp) {
               setNameRef(resp.data);
            return;
          }
     }, [nameRef]);

     const saveAllias = async (payload: NameI) => {
          const api = useApi(`name/save`);
          const resp = await api.post({customName: { 
               ...payload 
               }
          });

          if (resp) {
               alert("Changed name successfully");
               return;
          }
     }

     useEffect(() => {
          fetchDataRef();
     }, []);

     return { nameRef, saveAllias};
}

export default useFetchAllias;
