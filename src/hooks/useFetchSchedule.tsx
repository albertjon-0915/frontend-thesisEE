import ApiService from "./useApi";

function useFetchSchedule() {
     const { useApi } = ApiService();

     const setSchedule = async (minutes: number) => {
        const payload = { "minutes": minutes }
        const api = useApi(`EE/schedule/update`); 
        const resp = await api.patch(payload);

        if (resp) return resp
     }

     const resetSchedule = async () => {
        const api = useApi(`EE/schedule/reset`); 
        const resp = await api.post();

        if (resp) return resp
     }
     
     return { setSchedule, resetSchedule };
}

export default useFetchSchedule;
