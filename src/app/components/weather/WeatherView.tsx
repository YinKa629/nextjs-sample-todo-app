"use client";

import { NationalWeatherForecast } from "app/weather/page";
import { WeatherCodes } from "./WeatherCodes";
import Link from "next/link";

type Props = {
  forecasts: NationalWeatherForecast[];
};

export const WeatherView: React.FC<Props> = ({ forecasts }) => {
  return (
    <table>
      <thead>
        <tr className="header">
          <th rowSpan={2}>コード</th>
          <th rowSpan={2}>地域</th>
          <th colSpan={3}>天気</th>
        </tr>
        <tr className="header2">
          {forecasts[0].srf.times.map((time: string, index: number) => (
            <th key={index}>{time.slice(0, 10)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {forecasts.map((item: NationalWeatherForecast) => (
          <tr className="body" key={item.id}>
            <td>
              <Link
                style={{ color: "blue" }}
                href={`/weather/details?officeCode=${item.officeCode}`}
              >
                {item.officeCode}
              </Link>
            </td>
            <td>{item.name}</td>
            {item.srf.weather.map((weather: string, index: number) => (
              <td key={index}>
                {WeatherCodes.find((code) => code.id === weather)?.value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
