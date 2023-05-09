import './login.css';
import loginImg from '../assets/imgs/login.webp'
import { Navigate } from "react-router-dom";
import React, {useState} from 'react'


function Login() {
    const [name, setName] = useState("");
    const [passw, setPassw] = useState("");

    const checkLogin = () =>{
        if(!name && !passw){
            alert("Fill the blanks")
        }else{
            if(name == 'admin'){
                if(passw == '123login'){
                    <Navigate to="/dashboard" replace={true} />
                }else{
                    alert("wrong password");
                }
            }else{
                alert("This name does not exist. Please try again.")
            }
        }
    }
    const nameChange = (event) => {
        setName(event.target.value);
    }

    const passwChange = (event) => {
        console.log(event.target.value);
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
