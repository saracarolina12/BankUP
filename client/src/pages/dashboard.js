import './dashboard.css';
import loginImg from '../assets/imgs/login.webp'
import { Navigate } from "react-router-dom";
import { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import Transactions from '../components/transactions';


function Dashboard() {
    const [currentMoney, setCurrentMoney] = useState("1500.90");
    const [cardData, setCardData] = useState({
        number: '159012385920',
        expiry: '11/2025',
        cvc: '000',
        name: 'Sara Carolina Gómez Delgado',
        focus: '',
    });

    return(
        <>
            {/* <div className='navbar'></div> */}
            <div className="split left">
                <div className="centered">
                    <h1 style={{color:'#f4f0f5', fontSize:'3rem'}}>Personal Card</h1>
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
                            <Transactions account={"**** **** **** 1029"} status={"done"} date={"01 APR 2023"} descr={"Domino's Pizza"} type={"-"} cant={"310.80"}/>
                            <Transactions account={"**** **** **** 9999"} status={"pending"} date={"20 MAR 2023"} descr={"Rent"} type={"-"} cant={"4350.10"}/>
                            <Transactions account={"**** **** **** 1112"} status={"done"} date={"22 MAR 2023"} descr={"Oxxo"} type={"-"} cant={"160.35"}/>
                            <Transactions account={"**** **** **** 0001"} status={"pending"} date={"24 MAR 2023"} descr={"Candy"} type={"+"} cant={"10.62"}/>
                            <Transactions account={"**** **** **** 4545"} status={"done"} date={"01 APR 2023"} descr={"Domino's Pizza"} type={"-"} cant={"310.80"}/>
                            <Transactions account={"**** **** **** 1010"} status={"done"} date={"02 APR 2023"} descr={"Rent"} type={"-"} cant={"4350.34"}/>
                            <Transactions account={"**** **** **** 3399"} status={"done"} date={"02 APR 2023"} descr={"Oxxo"} type={"-"} cant={"160.10"}/>
                            <Transactions account={"**** **** **** 2323"} status={"done"} date={"03 APR 2023"} descr={"Candy"} type={"+"} cant={"64.67"}/>
                            <Transactions account={"**** **** **** 7711"} status={"pending"} date={"03 APR 2023"} descr={"Oxxo"} type={"-"} cant={"160.00"}/>
                            <Transactions account={"**** **** **** 5555"} status={"pending"} date={"03 APR 2023"} descr={"Candy"} type={"+"} cant={"34.10"}/>
                        </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;