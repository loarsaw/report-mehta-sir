"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [uid, set_uid] = useState("");
  const router = useRouter();
  return (
    <main className="h-screen flex items-center justify-center w-screen">
      <div className="h-[30rem] flex items-center justify-center flex-col space-y-3 w-[20rem] p-5 bg-gray-300 rounded-md">
        <div className="">
          <img src="/logo.png" className="h-32 w-auto" alt="" />
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-black">Enter your UID</p>
          </div>

          <div className="bg-white p-3 rounded-full">
            <input
              type="text"
              className="bg-transparent text-black focus:outline-none"
              value={uid}
              onChange={(e) => {
                set_uid(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              router.push("/report");
            }}
            className="bg-red-500 p-3 rounded-full"
          >
            Get Report
          </button>
        </div>
      </div>
    </main>
  );
}
