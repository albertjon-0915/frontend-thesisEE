import { useState } from "react";
import ApiService from "./useApi";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { ScheduleI } from "../interface";

function useFetchSchedule() {
    const { useApi } = ApiService();
    const MySwal = withReactContent(Swal);

    const [scheduleData, setScheduleData] = useState<ScheduleI>({
        relay: '',
        scheduled: false,
    });

    const getSchedule = async () => {
        const api = useApi(`EE/schedule/view`); 
        const resp = await api.get();
        resp && await setScheduleData({
            relay: resp.relay,
            scheduled: resp.scheduled,

        });
    }

    const setSchedule = async (minutes: number) => {
        const payload = { "minutes": minutes }
        const api = useApi(`EE/schedule/update`); 
        const resp = await api.patch(payload);

        if (Number(resp.minutes) > 0) {
            getSchedule()
            // return resp
            return MySwal.fire({
                title: 'Schedule has been updated',
                text: `${resp.message}`,
                icon: 'success',
                confirmButtonText: 'close',
            });
        }
   
     }

    const resetSchedule = async () => {
        const api = useApi(`EE/schedule/reset`); 
        const resp = await api.post();

        if (resp.message === "Schedule has been reset") {
            getSchedule()
            // return resp
            return MySwal.fire({
                title: "Schedule has been reset",
                text: `${resp.message}`,
                icon: 'success',
                confirmButtonText: 'close',
            });
        }
     }
     
     return { setSchedule, resetSchedule, scheduleData, getSchedule };
}

export default useFetchSchedule;
