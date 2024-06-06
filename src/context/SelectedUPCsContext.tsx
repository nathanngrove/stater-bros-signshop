"use client";

import React, { useState, useContext } from "react";
import { UPC } from "~/components/batch-table/BatchTableListing";

type SelectedUpcsContextObject = {
  selectedUpcs: Array<UPC>;
  setSelectedUpcs: React.Dispatch<React.SetStateAction<UPC[]>>;
};

const SelectedUpcsContext = React.createContext<SelectedUpcsContextObject>({
  selectedUpcs: [],
  setSelectedUpcs: () => {},
});

export function useSelectedUpcs() {
  return useContext(SelectedUpcsContext);
}

type SelectedUpcsProviderProps = {
  children: React.ReactNode;
};

const SelectedUpcsProvider = ({ children }: SelectedUpcsProviderProps) => {
  const [selectedUpcs, setSelectedUpcs] = useState<Array<UPC>>([]);

  const selectedUpcsObject = {
    selectedUpcs,
    setSelectedUpcs,
  };

  return (
    <SelectedUpcsContext.Provider value={selectedUpcsObject}>
      {children}
    </SelectedUpcsContext.Provider>
  );
};

export default SelectedUpcsProvider;
