import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useScreen } from '../../hooks/useScreen';
import Language from '../Language/Language';
import Location from '../Location/Location';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axios from 'axios';
import ProfileAvatar from '../Profile/ProfileAvatar';
import Searchbar from '../Searchbar/Searchbar';
import { useRouter } from 'next/navigation';
import CartIcon from '../Cart/CartIcon';

function Navbar() {
    const width = useScreen() 
    const [userLocation, setUserLocation] = useState({input:'', suggestedArr:undefined, selectedLocation:'', showl:false, streetName:'', loadingLocation:false, coords:{longitude:'', latitude:''}}) // The list of suggested location when the user is writing in the field input
    const [coords, setCoord] = useState({longitude:'', latitude:''})
    const [mounted, setHasMounted] = useState(false)
    let localstreetname
    if(typeof window !=='undefined'){
    localstreetname = localStorage.getItem('localstreetname')
    }
    const bgRouter = useRouter()    
    // This function takes the data based on enable location access
    function handleEnableLocation(){
      const success = (pros) =>{
        let coords = pros.coords
        setCoord({...coords,  longitude:coords.longitude, latitude:coords.latitude})
      }
      const fail = (err) => {
        console.warn(err.code, err.message)
      }
      const options = {
        enableHighAccuracy:true,
        timeout:5000,
        maximunAge:0
      }
      navigator.geolocation.getCurrentPosition(success, fail, options)
    }
    //The function select a location from the list.
    
    function handleSelectedLocation(elt){
      setUserLocation({...userLocation, selectedLocation:elt})
       localStorage.setItem('localstreetname', elt)
    }
    //The function cancel a selectedLocation.
    function handleDeselectLocation(){
      setUserLocation({...userLocation, selectedLocation:'', input:''})
    }
    //side effect for location search
    
    useEffect(()=>{
      const searchWord = userLocation.input
      if(searchWord.length){
        axios({url:`https://api.mapbox.com/search/geocode/v6/forward?q=${searchWord}&limit=9&access_token=pk.eyJ1Ijoic3RpdmV0c2EiLCJhIjoiY21hM3Q4azhvMDBtdjJpcXhpaDRtYjB2OCJ9.cAVLQ69PTYp33gHCB6yV1A`, method:'GET'})
        .then((val) => {
          const primaryArr = val.data['features']
          const dataArr = primaryArr.map(elt => elt['properties'].full_address)
          setUserLocation({...userLocation, suggestedArr:dataArr})
        })
        .catch(err => console.log(err))
      }
      else setUserLocation({...userLocation, suggestedArr:undefined})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userLocation.input])
    //open localisation UI
    function handleOpenLocalisationUI(){
      setUserLocation({...userLocation, showl:true})
    }
    //the side effect handle the effect based on enable location access
    useEffect(()=>{
      const {latitude, longitude} = coords
      if(latitude && longitude){
        setUserLocation({...userLocation, loadingLocation:true})
        axios({url:`https://api.mapbox.com/search/geocode/v6/reverse?access_token=pk.eyJ1Ijoic3RpdmV0c2EiLCJhIjoiY21hM3Q4azhvMDBtdjJpcXhpaDRtYjB2OCJ9.cAVLQ69PTYp33gHCB6yV1A&longitude=${longitude}&latitude=${latitude}`, method:'GET'})
        .then((value) => {
          const street = value.data['features'][0]['properties'].full_address
          localStorage.setItem('localstreetname', street)
          setUserLocation({...userLocation, streetName:street, showl:false, loadingLocation:false})

        })
        .catch(err => console.log(err))
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[coords])

  function toTest(){
    bgRouter.push('/filter')
  }
  useEffect(()=>{
    setHasMounted(true)
  },[])
  // Navbar for small screen
  if(width < 1000 && !mounted) return null
  if(width <1000){
    return(
      <div style={{backgroundColor:'rgba(41, 142, 119, 1)'}} className=' text-white w-full pt-2 fixed top-0 z-20'>
        <div className=' flex flex-row items-center gap-3'>
          <Image onClick={()=> bgRouter.push('/')} width={40} height={40} alt='logo de blackgold' src={'https://blackgold-bucket.s3.ap-south-1.amazonaws.com/logo.png'}/>
          <Searchbar/>
          <ProfileAvatar username={false}/>
          <CartIcon title={false}/>
        </div>
        <hr className=' w-full bg-white my-1.5'/>
        <div style={{color:'rgba(255, 255, 255, 1)'}} className=' w-full flex justify-between text-[14px] mt-2 py-2'>
          {localstreetname && <p><LocationOnIcon/>{localstreetname}</p>}
          <button onClick={handleOpenLocalisationUI} className=' border border-none'>{localstreetname ? 'Change' : 'Add'} location</button>
        </div>
        <Location handleDeselectLocation={handleDeselectLocation} handleSelectedLocation={handleSelectedLocation} userLocation={userLocation} setUserLocation={setUserLocation} handleEnableLocation={handleEnableLocation} ></Location>
      </div>
    )
  }
  //Navbar for big screen
  return (
    <div style={{backgroundColor:'rgba(41, 142, 119, 1)'}} className=' text-white w-full px-2 text-[14px] py-1 fixed z-20'>
        <div className=' flex flex-row items-center gap-5'>
          <Image onClick={()=>bgRouter.push('/')} width={50} height={50} alt='logo de blackgold' src={'https://blackgold-bucket.s3.ap-south-1.amazonaws.com/logo.png'}/>
            <p onClick={toTest} className=' text-[24px] font-bold cursor-pointer'>Black Gold</p>
            <Location handleDeselectLocation={handleDeselectLocation} handleSelectedLocation={handleSelectedLocation} userLocation={userLocation} setUserLocation={setUserLocation}  handleEnableLocation={handleEnableLocation}>
              <p>Deliver to </p>
              {localstreetname ? <p className=' cursor-pointer' onClick={handleOpenLocalisationUI}>{localstreetname}</p> :<button onClick={handleOpenLocalisationUI} className=' border border-none cursor-pointer'> Select Location {' '}<KeyboardArrowDownIcon className='text-white'/> </button>}
            </Location>
          <Searchbar/>
          <div className=' flex flex-row gap-6'>
            <Language/>
            <ProfileAvatar/>
            <CartIcon/>
          </div>
        </div>
    </div>
  )
}

export default Navbar