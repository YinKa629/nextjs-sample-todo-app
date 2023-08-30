import { WeatherView } from "app/components/weather/WeatherView";
import { NextPage } from "next";
import { v4 as uuidv4 } from "uuid";

export type NationalWeatherForecast = {
  id: string;
  officeCode: string;
  name: string;
  srf: {
    times: string[];
    weather: string[];
  };
};

export const getWeather = async (): Promise<NationalWeatherForecast[]> => {
  const res = await fetch(
    "https://www.jma.go.jp/bosai/forecast/data/forecast/010000.json",
    { cache: "no-store" }
  );

  const data = await res.json();

  const forecasts: NationalWeatherForecast[] = data.map(
    (item: NationalWeatherForecast) => ({
      id: uuidv4(),
      officeCode: item.officeCode,
      name: item.name,
      srf: {
        times: item.srf.timeSeries[0].timeDefines,
        weather: item.srf.timeSeries[0].areas.weatherCodes,
      },
    })
  );

  return forecasts;
};

const Page: NextPage = async () => {
  const data = await getWeather();

  return (
    <div>
      <h1>Weather Forecast（全国）</h1>
      <WeatherView forecasts={data} />
    </div>
  );
};

export default Page;
