import { Input } from "./input";
import { useAtom } from 'jotai';
import { taskArrayed, filterTaskArrayed } from '@/store/store';
import { useState } from 'react';

const SearchBar = () => {
    const [taskArr] = useAtom(taskArrayed);
    const [filterTaskArray, setFilterTaskArray] = useAtom(filterTaskArrayed);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Filter the taskArrayed based on the search term
        const filteredTasks = taskArr.filter(task => {
            const { title, description } = task.data.taskData;
            return title.toLowerCase().includes(value.toLowerCase()) ||
                   description.toLowerCase().includes(value.toLowerCase());
        });

        // Update the filtered task array
        setFilterTaskArray(filteredTasks);
        console.log(filteredTasks);
    };

    return (
        <div>
            <Input 
                type="taskSearch" 
                placeholder="Search Task" 
                className="w-[350px]" 
                value={searchTerm}
                onChange={handleSearch}
            />
        </div>
    );
};

export default SearchBar;
