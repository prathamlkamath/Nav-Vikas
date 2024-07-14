import { useState, useEffect } from "react";
import React from 'react';

function Hi() {
    const [users, setUsers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false); // Assuming you have a way to check if the logged-in user is an admin

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('http://localhost:5000/api/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch user list');
                }
                const data = await response.json();
                setUsers(data);
                
                // Set isAdmin based on your authentication logic
                // This is just a placeholder; replace with actual admin check
                const userRole = "admin"; // Replace this with actual logic to get user role
                setIsAdmin(userRole === "admin");
            } catch (error) {
                console.error('Error fetching user list:', error);
            }
        }

        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            <div className="grid grid-cols-3 gap-4">
                {users.map(user => (
                    <div key={user._id} className="bg-gray-100 p-4 rounded-lg">
                        <h2 className="text-lg font-semibold">Name: {user.name}</h2>
                        <p className="text-gray-600">E-mail: {user.email}</p>
                        {user.role === "admin" && (
                            <p className="text-gray-600">{user.role}</p>
                        )}
                        {isAdmin && (
                            <button
                                onClick={() => handleDeleteUser(user._id)}
                                className="mt-2 bg-red-500 hover:bg-red-700 text-white font-medium py-1 px-2 rounded"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Hi;
