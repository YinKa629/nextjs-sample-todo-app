"use client";
import { RegionalWeatherForecast } from "app/weather/details/page";
import { WeatherCodes } from "../WeatherCodes";

type Props = {
  forecast: RegionalWeatherForecast;
};

export const WeatherDetailView: React.FC<Props> = ({ forecast }) => {
  const weathers = forecast.weathers;

  return (
    <table>
      <thead>
        <tr className="header">
          <th rowSpan={2}>コード</th>
          <th rowSpan={2}>地域</th>
          <th colSpan={3}>天気</th>
        </tr>
        <tr className="header2">
          {forecast.timeDefines.map((time: string, index: number) => (
            // eslint-disable-next-line react/jsx-key
            <th key={index}>{time.slice(0, 10)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weathers.map((item, index: number) => (
          // eslint-disable-next-line react/jsx-key
          <tr className="body" key={index}>
            <td>{item.area.code}</td>
            <td>{item.area.name}</td>
            {item.weatherCodes.map((weatherCode: string, index: number) => (
              <td key={index}>
                {WeatherCodes.find((code) => code.id === weatherCode)?.value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
