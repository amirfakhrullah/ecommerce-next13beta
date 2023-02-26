"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface Props {
  hasNextPage?: boolean;
  fetchNextPage: () => void;
}
const usePaginatedRef = ({ hasNextPage, fetchNextPage }: Props) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line
  }, [inView]);

  return {
    viewRef: ref,
  };
};

export default usePaginatedRef;
