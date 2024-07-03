"use client"
import { SearchBar } from "@/components/design-system/input";
import OptionsMenu from "./options-menu/OptionsMenu";
import { Separator } from "@/components/design-system/separator/separator";
import TaskDisplay from "./task-display/TaskDisplay";
import { useState } from "react";

const HomeContainer = () =>{
   
    const [tasksUpdated, setTasksUpdated] = useState(false);

    const handleTaskAdded = () => {
        setTasksUpdated(!tasksUpdated); // Toggle state to trigger re-render of TaskDisplay
    };

    return(
        <div className="flex flex-col gap-4 p-5">
            <SearchBar/>

            <OptionsMenu onTaskAdded={handleTaskAdded}/>

            <Separator/>

            <TaskDisplay key={tasksUpdated ? 'updated' : 'initial'} />
        </div>
    )
}

export default HomeContainer;