// searchParam props
// https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional

import { WeatherDetailView } from "app/components/weather/details/WeatherDetailView";
import { NextPage } from "next";

export type Area = {
  name: string;
  code: string;
};

export type RegionalWeatherForecast = {
  timeDefines: string[];
  weathers: {
    area: Area;
    weatherCodes: string[];
  }[];
};

export const getWeatherDetail = async (
  officeCode: string
): Promise<RegionalWeatherForecast> => {
  const res = await fetch(
    `https://www.jma.go.jp/bosai/forecast/data/forecast/${officeCode}.json`,
    { cache: "no-store" }
  );

  const data = await res.json();

  const forecastDetail: RegionalWeatherForecast = {
    timeDefines: data[0].timeSeries[0].timeDefines,
    weathers: data[0].timeSeries[0].areas.map((areaData: any) => ({
      area: {
        name: areaData.area.name,
        code: areaData.area.code,
      },
      weatherCodes: areaData.weatherCodes,
    })),
  };

  return forecastDetail;
};

interface Props {
  searchParams: { officeCode: string };
}

const Page: NextPage<Props> = async ({ searchParams }) => {
  const data = await getWeatherDetail(searchParams.officeCode);

  return (
    <div>
      <h1>Weather Forecast（地域別）</h1>
      <WeatherDetailView forecast={data} />
    </div>
  );
};

export default Page;
