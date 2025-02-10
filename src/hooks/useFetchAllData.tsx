import { useEffect, useState } from "react";

function useFetchAllData() {
     const [data, setData] = useState<string | null | any>(null);

     const something = async () => {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/EE/client-selection/1`, {
               method: "GET",
               headers: {
                    "Content-Type": "application/json",
               },
          });
          const dataResp = await response.json();

          if (dataResp) {
               setData(data);
               console.log(data);
          }
          return setData("no data");
     };

     useEffect(() => {
          console.log(import.meta.env.VITE_API_URL);
          something();
     }, []);

     return <div>{data}</div>;
}

export default useFetchAllData;
