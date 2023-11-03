import { FiSunrise, FiSunset } from "react-icons/fi";
import Image from "next/image";
import CityFetching from "./CityFetching";
import weatherCodeToSTring from "@/lib/weatherCodeToString";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

type Props = {
  city: string;
  lat: string;
  long: string;
  results: Root;
};

function InfoPanel({ city, lat, long, results }: Props) {
  return (
    <div className="bg-gradient-to-br from-[#41505a] to-[#586f86] text-white p-10">
      <div className="pb-5">
        <h1 className="text-6xl mb-3 font-bold">{decodeURI(city)}</h1>
        <p className="text-xs text-gray-400">
          Long/Lat {long}, {lat}
        </p>
      </div>

      <CityFetching />
      <hr className="my-10" />
      <div className="flex items-center justify-between">
        <div className="">
          <div className="flex items-center justify-between space-x-10">
            <Image
              src={`https://www.weatherbit.io/static/img/icons/${
                weatherCodeToSTring[results.current_weather.weathercode].icon
              }.png`}
              alt={
                weatherCodeToSTring[results.current_weather.weathercode].label
              }
              width={75}
              height={75}
            />

            <p className="text-6xl font-semibold">
              {results.current_weather.temperature.toFixed(1)}°C
            </p>
          </div>
          <p className="text-left font-extralight text-lg">
            {weatherCodeToSTring[results.current_weather.weathercode].label}
          </p>
        </div>
      </div>
      <hr className="my-10" />
      <div className="mt-5 flex items-center justify-between space-x-10 mb-5">
        <div>
          <p className="text-xl">
            {new Date().toLocaleDateString("en", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="font-extralight">
            TimeZone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </p>
        </div>
        <p className="text-xl font-bold uppercase">
          {new Date().toLocaleTimeString("en", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </p>
      </div>

      <div className="md:flex hidden  py-14 items-center justify-evenly ">
        <a href="https://www.linkedin.com/in/ahmed-zm/" target="_blank">
          <AiFillLinkedin
            className="text-gray-400 hover:animate-bounce hover:cursor-pointer"
            size={48}
          />
        </a>

        <a href="https://github.com/keyboord01" target="_blank">
          <AiFillGithub
            className="text-gray-400 hover:animate-bounce hover:cursor-pointer"
            size={48}
          />
        </a>
      </div>
      {/* wrong info */}
      <div className="space-y-2 py-5">
        <div className="flex items-center space-x-2 px-4 py-3 border border-gray-400/40 rounded-md bg-gray-300/30">
          <FiSunrise className="h-8 w-8  " />
          <div className="flex flex-1 justify-between items-center">
            <p>Sunrise</p>
            <p className="uppercase text-xl">
              {new Date(results.daily.sunrise[0]).toLocaleTimeString("en", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 px-4 py-3 border border-gray-400/40 rounded-md bg-gray-300/30">
          <FiSunset className="h-8 w-8 " />
          <div className="flex flex-1 justify-between items-center">
            <p>Sunset</p>
            <p className="uppercase text-xl">
              {new Date(results.daily.sunset[0]).toLocaleTimeString("en", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoPanel;
