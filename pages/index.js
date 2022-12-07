import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Badge } from "flowbite-react";
import Head from "next/head";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { TbCalendarTime, TbMapPin } from "react-icons/tb";
import InfiniteScroll from "react-infinite-scroller";
import JobCard from "../components/JobCard";
import { Fade, Slide, Zoom } from "react-awesome-reveal";

export default function Home() {
  const initial = [];
  let [isOpen, setIsOpen] = useState(false);
  const [jobs, setJobs] = useState(initial);
  const [searchQuery, setSearchQuery] = useState("Amazon Google");
  const [page, setPage] = useState(0);
  const [ending, setEnding] = useState(false);
  const [initialText, setInitialText] = useState("Browse Jobs");
  const getJobs = async () => {
    const response = await axios
      .get(`/api/search/jobs?q=${searchQuery}&page=${page}`)
      .catch((err) => {
        console.error(err);
      });
    if (response.data) {
      console.log(response.data.jobs);
      setJobs((jobs) => [...jobs, ...response.data.jobs]);
      setPage((prev) => prev + 1);
      if (response.data.jobs.length < 10) {
        setEnding(true);
      }
    }
  };

  const newSearch = async () => {
    setInitialText("Loading...");
    const response = await axios
      .get(`/api/search/jobs?q=${searchQuery}&page=${page}`)
      .catch((err) => {
        console.error(err);
        setJobs([]);
      });
    if (response.data) {
      console.log(response.data.jobs);
      setJobs(response.data.jobs);
      setPage(0);
      setInitialText("Displaying results");
      if (response.data.jobs.length < 10) {
        setEnding(true);
      }
      if (response.data.jobs.length == 0) {
        setEnding(true);
        setInitialText("Couldn't find anything. Search something else.");
      }
    }
  };
  const handleSearch = async () => {
    await newSearch();
  };

  return (
    <main className="flex flex-col justify-start items-center w-full h-[80vh]">
      <Head>
        <title>Regroot - Search</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full flex flex-col justify-start items-center h-[80%] gap-10 mt-12 py-10">
        <div className="flex flex-col items-center gap-4">
          <Fade>
            <Slide direction="down">
              <p className="px-4 text-4xl font-semibold text-center text-white md:text-6xl">
                Your chance to{" "}<br className="md:hidden"/>
                <span>
                  <strike>layoff</strike>{" "}
                </span>
                <span className="text-brand">slayoff</span>
              </p>
            </Slide>

            <p className="px-8 text-sm font-light text-center text-gray-400 md:text-xl">
              Search through 1000s of Tech Jobs and reroot your profession.
            </p>
          </Fade>
        </div>
        <Zoom className="w-full px-5 md:w-1/2">
        <div class="relative w-full">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block p-4 pl-10 w-full text-base md:text-2xl text-white bg-transparent rounded-lg border border-gray-600 focus:ring-brand focus:border-brand "
            placeholder="Eg: Software Engineer jobs in Bengaluru"
            required
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                newSearch();
              }
            }}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <button
            type="button"

            onClick={handleSearch}
            class="text-darktext absolute md:block hidden right-2.5 inset-y-0 my-3 bg-brand hover:bg-blue-800  font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
          
        </div>
        </Zoom>
        <div className="flex flex-col items-center justify-center w-full py-1 md:w-2/3">
          <h1 className="text-xl md:text-2xl pb-4 text-secondarybrand w-[75%]">
            {initialText}
          </h1>
          <InfiniteScroll
            pageStart={0}
            loadMore={getJobs}
            hasMore={!ending}
            initialLoad={true}
            className="flex flex-col items-center w-full gap-5"
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }
          >
            {jobs?.map((job, index) => (
              <JobCard key={index} index={index} job={job} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </main>
  );
}
