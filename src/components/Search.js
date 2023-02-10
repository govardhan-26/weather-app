import React , {useState}  from 'react';
import './Search.css';

function Search() {
    const [City,setCity] = useState('')
    const [Temp,setTemp] = useState(null)
    const [TempValue,setTempValue] = useState(null)
    const [Location, setLocation] = useState({Cityname: '', State: '', Country: ''});
    const [others,setothers] = useState({Humidity:'', Wind :'', Day : ''})
    // const [Locationval, setLocationval] = useState({City: null, State: null, Country: null});

    // const {Cityname, State, Country} = Location;

    // const updateLocation = (update) => setLocaion({ ...Location, ...update});


    let url  = "http://api.weatherapi.com/v1/current.json?key=067d5090e6174afcb15173405232201&aqi=no&q="


        function getdata(event){
            event.preventDefault()
            fetch(url + City)
            .then((response) => {
                return response.json();
            })
            .then((api_data) => {
                setTemp(api_data.current.temp_c);
                setLocation({...Location, Cityname : api_data.location.name, State : api_data.location.region, Country : api_data.location.country});
                setothers({...others, Humidity:api_data.current.humidity, Wind : api_data.current.wind_kph });
                if(api_data.current.is_day === 0)
                {
                    setothers({...others, Day: "Night" , Humidity:api_data.current.humidity, Wind : api_data.current.wind_kph});
                }
                else
                {
                    setothers({...others, Day: "Day",  Humidity:api_data.current.humidity, Wind : api_data.current.wind_kph });
                }
                // console.log(api_data.location.name);
                // console.log(Location.Cityname);

                // console.log(api_data.location.region);
                // console.log(Location.State);
                // console.log(api_data.location.country);
                // console.log(Location.Country);
                console.log(api_data);
                console.log(api_data.current.temp_c);
            })
            // if(Temp != null) {
            //     setTempValue(`Temp : ${Temp}\u00B0C`);
            // }
            // else{
            //     setTempValue('')
            // }
            setTempValue(`Temp : ${Temp}\u00B0C`);

            // setLocationval(`City : ${Location.Cityname} {<br>} State: ${Location.State} {<br>} Country : ${Location.Country}`);

            setCity('');
        }

        function SearchHandler(event)
        {
            setCity(event.target.value)
        }

  return (
        <div className='Search'>
            <div className='upper-con'>
                <div className='searchContainer'>
                    <span className='title'> &nbsp; Weather App &nbsp; </span>
                    <br/> 
                    <form >
                    <input className='searchbar' type="text" value = {City} placeholder="City" onChange={ SearchHandler } />
                    <br/>
                    <button type='submit' className='submit' onClick={ getdata }>  search </button>
                    </form>
                </div>
                <div className='temp'> 
                    {TempValue}
                </div>
            </div> 
            <div className = 'Down-container'>
                <div className='Location'>
                    <h3>Location :</h3>
                    <span>City : {Location.Cityname}</span>   
                    <br/> 
                    <br/>
                    <span>State : {Location.State}</span>    
                    <br/>
                    <br/><t/>
                    <span>Country : {Location.Country}</span>    
                    <br/>
                    <br/>
                </div>
                <div className='others'>
                    <span>Humidity : {others.Humidity}</span>
                    <br/>
                    <br/>
                    <span className='Day'>Day/Night : {others.Day}</span>
                    <br/>
                    <br/>
                    <span className='wind'>Wind : {others.Wind} </span>
                    <br/>
                </div>
            </div>
        </div>
  )
}

export default Search;