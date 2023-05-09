import './transactions.css';
import loginImg from '../assets/imgs/login.webp'
import { Navigate, Route, Link} from "react-router-dom";
import { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { useNavigate } from "react-router-dom";
import {AiFillCheckCircle} from 'react-icons/ai'
import {MdPendingActions} from 'react-icons/md'


function Transactions({bank, account, date, descr, status, type, cant}) {
    const navigate = useNavigate();

    const goTo = () =>{
        console.log("click", date);
        navigate("/details", {
            state: {
                bank: bank,
                account: account,
                date: date,
                descr: descr,
                status: status,
                type: type,
                cant: cant,
            }
        });
    }
    
    return (
        <>
            <button className='container' onClick={goTo}>
                <div class="Row">
                    <div class="Column"><p className='number'>{date}</p></div>
                    <div class="Column"><p>{descr}</p></div>
                    <div class="Column">
                            {status == "done" && (
                                <AiFillCheckCircle style={{color:'green'}}/>
                            )}
                            {status == "pending" && (
                                <MdPendingActions style={{color:'#DFC91D'}}/>
                            )}
                    </div>
                    <div class="Column">
                        {type == '-' ? <p className='cant' style={{color:'#b11717'}}>{type}${cant}</p>
                            :
                            <p className='cant' style={{color:'green'}}>{type}${cant}</p>
                        }
                    </div>
                </div>
            </button>
        </>
    )
}

export default Transactions;

