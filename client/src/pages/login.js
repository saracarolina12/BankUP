import './login.css';
import loginImg from '../assets/imgs/login.webp'
import React, {useState} from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


function Login({navigation}) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [passw, setPassw] = useState("");

    const checkLogin = (event) =>{
        event.preventDefault();
        if(!name || !passw){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill the blanks!',
              })
        }
        else {
            const regex = /[^a-z0-9]/i;
            if(name.match(regex)){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Username can only have alphanumeric characters.',
                });
                return;
            }
            if(passw.length < 5){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Password must have at least 5 characters.',
                });
                return;    
            }

            const postData = {username: name, password: passw};
            axios.post('http://localhost:3000/api/client/login', postData)
            .then(response => {
                localStorage.setItem('accountNumber', response.data);
                navigate('/dashboard');
            })
            .catch(error => {
                if (error.response.status === 401) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Wrong credentials!',
                      })
                }
                else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                      })
                    console.error(error);

                } 
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
