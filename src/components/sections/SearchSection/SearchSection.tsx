"use client";

import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import Button from "../../buttons/Button";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import SearchProductSection from "./SearchProductSection";
import NotFoundText from "../../NotFoundText";
import { LIMIT_SEARCH_INPUT } from "../../../constants";
import { toast } from "react-hot-toast";

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

    const trimmedValue = e.target.value.slice(0, LIMIT_SEARCH_INPUT).trim();
    if (trimmedValue !== search) {
      debounced(e.target.value.slice(0, LIMIT_SEARCH_INPUT).trim());
    }
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
        className="w-full mx-auto max-w-[77rem] xl:px-0 px-2 pt-6 bg-white mt-20 shadow-lg border-zinc-300 rounded-md"
        open={open}
        handler={handleOpen}
      >
        <DialogBody className="block">
          <div className="mx-auto max-w-6xl flex flex-row items-center justify-between pb-4 border-b border-zinc-300">
            <input
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Search something..."
              className="sm:py-3 py-[10px] px-6 border border-zinc-300 focus:outline-none rounded-md sm:w-[40%] w-full sm:mr-0 mr-1"
            />
            <Button
              color="secondary"
              localLoaderOnClick={false}
              onClick={handleOpen}
              className="py-3 px-6"
            >
              Close
              <AiOutlineClose className="ml-1" />
            </Button>
          </div>
          <div className="pt-4 max-h-[70vh] overflow-y-auto">
            {search ? (
              <SearchProductSection
                search={search}
                onClose={() => setOpen(false)}
              />
            ) : (
              <NotFoundText>Start Typing...</NotFoundText>
            )}
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default SearchSection;
