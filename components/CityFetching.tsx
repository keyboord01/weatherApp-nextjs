"use client";

import { Country, City, ICity } from "country-state-city";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { GlobeIcon } from "@heroicons/react/solid";
import { ClipLoader } from "react-spinners";
import { BsSearch } from "react-icons/bs";
import { Subtitle } from "@tremor/react";
import { Spinner, useToast } from "@chakra-ui/react";
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
    latitude: string | null | undefined;
    longitude: string | null | undefined;
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
  const [citiesOptions, setCitiesOptions] = useState<cityOption[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCity, setSelectedCity] = useState<cityOption | null>(null);
  const toast = useToast();

  useEffect(() => {
    if (selectedCountry?.value?.isoCode) {
      const cities = City.getCitiesOfCountry(selectedCountry.value.isoCode) as
        | ICity[]
        | undefined;
      if (cities !== undefined && cities.length > 0) {
        const options = cities.map((city) => ({
          value: {
            name: city.name,
            latitude: city.latitude || "", // Provide a default value if null/undefined
            longitude: city.longitude || "", // Provide a default value if null/undefined
            countryCode: city.countryCode,
            stateCode: city.stateCode,
          },
          label: city.name,
        }));
        setCitiesOptions(options);
      } else {
        setCitiesOptions([]);
      }
    }
  }, [selectedCountry]);

  const handleSelectedCountry = (option: option) => {
    setSelectedCountry(option);
    setSelectedCity(null);
  };

  const handleSelectedCity = (option: cityOption) => {
    setSelectedCity(option);
  };

  const handleClick = () => {
    if (selectedCity) {
      router.push(
        `/location/${selectedCity.value.name}/${selectedCity.value.latitude}/${selectedCity.value.longitude}`
      );
    } else {
      toast({
        title: "Select a city first",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
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
      {selectedCountry?.value?.isoCode && (
        <>
          {citiesOptions.length > 0 ? (
            <div className="space-y-2">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-white">
                  <GlobeIcon className="h-5 w-5 text-white" />
                  <div className="flex flex-row justify-center items-center">
                    <label htmlFor="country">City</label>
                    <h1 className="text-gray-300 text-xs ml-3">
                      (If you can&apos;t find your city, try searching for a
                      district)
                    </h1>
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
                      <Spinner className="w-[14px] h-[14px]" />
                    ) : (
                      <BsSearch size={15} />
                    )}
                  </button>
                </div>
              </div>{" "}
            </div>
          ) : (
            // Display message when no cities are available for the selected country
            <div className="text-white">
              <p>Sorry, This country is not available yet.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CityFetching;
