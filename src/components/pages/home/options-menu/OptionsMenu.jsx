import { AddTaskButton, Button } from "@/components/design-system/button";


const OptionsMenu = ({ onTaskAdded }) =>{

    return(
        <div className="flex w-full justify-end">
            <AddTaskButton onTaskAdded={onTaskAdded}/>
        </div>
     
    );

}

export default OptionsMenu;