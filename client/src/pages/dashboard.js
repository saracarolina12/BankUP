import './dashboard.css';
import loginImg from '../assets/imgs/login.webp'
import { Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import Transactions from '../components/transactions';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';



function Dashboard() {
    const navigate = useNavigate();
    const [currentMoney, setCurrentMoney] = useState("1500.90");
    const [cardData, setCardData] = useState({
        number: '159012385920',
        expiry: '11/2025',
        cvc: '000',
        name: 'Sara Carolina Gómez Delgado',
        focus: '',
    });
    const [currentTransactions, setTransactions] = useState([]);
    const clientAccountNumber = localStorage.getItem('accountNumber');
    

    const getClientInfo = () => { 
        const postData = {account_number:clientAccountNumber};
        axios.post('http://localhost:5000/api/client', postData)
        .then(response => {
          const clientJSON = JSON.stringify(response.data[0]);
          const info = JSON.parse(clientJSON);
          //console.log("Informacion"+info)
          localStorage.setItem('clientInfo', info);
          //setClientAccount(info.account_number);
          setCardData({
            number: info.account_number,
            name: info.name +" "+info.lastname,
            expiry:'',
            cvc: '',
            focus:''
          });

          setCurrentMoney(info.account_balance);

        })
        .catch(error => {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error,
            })
          console.error(error);
        });
      };

    const getTransactions = () => {
        const postData = {client_account:clientAccountNumber};
        axios.post('http://localhost:5000/api/transactions', postData)
        .then(response => {
          const transactionsJSON = JSON.stringify(response.data);
          const info = JSON.parse(transactionsJSON);
          console.log("Transacciones"+transactionsJSON);
          setTransactions(info);
        })
        .catch(error => {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error,
            })
          console.error(error);
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }

    function handleClick() {
        navigate('/transfer');
    }

    useEffect(() => {
        getClientInfo();
        getTransactions();
    }, []);

      
    return(
        <>
            {/* <div className='navbar'></div> */}
            <div className="split left">
                <div className="centered">
                    <h1 style={{color:'#f4f0f5', fontSize:'3rem'}}>Personal Account</h1>
                    <div>
                        <Cards 
                            number={cardData.number}
                            expiry={cardData.expiry}
                            cvc={cardData.cvc}
                            name={cardData.name}
                            focused={cardData.focus}
                        />   
                    </div>
                    <p style={{fontSize:'2rem', color:'#C7C9C9  '}}> ${currentMoney}</p>
                </div>
            </div>
            
            <div className="split right">
                <div className='centered transactions'>
                        <div className='sticky_'><h1 style={{color:'#104B84'}}>Transactions</h1></div>
                        <div className=" container_">

                            {
                                setTransactions.length && 
                                currentTransactions.map((transaction,index) => {
                                    return <div key={index}>
                                        <Transactions account={transaction.To_account_number} status={"done"} date={formatDate(transaction.Time)} descr={ transaction.From_account_number == clientAccountNumber ? "To "+transaction.To_account_number :"From "+transaction.To_account_number} type={ transaction.From_account_number == clientAccountNumber ? "-" : "+"} cant={transaction.quantity}/>
                                    </div>
                                })

                            }
                            
                        </div>
                        &nbsp;
                        <button style={{ marginTop: '2.5rem' }}  onClick={handleClick}>Hacer Transferencia</button>
                </div>
                
            </div>

            

        </>
    )
}

export default Dashboard;