import { Dialog, Transition } from "@headlessui/react";
import { Modal, Tooltip } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { TbCalendarTime, TbMapPin, TbPin } from "react-icons/tb";
import TimeAgo from "react-timeago";

const JobCard = ({ job }) => {
  return (
    <div class="relative group md:w-[75%] w-[95%]">
      <div class="absolute -inset-0.5 hidden group-hover:block bg-gradient-to-r from-brand to-green-400 rounded-lg blur-md opacity-90 scale-105 -translate-y-1 group-hover:opacity-100 transition-all duration-400 group-hover:duration-300 animate-tilt"></div>
      <div className="relative flex flex-col items-center w-full px-5 py-5 text-white transition duration-200 rounded-lg bg-secondarybg hover:scale-105 hover:cursor-pointer hover:drop-shadow-md">
        <div className="flex flex-row items-center justify-start w-full gap-4 md:gap-4">
          {job?.employer_logo?(
          <div className="flex items-center justify-center w-16 h-16 bg-white shrink-0">
            <img
            className="object-cover w-16 p-1 overflow-hidden "
            src={job.employer_logo?job.employer_logo:"/icon.svg"}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/icon.svg";
              currentTarget.parentElement.classList = "bg-transparent"
            }}
          />
          </div>
          ):<img className="w-14" src="/icon.svg"/>}
          
          <div className="flex flex-col items-start">
            <a href={job.job_apply_link} target="_blank"  rel="noreferrer">
              <p className="text-lg font-normal leading-tight md:font-semibold md:text-2xl hover:text-secondarybrand">
                {job.job_title}
              </p>
            </a>
            <div className="self-start ">
              <h4 className="text-sm font-normal text-left md:text-base md:-mt-1 text-secondarybrand">
                {job.employer_name}
              </h4>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-start w-full gap-5 mt-5">
          <div className="flex flex-row items-center gap-1 text-gray-400">
            <TbCalendarTime />
            <TimeAgo date={job.posted} />
          </div>
          <div className="flex flex-row items-center gap-1 text-gray-400">
            <TbMapPin />
            {job.job_city
              ? `${job.job_city}, ${job.job_country}`
              : `${job.job_country}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
