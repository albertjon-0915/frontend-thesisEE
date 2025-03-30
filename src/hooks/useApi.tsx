import { DataI } from "../interface/index.ts";

function ApiService () {

     const payloadOptionsObj = (method: string, data?: DataI) => {
          return {
               method: method,
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(data),
          };
     };

     const useApi = (endpoint?: string) => {
          return {
               post: async (data?: DataI) => {
                    try {
                         const response = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint ?? ""}`, {
                             ...payloadOptionsObj("POST", data),
                         });

                         if (!response.ok) {
                              throw new Error(`HTTP error! Status: ${response.status}`);
                         }

                         return response.json();
                    } catch (error) {
                         console.error("Error:", error);
                    }
               },
               patch: async (data: DataI) => {
                    try {
                         const response = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint ?? ""}`, {
                             ...payloadOptionsObj("PATCH", data),
                         });

                         if (!response.ok) {
                              throw new Error(`HTTP error! Status: ${response.status}`);
                         }

                         return response.json();
                    } catch (error) {
                         console.error("Error:", error);
                    }
               },
               get: async () => {
                    try {
                         const response = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint ?? ""}`);

                         if (!response.ok) {
                              throw new Error(`HTTP error! Status: ${response.status}`);
                         }

                         return response.json();
                    } catch (error) {
                         console.error("Error:", error);
                    }
               },
          };
     };

     return {useApi};
}

export default ApiService ;
