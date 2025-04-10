import React from 'react'
import { useScreen } from '../../hooks/useScreen'
import '../../App.css'
import AnimationSeasonal from './AnimationSeasonal'

function SeasonalPick({imgSeasonal}) {
    const large = useScreen()
  return (
    <div className=' flex justify-center'>
        <div style={{width:'98%'}} className={` w-screen h-58 seasonlinear rounded-lg py-1  mt-2 ${large ? 'px-4' : 'px-1'}`}>
          <div>
              <p style={{fontSize:large?'32px':'25px', fontWeight:'bold'}} >Seasonal Picks</p>
              <p style={{fontSize:large?'16px':'12px'}}>Fresh picks, only for the season!</p>
          </div>
          <div className=' flex justify-between  w-full h-58'>
            <div >
            <button style={{backgroundColor:'rgba(2, 48, 71, 1)', color:'white', position:'relative', top:large?'40px':'80px', left:'6px', marginTop:'30px', paddingLeft:large?'15px':'7px', paddingRight:large?'15px':'7px', paddingTop:'8px', paddingBottom:'8px', borderRadius:'10px', fontSize:large? '16px':'13px', cursor:'pointer'}}>Order now</button>
            </div>
            <AnimationSeasonal imgSeasonal={imgSeasonal}/>
          </div>
        </div>
    </div>
  )
}

export default SeasonalPick
