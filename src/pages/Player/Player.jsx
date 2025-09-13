import React,{useEffect,useState} from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/asset//back_arrow_icon.png'
import {useNavigate,useParams} from 'react-router-dom'

const Player = () => {

    const {id}=useParams()
    const navigate=useNavigate();

    const [apiData,setApiData]=useState({
        name:"",
        key:"",
        published_at:"",
        typeof:""
    })
    const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTcxY2NlNTk1M2IxMTQ5NGVlM2QxZTg0NDFiMTIwYyIsIm5iZiI6MTc1NzY4MzMxMy44OCwic3ViIjoiNjhjNDFlNzFjY2FiOGI4YzYzZDI2NDI4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Ly0sF1bGrIZu05UEoG4Z-BwyBQLa1vPiZRKJwP2sm-c'
  }
};
useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));
},[])

  return (
    <div className='player'>
        <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}}/>
        <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
        <div className="player-info">
            <p>{apiData.published_at.slice(0,10)}</p>
               <p>{apiData.name}</p>
               <p>{apiData.type}</p>

        </div>
      
    </div>
  )
}

export default Player
