"use client";

import { Country, City } from "country-state-city";
import { useState } from "react";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { GlobeIcon } from "@heroicons/react/solid";
import { ClipLoader } from "react-spinners";
import { BsSearch } from "react-icons/bs";
import { Subtitle } from "@tremor/react";

type option = {
  value: {
    lattitude: string;
    longitude: string;
    isoCode: string;
  };
  label: string;
} | null;

type cityOption = {
  value: {
    name: string;
    latitude: string;
    longitude: string;
    countryCode: string;
    stateCode: string;
  };
  label: string;
} | null;

const options = Country.getAllCountries().map((country) => ({
  value: {
    lattitude: country.latitude,
    longitude: country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name,
}));

function CityFetching() {
  const [selectedCountry, setSelectedCountry] = useState<option>(null);
  const [selectedCity, setSelectedCity] = useState<cityOption>(null);
  //to redirect
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //for handling what the user has selected
  const handleSelectedCountry = (option: option) => {
    setSelectedCountry(option);
    setSelectedCity(null);
  };
  const handleSelectedCity = (option: cityOption) => {
    setSelectedCity(option);
    router.push(
      `/location/${option?.value.name} /${option?.value.latitude}/${option?.value.longitude}`
    );
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    // perform the operation here
    // once the operation is complete, set setLoading(false)
  };
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-white">
          <GlobeIcon className="h-5 w-5 text-white" />
          <label htmlFor="country">Country</label>
        </div>
        <Select
          className="text-black sm:text-md text-xs bg-transparent"
          value={selectedCountry}
          onChange={handleSelectedCountry}
          options={options}
          placeholder="Search for a country..."
          styles={{
            control: (provided) => ({
              ...provided,
              backgroundColor: "transparent",
              borderRadius: "15px",
            }),
            input: (provided) => ({
              ...provided,
              color: "white",
            }),
            placeholder: (provided) => ({
              ...provided,
              color: "lightgray",
            }),
            dropdownIndicator: (provided) => ({
              ...provided,
              color: "white",
            }),
            indicatorSeparator: (provided) => ({
              ...provided,
              backgroundColor: "white",
            }),
            singleValue: (provided) => ({
              ...provided,
              color: "white",
            }),
          }}
        />
      </div>
      {selectedCountry && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-white">
            <GlobeIcon className="h-5 w-5 text-white" />
            <div className="flex flex-row">
              <label htmlFor="country">City</label>
              <Subtitle className="text-gray-300 text-xs ml-3">
                (If you can&apos;t find your city, try searching for a district)
              </Subtitle>
            </div>
          </div>

          <Select
            className="text-black bg-transparent"
            value={selectedCity}
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: "transparent",
                borderRadius: "15px",
              }),
              input: (provided) => ({
                ...provided,
                color: "white",
              }),

              dropdownIndicator: (provided) => ({
                ...provided,
                color: "white",
              }),
              placeholder: (provided) => ({
                ...provided,
                color: "lightgray",
              }),
              indicatorSeparator: (provided) => ({
                ...provided,
                backgroundColor: "white",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "white",
              }),
            }}
            onChange={handleSelectedCity}
            options={City.getCitiesOfCountry(
              selectedCountry.value.isoCode
            )?.map((state) => ({
              value: {
                latitude: state.latitude!,
                longitude: state.longitude!,
                countryCode: state.countryCode,
                name: state.name,
                stateCode: state.stateCode,
              },
              label: state.name,
            }))}
          />
          <div className="flex justify-center pt-3">
            <button
              className="text-gray-100"
              onClick={handleClick}
              disabled={!selectedCity}
            >
              {isLoading ? (
                <Subtitle className="text-gray-300 text-xs">
                  Redirecting...
                </Subtitle>
              ) : (
                <BsSearch size={15} />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CityFetching;
