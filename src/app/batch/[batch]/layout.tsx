import React from "react";
import SelectedUpcsProvider from "~/context/SelectedUPCsContext";

function Layout({ children }: { children: React.ReactNode }) {
  return <SelectedUpcsProvider>{children}</SelectedUpcsProvider>;
}

export default Layout;
