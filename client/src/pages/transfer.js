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
        const parsedAmount = parseInt(amount, 10);
        if (parsedAmount < 100 || parsedAmount > 7000) {
            Swal.fire({
                icon: 'error',
                title: 'Amount out of limits!',
                text: 'You can only transfer between $100 and $7000.',
              })
        }
        else{
            const postData = {to_account_number:accountNumber, amount:amount};
            axios.post('http://localhost:3000/api/transfer', postData)
            .then(response => {
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
                    Swal.fire({
                      icon: 'success',
                      title: 'Successful transfer!',
                      text: `Transfer of \$${amount} successfully made to the account ${accountNumber}.`,
                    })
                    navigate('/dashboard');
                    setAmount('');
                    setAccountNumber('');
                  }
                })
            })
            .catch(error => {
                if (error.response.status === 401) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid account number!',
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
  };

  return (
    <>
        <div className='split left'>
            <div className='centered'>
                <img style={{width:'100%'}} src={transferIcon} />
            </div>
        </div>
        
        <div className='split right form'>
            <div className='centered'>
                <h1 className='h1'>Transfer</h1>
                <label>
                    12314654879987: $1567
                    </label>
                <form onSubmit={validateTransfer}>
                    <label>
                        Account number:
                        <input type="number" value={accountNumber} onChange={AccountNumberChange} />
                    </label>
                    <br />
                    <label>
                        Amount:
                        <input type="number" value={amount} onChange={AmountChange} />
                    </label>
                    <br />
                    <button type="submit">Confirm</button>
                </form>
            </div>
        </div>
    </>
  );
}

export default TransferScreen;
