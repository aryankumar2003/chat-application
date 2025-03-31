import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SelectChat = ({ chatId }) => {
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchChat = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/api/chat/${chatId}`);
            setSelected(response.data);
        } catch (error) {
            toast.error("Failed to fetch chat details");
            console.error("Error fetching chat:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!chatId) {
        toast.warning("Please select a chat first");
        return null;
    }

    // Fetch chat data when component mounts or chatId changes
    useEffect(() => {
        fetchChat();
    }, [chatId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {selected && (
                <div>
                    {/* Render your chat details here */}
                    <h2>{selected.name}</h2>
                    {/* Add more chat details as needed */}
                </div>
            )}
        </div>
    );
};

export default SelectChat;