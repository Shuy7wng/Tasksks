"use client";

import React from "react";
import Sidebar from '../Components/Sidebar';
import Dashboard from "../Components/TopBar/Dashboard";
import { useGlobalContextProvider } from '../contextAPI';

export default function Page() {
    const { isDark } = useGlobalContextProvider();

    return (
        <div
            className={`montserrat flex w-full h-screen ${
                isDark ? "dark-mode" : "light-mode"
            }`}
        >
            <Sidebar />
            <Dashboard /> 
        </div>
    );
}