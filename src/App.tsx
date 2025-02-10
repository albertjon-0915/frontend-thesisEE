// import { useState } from "react";
import "./App.css";
import AccordionComponent, { itemI } from "./components/Accordion";
import useFetchAllData from "./hooks/useFetchAllData";
import useFetchDataById from "./hooks/useFetchDataById";
import useFetchCurrentData from "./hooks/useFetchCurrentData";
import ApiService from "./utils/useApi";
import { useCallback, useEffect, useState } from "react";

function App() {
     const { useApi } = ApiService();
     const { fullData } = useFetchAllData();
     const { datasById } = useFetchDataById("3"); // change depending on which id
     const { currentData } = useFetchCurrentData("3"); // change depending on which id

     const [selections, setSelections] = useState([])

     const transformedData = fullData?.map((item) => ({
          voltage: Number(item.voltage),
          current: Number(item.current),
          timeStamp: item.timeStamp,
     }));

     const selectionsById = useCallback(async () => {
          const api = useApi(`EE/client-selections`);
          const resp = await api.get()

          if(resp){
               setSelections(resp.espClientId)
               return
          }
     }, [])

     useEffect(() => {
          selectionsById()
     }, [])

     // return <AccordionComponent ArrOfData={transformedData as itemI[]} />;
     return <div>{selections}</div>
}

export default App;

/*

<div class="parent">
<div class="div1"> </div>
<div class="div2"> </div>
<div class="div3"> </div>
<div class="div4"> </div>
<div class="div5"> </div>
</div>

.parent {
display: grid;
grid-template-columns: repeat(5, 1fr);
grid-template-rows: repeat(5, 1fr);
grid-column-gap: 16px;
grid-row-gap: 16px;
}

.div1 { grid-area: 1 / 1 / 4 / 4; }
.div2 { grid-area: 1 / 4 / 4 / 6; }
.div3 { grid-area: 4 / 5 / 6 / 6; }
.div4 { grid-area: 4 / 3 / 6 / 5; }
.div5 { grid-area: 4 / 1 / 6 / 3; }
*/
