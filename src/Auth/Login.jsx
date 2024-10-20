import { useState } from 'react';
import { useNavigate, useLocation,Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);


    // Get the redirect path from the query parameters
    const redirectPath = new URLSearchParams(location.search).get('redirect') || '/';

   
    const submitLogin = (e) => {
        e.preventDefault();
        const data = { username, password };
        console.log(data);
        setError("");

        const usrnm = "user"; // Your username
        const psswd= "pass";

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        // headers.append("Authorization", "Basic " + btoa(`${username}:${password}`));


            fetch('http://localhost:8080/api/login',
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            })
            .then((res) => {
                if (res.ok) {
                    console.log(res);
                    console.log("Successfully Logged in");
                    // setToken("loggedin");
                    return res.text();
                }
                else {
                    setUsername("");
                    setPassword("");
                    setError("Invalid username or Password");
                    console.log(error);
                }
            })
            .then((res) => {
                console.log(res);
                // setToken(res);
                localStorage.setItem('jwtToken',res);
                navigate(redirectPath);
            })
            .catch((err) =>{
                console.log(err.message);
            })
    }

    const loginWp = ()=>{
        localStorage.setItem('jwtToken',"success!!!");
        navigate(redirectPath);
    };

    return (
        <div className="Login">
            <form onSubmit={submitLogin}>
            <label >username:</label>
                <input type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Password:</label>
                <input type="text"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="login-error">{error}</div>
                <button>Login</button>
            </form>

            <button onClick={loginWp} className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Login without password</button>
            <Link to="/auth/register">Register</Link>
        </div>
    );
};

export default Login;
