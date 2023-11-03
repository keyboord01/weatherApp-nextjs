import { getClient } from "@/apollo-client";
import CalloutCard from "@/components/CalloutCard";
import HumidityChart from "@/components/HumidityChart.tsx";
import InfoPanel from "@/components/InfoPanel";
import RainChart from "@/components/RainChart";
import StatCard from "@/components/StatCard";
import TempChart from "@/components/TempChart";
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

export const revalidate = 60;

type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  };
};

async function WeatherPage({ params: { city, lat, long } }: Props) {
  const client = getClient();

  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: "true",
      longitude: long,
      latitude: lat,
      timezone: "GMT",
    },
  });

  const results: Root = data.myQuery;

  return (
    <div className="flex flex-col min-h-screen  md:flex-row bg-gray-100 ">
      <InfoPanel city={city} results={results} lat={lat} long={long} />
      <div className="flex-1 p-5 lg:p-10">
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Today&apos;s Overview</h2>
            <p className="text-sm text-gray-400">
              Last Updated On{" "}
              {new Date().toLocaleDateString("en", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              at{" "}
              {new Date().toLocaleTimeString("en", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>

          {/* <div className="m-2 mb-10">
            <CalloutCard message="Test for later{content}" />
          </div> */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
            <StatCard
              title="Maximum Temperature"
              metric={`${results.daily.temperature_2m_max[0].toFixed(1)}°C`}
              color="red"
            />
            <StatCard
              title="Minimum Temperature"
              metric={`${results.daily.temperature_2m_min[0].toFixed(1)}°C`}
              color="blue"
            />
            <div>
              <StatCard
                title="UV Index"
                metric={`${results.daily.uv_index_max[0].toFixed(1)}`}
                color="yellow"
              />
              {Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
                <CalloutCard
                  message={"The UV Index is high, please wear sunscreen"}
                  warning
                />
              )}
            </div>

            <div className="flex space-x-3">
              <StatCard
                title="Wind Speed"
                metric={`${results.current_weather.windspeed.toFixed(1)} m/s`}
                color="cyan"
              />
              <StatCard
                title="Wind Direction"
                metric={`${results.current_weather.winddirection.toFixed(1)} °`}
                color="cyan"
              />
            </div>
          </div>

          <hr className="mb-5" />
          <div className="space-y-3">
            <TempChart results={results} />
            <RainChart results={results} />
            <HumidityChart results={results} />
          </div>
        </div>
        <div className="md:hidden flex  py-14 items-center justify-evenly ">
          <a href="https://www.linkedin.com/in/ahmed-zm/" target="_blank">
            <AiFillLinkedin color="black" size={48} />
          </a>

          <a href="https://github.com/keyboord01" target="_blank">
            <AiFillGithub color="black" size={48} />
          </a>
        </div>
      </div>
      {/* <InfoPanel city={city} results={results} lat={lat} long={long} /> */}
    </div>
  );
}

export default WeatherPage;
