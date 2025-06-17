import React, { useState } from "react";
import { useGlobalContextProvider } from "@/app/contextAPI";
import Statistics from "./Statistics";
useGlobalContextProvider;

function MainArea(){
    const { isDark } = useGlobalContextProvider();

    return(
        <div className={`${isDark ? "bg-transparent" : "bg-slate-50"} flex gap-3`}
        >
            <div className = "w-9/12">
        <Statistics/>
            </div>
            {/*<RightSideBar/> In caso qualcuno volesse una colonna a destra?? */}
        </div>
    )
}

export default MainArea;