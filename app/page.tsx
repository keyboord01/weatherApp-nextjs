"use client";
import Image from "next/image";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

import CityFetching from "@/components/CityFetching";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-blue-400 to-orange-400 flex flex-col items-center justify-center p-10">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/50 z-[-1]" />

      {/* Content container */}
      <div className="bg-gray-900 bg-opacity-60 p-6 rounded-lg shadow-xl text-white text-center w-full max-w-xl">
        <h1 className="text-4xl font-bold mb-4">Weather App</h1>
        <SubtitleAnimation />
        <Divider />
        <div className="bg-gray-500/20 p-4 rounded-lg mt-6">
          <CityFetching />
        </div>
        <Divider />
        <div className="flex items-center justify-center space-x-8 mt-6">
          <SocialLink
            link="https://www.linkedin.com/in/ahmed-zm/"
            icon={<AiFillLinkedin size={32} className="animate-pulse" />}
          />
          <SocialLink
            link="https://github.com/keyboord01"
            icon={<AiFillGithub size={32} className="animate-pulse" />}
          />
        </div>
      </div>
    </main>
  );
}

function SubtitleAnimation() {
  const sequence = [
    500,
    "Developed by Ahmed Zeyad",
    2000,
    "Powered by Next.js and Tremor",
    2000,
  ];

  return (
    <p className="text-md text-sm text-center text-white">
      <TypeAnimation sequence={sequence} repeat={Infinity} />
    </p>
  );
}

// Custom Divider
function Divider() {
  return <hr className="my-4 border-t border-gray-400" />;
}

// Custom Social Link
function SocialLink({ link, icon }: { link: string; icon: JSX.Element }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {icon}
    </a>
  );
}
