import './login.css';
import loginImg from '../assets/imgs/login.webp'
//import { navigate } from "react-router-dom";
import React, {useState, useEffect} from 'react'
import axios from 'axios';


function Login() {
    const [name, setName] = useState("");
    const [passw, setPassw] = useState("");

    const checkLogin = (event) =>{
        event.preventDefault();
        if(!name || !passw){
            alert("Fill the blanks")  //TODO: Sweet alert
        }
        else {
            const postData = {username: name, password: passw};

            axios.post('http://localhost:3000/api/client/login', postData)
            .then(response => {
                console.log("Login Successful");
                //navigate('/dashboard');
            })
            .catch(error => {
                if (error.response.status === 401) {
                    console.log('Unauthorized access');
                }
                else console.error(error);
            });

        }
    }
    const nameChange = (event) => {
        setName(event.target.value);
    }

    const passwChange = (event) => {
        setPassw(event.target.value);
    }
    
    return (
        <>
            <div className="split left">
                <div className="centered">
                    <img style={{width:'100%'}} src={loginImg} />
                </div>
            </div>
            
            <div className="split right">
                <div className="centered">
                    {/* <img src="img_avatar.png" alt="Avatar man"> */}
                    <p>Nice to see you again</p>
                    <h2 style={{color:'purple'}}>Welcome back</h2>
                    <form onSubmit={checkLogin}>
                        <label>
                            <input type="text" name="name" placeholder='Username' onChange={nameChange}/>
                        </label>
                        <label>
                            <input type="password" name="passw" placeholder='Password' onChange={passwChange}/>
                        </label>
                        <input type="submit" value="Login" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
