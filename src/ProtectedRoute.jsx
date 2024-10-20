import {  useNavigate } from "react-router-dom";
import { useState } from "react";

const ProtectedRoute = () => {
    const navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.setItem('jwtToken','');
        navigate('/home');
    }

    const [data,setData]=useState();
    const [error,setError]=useState(null);



    const handleAdmin=()=>{
        console.log(localStorage.getItem('jwtToken'));
        const headers = new Headers();
        headers.append("Authorization", "Bearer " + localStorage.getItem('jwtToken'));

        fetch('http://localhost:8080/api/admin',{
            headers:headers
        }
        )
            .then((res)=>{
                console.log(res.body);
                if(!res.ok){
                    console.log(res);
                    throw Error('could not fetch the data.')
                }
                return res.text();
            })
            .then((data)=>{
                console.log("Fetched successfully!!");
                setData("Fetched successfully!!  "+data);
                console.log(data);
                setError(null);
            })
            .catch(err=>{
                console.log(err);
                if(err.name === 'AbortError'){
                    console.log('fetch aborted')
                }
                else
                setError(err.message);
            })
    }

    const handleUser=()=>{
        console.log(localStorage.getItem('jwtToken'));
        const headers = new Headers();
        headers.append("Authorization", "Bearer " + localStorage.getItem('jwtToken'));
        fetch('http://localhost:8080/api/user',{
            headers:headers
        }
        )
            .then((res)=>{
                console.log(res.body);
                if(!res.ok){
                    console.log(res);
                    throw Error('could not fetch the data.')
                }
                return res.text();
            })
            .then((data)=>{
                console.log("Fetched successfully!!");
                setData("Fetched successfully!!  "+data);
                console.log(data);
                setError(null);
            })
            .catch(err=>{
                console.log(err);
                if(err.name === 'AbortError'){
                    console.log('fetch aborted')
                }
                else
                setError(err.message);
            })
    }

    return ( 
        <div className="Protected">
            This is protected.
            <button onClick={handleLogout}>Logout</button>

            <br />
            <button onClick={handleAdmin}>Click to do Admin task</button>
            <br />
            <button onClick={handleUser}>Click to do user task</button>
            <p>{error}</p>
            <p>{data}</p>
        </div>
     );
}
 
export default ProtectedRoute;