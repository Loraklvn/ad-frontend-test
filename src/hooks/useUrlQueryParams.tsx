"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type UseUrlQueryResult = {
  getParamValue: (key: string) => string | null;
  setParams: (params: Record<string, string | number | null>) => void;
  getAllParams: () => URLSearchParams;
  removeParam: (key: string) => void;
};

const useUrlQueryParams = (): UseUrlQueryResult => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const getParamValue = (key: string): string | null => {
    return searchParams.get(key);
  };

  const setParams = (paramsToSet: Record<string, string | number | null>) => {
    const newParams = new URLSearchParams(searchParams.toString());

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
    return new URLSearchParams(searchParams.toString());
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
