import React from 'react'
import { useScreen } from '../../hooks/useScreen'

function RegistrationForm({number, handleNumber, handleSubmitNumber, handleSwitch, log}) {
    const numberValid = number.length >=9
    const width = useScreen()
  return (
    <>
        <p className=' italic font-[11px]  mt-2 text-center'>From farm to your doorstep</p>
        <p className=' text-[16px] font-semibold mt-9 text-center mb-3'>Account {log? 'Login':'Registration'}</p>
        <form onSubmit={handleSubmitNumber}>
            <div className=' flex flex-row items-center p-1 rounded-lg gap-2 ' style={{backgroundColor:'rgba(225, 228, 231, 1)'}}>
            <p>+237</p>
            <input type={width < 650? 'number':'text'}  value={number} onChange={handleNumber} placeholder='Enter your phone number' className=' w-full outline-none' style={{backgroundColor:'rgba(225, 228, 231, 1)'}}/>
            </div>
            <div className=' flex justify-center mt-4'><button onClick={handleSubmitNumber} type='submit' disabled={!numberValid} className=' px-4 py-1 rounded-lg' style={{color:'white', cursor:numberValid? 'pointer':'not-allowed', backgroundColor:numberValid? 'rgba(203, 35, 37, 1)':'rgba(158, 42, 43, 0.55)', fontSize:15}}>Send OTP</button></div>
            <p className=' text-center mt-5'>{log? 'New user?':'Already a  user?'} <span><button onClick={handleSwitch} type='button' style={{color:'rgba(203, 35, 37, 1)', border:'none', cursor:'pointer'}}>{log? 'Register':'Login'}</button></span></p>
        </form>
        <div className=' text-[10px] mt-5'>
            <p className=' text-center'>By continuing, you are agree to our</p>
            <p className=' text-center'><span className=' underline'>Term of Service</span> and <span className=' underline'>Privacy Policy</span></p>
        </div>
    </>
  )
}

export default RegistrationForm
