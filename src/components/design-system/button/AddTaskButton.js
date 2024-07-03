import AddTask from "../card/add-task/AddTask";
import { Dialog,DialogClose,DialogTrigger,DialogContent,DialogHeader,DialogTitle,DialogDescription } from "../dialog/dialog";
import { Button } from "./button";



const AddTaskButton = ({ onTaskAdded }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
              <Button>Add Task</Button>  
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="flex justify-start items-start">
                    <DialogTitle>Add a task</DialogTitle>
                    <DialogDescription>{""}</DialogDescription>
                    <AddTask onTaskAdded={onTaskAdded}/>
                    
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default AddTaskButton;