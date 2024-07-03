'use client'
import React, { useEffect, useState } from 'react';
import TaskCard from '@/components/design-system/card/task-card/TaskCard'; // Adjust the import path as per your file structure
import { ScrollArea } from '@/components/design-system/scroll-area/scroll-area';
import { useAtom } from 'jotai';
import { taskArrayed,filterTaskArrayed } from '@/store/store';



const TaskDisplay = () => {
    const [tasks, setTasks] = useState([]);
    const [taskArr, setTaskArray] = useAtom(taskArrayed);
    const [filterTaskArray, setFilterTaskArray] = useAtom(filterTaskArrayed);

    useEffect(() => {
        fetchTasks(); // Fetch tasks when component mounts
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:8000/tasks'); // Assuming your backend is running on the same server or has CORS enabled
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const tasksData = await response.json();
            
            setTaskArray(tasksData);
            console.log(taskArr);
            setTasks(tasksData);
        } catch (error) {
            console.error('Error fetching tasks: ', error);
            // Handle error
        }
    };

    const handleTaskAdded = () => {
        fetchTasks(); // Refresh tasks after adding a new task
    };

    return (
        <ScrollArea className="w-[350px] rounded-md border p-4">
            <div>
                {(filterTaskArray.length > 0 ? filterTaskArray : taskArr).map((task) => (
                    <TaskCard
                        key={task.id} // Ensure each task has a unique key
                        taskId={task.id}
                        title={task.data.taskData.title}
                        description={task.data.taskData.description}
                        dueDate={task.data.taskData.dueDate}
                    />
                ))}
            </div>
        </ScrollArea>
    );
};

export default TaskDisplay;