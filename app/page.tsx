"use client";
import Image from "next/image";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

import CityFetching from "@/components/CityFetching";
import { Card, Text, Divider, Subtitle } from "@tremor/react";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  return (
    <main className=" min-h-screen overscroll-none  p-10 flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-blue-400 to-orange-400">
      {/* overlay */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 z-[-1]" />
      {/* background */}

      {/* <Image
        src="https://images.unsplash.com/photo-1583062482795-d2bef78e9bc1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="background"
        fill
        priority
        className="object-cover z-[-2]  "
      /> */}
      <Card className="max-w-2xl mx-auto bg-gray-500/10 border-2 rounded-xl border-[rgba(255,255,255,0.4)] backdrop-blur">
        <Text className="text-white sm:text-6xl text-3xl font-bold text-center mb-10">
          Weather App
        </Text>
        <Subtitle className="sm:text-md text-sm text-center text-white">
          <span>
            <TypeAnimation
              sequence={[
                500,
                "Developed by Ahmed Zeyad",
                2000,
                "Powerd by Next.js 13.3 and Tremor",
                2000,
              ]}
              repeat={Infinity}
            />
          </span>
        </Subtitle>
        <Divider className="my-10" />
        <Card className="bg-gray-500/20">
          {/* CityFetching */}
          <CityFetching />
        </Card>
        <Divider className="my-10" />
        <div className="flex sm:py-8 py-0  items-center justify-evenly">
          <a href="https://www.linkedin.com/in/ahmed-zm/" target="_blank">
            <AiFillLinkedin
              className=" animate-pulse"
              color="white"
              size={48}
            />
          </a>

          <a href="https://github.com/keyboord01" target="_blank">
            <AiFillGithub className=" animate-pulse" color="white" size={48} />
          </a>
        </div>
      </Card>
    </main>
  );
}
