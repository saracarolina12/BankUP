import './transfer.css'
import transferIcon from '../assets/imgs/transaction.png'
import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TransferScreen() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [clientAccount, setClientAccount] = useState('');

  const getClientInfo = (event) => {
    const clientAccountNumber = localStorage.getItem('accountNumber');
    const postData = {account_number:clientAccountNumber};
    axios.post('http://localhost:5000/api/client', postData)
    .then(response => {
      const clientJSON = JSON.stringify(response.data[0]);
      const info = JSON.parse(clientJSON);
      setClientAccount(info.account_number);
      document.getElementById("clientAccount").innerHTML = info.account_number + " $" + info.account_balance;
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

  const AmountChange = (event) => {
    setAmount(event.target.value);
  };

  const AccountNumberChange = (event) => {
    setAccountNumber(event.target.value);
  };

  const validateTransfer = (event) => {
    event.preventDefault();

    if (!amount || !accountNumber) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill the blanks!',
          })
    }
    else {
      if (clientAccount == accountNumber){
        Swal.fire({
          icon: 'error',
          title: 'Enter a different account number!',
          text: 'You can\'t send money to yourself.',
        })
      }
      else{
        const parsedAmount = parseFloat(amount);
        if (parsedAmount < 100 || parsedAmount > 7000) {
            Swal.fire({
                icon: 'error',
                title: 'Amount out of limits!',
                text: 'You can only transfer between $100 and $7000.',
              })
        }
        else{ 
                const postData = {client_account:clientAccount, to_account_number:accountNumber, amount:amount};

                Swal.fire({
                    title: 'Confirm transfer?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.post('http://localhost:5000/api/transfer', postData)
                        .then(response => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Successful transfer!',
                                text: `Transfer of \$${amount} successfully made to the account ${accountNumber}.`,
                            })
                            navigate('/dashboard');
                            setAmount('');
                            setAccountNumber('');
                        })
                        .catch(error => {      
                          if (error.response.status === 401) {
                              Swal.fire({
                                  icon: 'error',
                                  title: 'Invalid account number!',
                                })
                          }
                          else if (error.response.status === 402) {
                              Swal.fire({
                                  icon: 'error',
                                  title: 'Insuficient funds!',
                                })
                          }
                          else{
                              Swal.fire({
                                  icon: 'error',
                                  title: 'Oops...',
                                  text: error,
                                })
                              console.error(error);
                          } 
                        });
                    }
                })
        }
      }
    }
  };

  return (
    <>
    <div onLoad={getClientInfo}>
        <div className='split left'>
            <div className='centered'>
                <img style={{width:'100%'}} src={transferIcon} />
            </div>
        </div>
        
        <div className='split right form'>
            <div className='centered'>
                <h1 className='title1'>Wire Transfer</h1>
                <label id="clientAccount" className='lbl'>
                    None: None
                </label>
                <form onSubmit={validateTransfer}>
                    <label>
                        <input placeholder = 'Account Number' type="number" value={accountNumber} onChange={AccountNumberChange} className='input'/>
                    </label>
                    <br />
                    <label>
                        <input placeholder='Amount' type="number" value={amount} onChange={AmountChange} className='input'/>
                    </label>
                    <br />
                    <button type="submit" className='button'>Confirm</button>
                </form>
            </div>
        </div>
    </div>
    </>
  );
}

export default TransferScreen;
