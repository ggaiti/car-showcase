export async function fetchCars(){
    const headers = {
    'X-RapidAPI-Key': 'ff2d2e1a48msh74812854e021f12p1e1fd9jsn8e1e68aa082b',
    'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }
    const resposnse =  await fetch("https://cars-by-api-ninjas.p.rapidapi.com/v1/cars",{
        headers: headers,
    })
    const result = await resposnse.json();
    return result
}