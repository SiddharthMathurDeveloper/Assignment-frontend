"use client"
import { Button } from "../../button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTrigger, DialogTitle } from "../../dialog/dialog";
import { useState } from "react";

const EditTaskDetails = ({ taskId, initialTitle, initialDescription, onUpdate }) => {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
       
        e.preventDefault();
        setIsSubmitting(true);

       
        console.log(title,description )
        try {
            const response = await fetch('http://localhost:8000/update-task', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ taskId, title, description }),
            });

            if (!response.ok) {
                throw new Error('Failed to update task');
            }

            const data = await response.json();
            console.log('Task updated:', data);

            onUpdate(data); // Callback to update the parent component with new data
        } catch (error) {
            console.error('Error updating task:', error);
            // Handle error state or feedback to user
        } finally {
            setIsSubmitting(false);
            window.location.reload();
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Edit</Button>
            </DialogTrigger>
            <DialogContent className="absolute">
                <DialogHeader>
                    <DialogTitle>Edit Task Details</DialogTitle>
                    <DialogDescription>
                        Update the task details and submit to save changes.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Updating...' : 'Update'}
                        </Button>
                        <DialogClose asChild>
                            <Button type="button">Cancel</Button>
                        </DialogClose>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditTaskDetails;
