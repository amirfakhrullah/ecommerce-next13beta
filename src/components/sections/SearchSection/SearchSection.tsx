"use client";

import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import Button from "../../buttons/Button";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { useCallback, useState } from "react";
import { debounce } from "lodash";
import SearchProductSection from "./SearchProductSection";
import NotFoundText from "../../NotFoundText";

const SearchSection = () => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const handleOpen = () => setOpen(!open);

  const debounced = useCallback(
    debounce((val: string) => {
      setSearch(val);
    }, 500),
    // eslint-disable-next-line
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    debounced(e.target.value);
  };

  return (
    <>
      <Button
        className="sm:px-3 px-2 py-[8px]"
        onClick={handleOpen}
        color="secondary"
        localLoaderOnClick={false}
      >
        <AiOutlineSearch className="mr-1 sm:text-lg text-sm" />
        Search <span className="ml-1 sm:block hidden">something...</span>
      </Button>
      <Dialog
        dismiss={{
          enabled: false,
        }}
        className="w-full mx-auto max-w-7xl bg-white mt-20 shadow-lg border-zinc-300 rounded-md"
        open={open}
        handler={handleOpen}
      >
        <DialogBody className="block">
          <div className="p-4 flex flex-row items-center justify-between pb-4 mb-4 border-b border-zinc-300">
            <input
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Search something"
              className="py-3 px-6 border border-zinc-300 focus:outline-none rounded-md w-[40%]"
            />
            <Button color="secondary" localLoaderOnClick={false} onClick={handleOpen} className="py-3 px-6">
              Close
              <AiOutlineClose className="ml-1" />
            </Button>
          </div>
          {search ? (
            <SearchProductSection
              search={search}
              onClose={() => setOpen(false)}
            />
          ) : (
            <NotFoundText>Start Typing...</NotFoundText>
          )}
        </DialogBody>
      </Dialog>
    </>
  );
};

export default SearchSection;
