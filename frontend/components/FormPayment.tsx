'use client'

import React, { useState } from 'react'
import axios from 'axios';
import { Input } from './ui/input';
import { Button } from './ui/button';

const FormPayment = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expireMonth, setExpireMonth] = useState('');
    const [expireYear, setExpireYear] = useState('');
    const [cvc, setCvc] = useState('');
    const [holderName, setHolderName] = useState('');
    const [response, setResponse] = useState(null);

    const handlePayment = async () => {
        const paymentCard = {
            cardHolderName: holderName,
            cardNumber: cardNumber,
            expireMonth: expireMonth,
            expireYear: expireYear,
            cvc: cvc,
            registerCard: '0'
        };

        const buyer = {
            id: 'BY789',
            name: 'Efe Görkem',
            surname: 'Ümit',
            gsmNumber: '+905350000000',
            email: 'john.doe@example.com',
            identityNumber: '74300864791',
            lastLoginDate: '2015-10-05 12:43:35',
            registrationDate: '2013-04-21 15:12:09',
            registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
            ip: '85.34.78.112',
            city: 'Istanbul',
            country: 'Turkey',
            zipCode: '34732'
        };

        const shippingAddress = {
            contactName: 'Jane Doe',
            city: 'Istanbul',
            country: 'Turkey',
            address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
            zipCode: '34742'
        };

        const billingAddress = {
            contactName: 'Jane Doe',
            city: 'Istanbul',
            country: 'Turkey',
            address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
            zipCode: '34742'
        };

        const basketItems = [
            {
                id: 'BI101',
                name: 'Binocular',
                category1: 'Collectibles',
                category2: 'Accessories',
                itemType: 'PHYSICAL',
                price: '0.3'
            }
        ];

        const paymentData = {
            price: '0.3',
            paidPrice: '0.3',
            currency: 'TRY',
            basketId: 'B67832',
            paymentCard: paymentCard,
            buyer: buyer,
            shippingAddress: shippingAddress,
            billingAddress: billingAddress,
            basketItems: basketItems
        };

        try {
         
            const response = await axios.post('http://localhost:3001/api/payment', paymentData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setResponse(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };


  return (
    <div className='grid grid-cols-2'>
        <div className='h-screen bg-sky-600 flex flex-col gap-4 items-center
        justify-center'>
            <h1 className='text-3xl text-white'>Ödeme Formu</h1>
            <div className='flex flex-col w-96 gap-3'>
            <Input
                className='flex flex-row'
                    type="text"
                    placeholder="Kart Sahibi"
                    value={holderName}
                    onChange={(e) => setHolderName(e.target.value)}
                />
             <Input
                    type="text"
                    placeholder="Kart Numarası"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                />
               <div className='flex flex-row gap-3'>
               <Input
                    type="text"
                    placeholder="Son Kullanma Ayı"
                    value={expireMonth}
                    onChange={(e) => setExpireMonth(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Son Kullanma Yılı"
                    value={expireYear}
                    onChange={(e) => setExpireYear(e.target.value)}
                />
               </div>

               <Input
                    type="text"
                    placeholder="CVC"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                />
                <Button onClick={handlePayment}>Ödeme Yap</Button>

            
            </div>
        </div>
        <div className='h-screen'>
          {response && (
                <div className='bg-slate-200 border-2 rounded-lg p-10'>
                    <h2>Sonuç:</h2>
                    <pre >{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}

            
        </div>



    </div>
  )
}

export default FormPayment