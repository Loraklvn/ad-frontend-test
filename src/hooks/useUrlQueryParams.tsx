"use client";

import { usePathname, useRouter } from "next/navigation";

type UseUrlQueryResult = {
  getParamValue: (key: string) => string | null;
  setParams: (params: Record<string, string | number | null>) => void;
  getAllParams: () => URLSearchParams;
  removeParam: (key: string) => void;
};

const useUrlQueryParams = (): UseUrlQueryResult => {
  const router = useRouter();
  const pathname = usePathname();

  // Note: This is a workaround to avoid using useSearchParams without Suspense Boundary
  // which could cause build errors.
  const getSearchParams = () => {
    const search = typeof window !== "undefined" ? window.location.search : "";
    const searchParams = new URLSearchParams(search);
    return searchParams;
  };

  const getParamValue = (key: string): string | null => {
    return getSearchParams().get(key);
  };

  const setParams = (paramsToSet: Record<string, string | number | null>) => {
    const newParams = new URLSearchParams(getSearchParams().toString());

    const paramsToSetEntries = Object.entries(paramsToSet);

    paramsToSetEntries.forEach(([key, value]) => {
      if (value === null || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });

    const newUrl = `${pathname}?${newParams.toString()}`;

    router.push(newUrl, { scroll: false });
  };

  const getAllParams = (): URLSearchParams => {
    return new URLSearchParams(getSearchParams().toString());
  };

  const removeParam = (key: string) => {
    setParams({ [key]: null });
  };

  return {
    getParamValue,
    setParams,
    getAllParams,
    removeParam,
  };
};

export default useUrlQueryParams;
