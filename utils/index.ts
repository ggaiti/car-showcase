import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;
  const URL = buildUrlString(filters);
  // console.log(URL);
  const headers = {
    "X-RapidAPI-Key": "ff2d2e1a48msh74812854e021f12p1e1fd9jsn8e1e68aa082b",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const resposnse = await fetch(URL, {
    headers: headers,
  });
  const result = await resposnse.json();
  console.log(result);
  return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append("customer", "hrjavascript-mastery");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
};

//Build url using seach options
function buildUrlString(filters: FilterProps) {
  let baseUrl = "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?";

  //Create and array with the key values pairs from the filters object
  const filterList = Object.entries(filters);

  //Loop over list
  //We only add params with values to the base URL
  for (const pair of filterList) {
    //Check if for param has value
    if (pair[1] !== "") {
      //using param key name create correct url param name and at the name and value to base URL
      switch (pair[0]) {
        case "manufacturer":
          baseUrl += `make=${pair[1]}`;
          break;

        case "year":
          baseUrl += `year=${pair[1]}`;
          break;

        case "fuel":
          baseUrl += `fuel_type=${pair[1]}`;
          break;

        case "limit":
          baseUrl += `limit=${pair[1]}`;
          break;

        case "model":
          baseUrl += `model=${pair[1]}`;
          break;

        default:
          console.log("Invalid param check filters");
          break;
      }
      baseUrl += "&";
    }
  }
  //Remove extra & symbol from end of URL
  baseUrl = baseUrl.slice(0, baseUrl.length - 1);
  return baseUrl;
}
