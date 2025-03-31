import { useState } from "react";
import axios from "axios";
const Register = () => {
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [profilphoto, setProfilphoto] = useState("");

    const registerHandler = async () => {
        if (!username) {
            console.error("Enter the Username");
            return;
        }
        if (!phone) {
            console.error("Enter mobile number");
            return;
        }
        if (!password) {
            console.error("Enter the password");
            return;
        }
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:3000/api/auth/register',
                data: {
                    username: username,
                    phone: phone,
                    password: password,
                    profilphoto: profilphoto
                }
            });
            console.log(response);
        }
        catch (error) {
            console.error(error);
        }

    }
    return (
        <>
            <form>
                <input
                    value={username}
                    placeholder="Enter display name"
                    type="String"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <br />
                <input
                    value={phone}
                    placeholder="Enter phone number"
                    type="Number"
                    onChange={(e) => setPhone(e.target.value)}
                />
                <br />
                <br />
                <input
                    value={password}
                    placeholder="Enter your password"
                    type="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <br />
                <input
                    value={profilphoto}
                    placeholder="Select the profile image"
                    type="file"
                    onChange={(e) => setProfilphoto(e.target.value)}
                />
            </form>

            <br />
            <br />
            <br />
            <button
                type="button" onClick={registerHandler}
            />
        </>
    )

}
export default Register;