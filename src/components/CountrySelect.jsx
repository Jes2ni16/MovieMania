import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CountrySelect = ({ data, label, selectedRegion, handleSelectedRegion }) => {
  return (
    <Listbox value={selectedRegion} onChange={handleSelectedRegion}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm leading-6 text-white">{label}</Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-neutral-700 py-1 pl-1 pr-10 text-left text-white shadow-sm ring-1 ring-inset ring-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#FFAE06] sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="ml-3 text-sm sm:text-base block truncate">
                  {selectedRegion.english_name}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-neutral-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {data?.map((item) => (
                  <Listbox.Option
                    key={item.english_name}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-yellow-500" : "text-white",
                        "relative cursor-default select-none py-2 pl-1 pr-9"
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate text-sm sm:text-base"
                            )}
                          >
                            {item.english_name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default CountrySelect;
