"use client";

import { ForecastAll } from "app/weather/page";
import { WeatherCds } from "./WeatherCd";
import styled from "styled-components";
import { useRouter } from "next/navigation";

type Props = {
  forecasts: ForecastAll[];
};

const Link = styled.div`
  display: inline-block;
  margin-top: 10px;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
`;

export const WeatherView: React.FC<Props> = ({ forecasts }) => {
  const router = useRouter();
  const handleLinkClick = (code: string) => {
    router.push(`/weather/details?officeCode=${code}`);
  };

  return (
    <table>
      <thead>
        <tr className="header">
          <th rowSpan={2}>コード</th>
          <th rowSpan={2}>地域</th>
          <th colSpan={3}>天気</th>
        </tr>
        <tr className="header2">
          {forecasts[0].srf.times.map((time: string) => (
            // eslint-disable-next-line react/jsx-key
            <th>{time.slice(0, 10)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {forecasts.map((item: ForecastAll) => (
          <tr className="body" key={item.id}>
            <td>
              <Link
                className="link"
                onClick={() => handleLinkClick(item.officeCode)}
              >
                {item.officeCode}
              </Link>
            </td>
            <td>{item.name}</td>
            {item.srf.weather.map((weather: string) => (
              // eslint-disable-next-line react/jsx-key
              <td>{WeatherCds.find((codes) => codes.id === weather)?.value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
