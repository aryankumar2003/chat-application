import { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import selectChat from "./selectChat";

const Sidebar = () => {
    const [allCov, setAllCov] = useState([]);

    const onSelect=()=>{
        
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/convertions/");
                console.log("Response:", response.data);
                setAllCov(response.data || []); // Ensure it's always an array
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); // Call the function inside useEffect
    }, []); // Empty dependency array ensures it runs only once

    return (
        <div>
            {allCov.map((cov, index) => (
                <div key={index} onClick={selectChat(cov.chatId)}>
                    <h1>{cov.name}</h1>
                    <div>{cov.photo}</div>
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
