// import { useState } from "react";
// import ApiService from "./useApi";
// import { NameI } from "../interface";


function useFetchCurrentData() {
     // const { useApi } = ApiService();
     // const [nameRef, setNameRef] = useState<Record<string, any> | null>({});
     // const [editNameRef, setEditNameRef] = useState<NameI>({})
     // const fetchDataRef = useCallback(async () => {
     //      const api = useApi(`name/`);
     //      const resp = await api.get();

     //      if (resp) {
     //        setCurrentData(resp.current);
     //        return;
     //      }
     // }, [currentData]);

     // const editNameFunc = useCallback(async (payload: NameI) => {
     //      const api = useApi(`name/save`);
     //      const resp = await api.post();

     //      if (resp) {
     //        setCurrentData(resp.current);
     //        return;
     //      }
     // }, [currentData]);

     // useEffect(() => {
     //      fetchDataRef();
     // }, []);

     // useEffect(() => {
     //      editNameFunc();
     // }, []);

     // return { fetchDataRef, editNameFunc };
}

export default useFetchCurrentData;
