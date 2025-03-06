import { useState,useEffect, useCallback } from "react";
import ApiService from "./useApi";
import { NameI } from "../interface";


function useFetchAllias() {
     const { useApi } = ApiService();
     const [nameRef, setNameRef] = useState<Record<string, string> | null>({});
     const [nameSelections, setNameSelections] = useState<string[] | null>([]);

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

     const fetchNameSelections = useCallback(async () => {
          const api = useApi(`name/selection`);
          const resp = await api.get();

          if (resp) {
               setNameSelections(resp.data);
               return;
          }
     }, [nameSelections])

     useEffect(() => {
          fetchDataRef();
          fetchNameSelections();
     }, []);

     return { nameRef, saveAllias, nameSelections };
}

export default useFetchAllias;
