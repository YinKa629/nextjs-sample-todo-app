"use client";
import { Area, ForecastDetail } from "app/weather/details/page";
import { useEffect, useState } from "react";
import { WeatherCds } from "../WeatherCd";

type Props = {
  forecast: ForecastDetail;
};

export const WeatherDetailView: React.FC<Props> = ({ forecast }) => {
  const areas = forecast.areas;

  return (
    <table>
      <thead>
        <tr className="header">
          <th rowSpan={2}>コード</th>
          <th rowSpan={2}>地域</th>
          <th colSpan={3}>天気</th>
        </tr>
        <tr className="header2">
          {forecast.timeDefines.map((time: string) => (
            // eslint-disable-next-line react/jsx-key
            <th>{time.slice(0, 10)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {areas.map((item) => (
          // eslint-disable-next-line react/jsx-key
          <tr className="body">
            <td>{item.area.code}</td>
            <td>{item.area.name}</td>
            {item.weatherCodes.map((weatherCode: string) => (
              // eslint-disable-next-line react/jsx-key
              <td>
                {WeatherCds.find((codes) => codes.id === weatherCode)?.value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
