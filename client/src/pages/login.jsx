import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submitHandler = async () => {
        if (!mobileNo) {
            console.error("Enter Mobile Number");
            return;
        }
        if (!password) {
            console.error("Enter Password");
            return;
        }

        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:3000/api/auth/login',
                data: {
                    phone: mobileNo,
                    password: password
                }
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/Chatdashboard');
            }
        } catch (error) {
            console.error("Login Error:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <form>
                <input 
                    type="tel"
                    placeholder="Enter your registered Mobile Number"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                />

                <br/><br/>

                <input
                    type="password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </form>

            <button type="button" onClick={submitHandler}>Login</button>
        </div>
    );
};

export default Login;
