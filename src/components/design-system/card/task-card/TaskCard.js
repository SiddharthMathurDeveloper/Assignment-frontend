"use client"
import { Button } from "../../button";
import { Card, CardTitle, CardHeader, CardContent, CardFooter } from "../card";
import { MdDelete } from "react-icons/md";
import EditTaskDetails from "./EditTaskDetails";
import { useState } from "react";

const TaskCard = ({ title, description, dueDate, taskId }) => {
    const [taskTitle, setTaskTitle] = useState(title);
    const [taskDescription, setTaskDescription] = useState(description);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await fetch('http://localhost:8000/delete-task', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ taskId }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete task');
            }

            const data = await response.json();
            console.log('Task deleted:', data);

            window.location.reload();
        } catch (error) {
            console.error('Error deleting task:', error);
            // Handle error state or feedback to user
        } finally {
            window.location.reload();
            setIsDeleting(false);
        }
    };

    const handleUpdate = (updatedTask) => {
        setTaskTitle(updatedTask.title);
        setTaskDescription(updatedTask.description);
    };

    return (
        <Card>
            <CardHeader>
                <Button variant="ghost" size="icon" onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting ? 'Deleting...' : <MdDelete size={20} />}
                </Button>
                <EditTaskDetails 
                    taskId={taskId} 
                    initialTitle={taskTitle} 
                    initialDescription={taskDescription} 
                    onUpdate={handleUpdate} 
                />
                <CardTitle>{taskTitle}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{taskDescription}</p>
            </CardContent>
            <CardFooter>
                <p className="text-[12px]">{`Due Date : ${dueDate}`}</p>
            </CardFooter>
        </Card>
    );
};

export default TaskCard;