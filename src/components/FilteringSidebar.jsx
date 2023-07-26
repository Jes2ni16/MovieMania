import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SortSelect from "./SortSelect";
import { sorts } from "../constant/sorts";
import CountrySelect from "./CountrySelect";
import Genre from "./Genre";
import DateInput from "./DateInput";
import WatchProvider from "./WatchProvider";

const FilteringSidebar = ({
  open,
  setOpen,
  sort,
  setSort,
  data,
  selectedRegion,
  handleSelectedRegion,
  genres,
  handleGenre,
  genre,
  setFromDate,
  setToDate,
  fromDate,
  toDate,
  watchProviders,
  selectedWatchProviders,
  handleWatchProvider,
  onResetDate,
}) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-xs">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute right-0 top-0 -mr-8 flex pl-2 pt-4 sm:-mr-10 sm:pl-4">
                      <button
                        type="button"
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll scrollbar-none bg-background-dark py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-sm font-semibold leading-6 text-white">
                        Sorting
                      </Dialog.Title>
                    </div>
                    <div className="relative mt-3 flex-1 px-4 sm:px-6">
                      <div className="border-t mb-3 border-gray-700" />
                      <SortSelect
                        data={sorts}
                        sort={sort}
                        setSort={setSort}
                        label="Sort Results By"
                      />
                      <Dialog.Title className="text-sm sm:text-lg font-semibold leading-6 text-white mt-6">
                        Filtered
                      </Dialog.Title>
                      <div className="border-t mt-3 border-gray-700" />
                      <div className="mt-3">
                        <h3 className="text-sm font-light">Where to Watch</h3>
                        <CountrySelect
                          data={data}
                          selectedRegion={selectedRegion}
                          handleSelectedRegion={handleSelectedRegion}
                        />
                        <div className="overflow-y-scroll max-h-[360px] scrollbar-none scroll-smooth">
                          <WatchProvider
                            data={watchProviders}
                            selectedWatchProviders={selectedWatchProviders}
                            handleWatchProvider={handleWatchProvider}
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="border-t mb-3 border-gray-700" />
                        <h3 className="text-sm font-light">Genre</h3>
                        <Genre genres={genres} handleGenre={handleGenre} genre={genre} />
                      </div>
                      <div className="mt-3">
                        <div className="border-t mb-3 border-gray-700" />
                        <h3 className="text-sm font-light">Release Dates</h3>
                        <DateInput label="From" setDate={setFromDate} date={fromDate} />
                        <DateInput label="To" setDate={setToDate} date={toDate} />
                        <button
                          onClick={onResetDate}
                          className="bg-yellow-400 hover:bg-yellow-500 transition-colors duration-300 text-sm font-semibold text-gray-50 capitalize w-full py-1.5 rounded-md mt-4"
                        >
                          clear dates
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default FilteringSidebar;
