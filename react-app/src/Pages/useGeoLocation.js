import { useEffect, useState } from "react";

const useGeoLocation = () => {
    const [location,setLocation] = useState({
        loaded:false,
        coordinates:{lat:"",lng:""}
    });

    const onSuccess = location => {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.coords.latitude}&lon=${location.coords.longitude}`;
        fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const add = data.display_name;
            const country = data.address.country;
            const city = data.address.city;
            const zip = data.address.postcode;
            setLocation({
                loaded: true,
                coordinates: {
                    lat: location.coords.latitude,
                    lng: location.coords.longitude,
                },
                add:add,
                country:country,
                city:city,
                zip:zip

            });

           
        })
        .catch(error => {
            console.log(error);
        });
        return location;
    }

    const onError = error => {
        setLocation({
            loaded:true,
            error,
         })
    }

    useEffect(() => {
        if (!("geolocation" in navigator)){
            setLocation(state => ({
                ...state,loaded:true,
                error:{
                    code:0,
                    message:"Geolocation not supported"
                }
            }))
        }
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    },[])

    return location;
}
export default useGeoLocation;