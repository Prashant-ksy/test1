import { useState } from "react";
import { Link } from "react-router-dom";


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] =useState('ROLE_USER');
    const [error1, setError1] = useState(null);
    const [error2, setError2] = useState(null);
    const [validpswd, setValidpswd] = useState(0);
    const [validUsername, setValidUsername] = useState(null);
    const [success, setSuccess] = useState(null);


    const handlePassword = (e) => {
        let newpass = e.target.value
        setPassword(newpass);
        // var regex1 = /[a-z]/g
        // var regex2 = /[A-Z]/g
        // var regex3 = /[0-9]/g
        // var regex4 = /[!@#\$%\^\&*\)\(+=._-]/g
        // setValidpswd(0);
        // if ((!newpass.match(regex1)) || (!newpass.match(regex2)) || (!newpass.match(regex3)) || (!newpass.match(regex4))) {
        //     setError1("\u2718 Password must contain atleast 1 Uppercase(A-Z),1 Lowercase(a-z),1 Number(0-9),1 Special character.");
        //     setValidpswd(1);
        // }
        // else {
        //     setError1('');
        // }
        // if (newpass.length < 8) {
        //     setError2("\u2718 Password must contain minimum 8 characters.");
        //     setValidpswd(1);

        // }
        // else {
        //     setError2('');
        // }


    }

    const submitRegister = (e) => {

        e.preventDefault();
        const data = { username, password, role };

        const usrnm = "user"; // Your username
        const psswd= "pass";

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        // headers.append("Authorization", "Basic " + btoa(`${usrnm}:${psswd}`));

        fetch('http://localhost:8080/api/register',
            {

                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            })
            .then((res) => {
                if (res.ok) {
                    console.log("Successfully Registered!!");
                    setSuccess("Successfully Registered, Please Login to continue!!");
                    setValidUsername("");
                }
                else {
                    setSuccess("");
                    setValidUsername("Username ID is either invalid or already used.");
                    setUsername('');
                    setPassword('');
                }
            })

    }



    return (

        <div className="Register">

            <h2>Please Register!</h2>
            <div>{validUsername}</div>
            <form onSubmit={submitRegister}>


                <label >Username:</label>
                <input type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />


                <label>Password:</label>
                <input type="text"
                    required
                    value={password}
                    onChange={handlePassword}
                />

                <label>Role:</label>
                <select required value={role} onChange={(e) =>setRole(e.target.value)} >
                    <option value="ROLE_ADMIN">admin</option>
                    <option value="ROLE_USER">user</option>
                </select>

                <button disabled={validpswd} >Register</button>
            </form>
            <div className="passworderror">
                <p>{error1}</p>
                <p>{error2}</p>
            </div>
            <div className="register-success">{success}</div>

            <Link to="/auth/login">Login</Link>
        </div>
    );
}

export default Register;