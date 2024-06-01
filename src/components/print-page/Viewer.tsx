"use client";

import { Document } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import SignPage from "~/components/print-page/SignPage";
import useWindowDimensions from "~/hooks/useWindowDimensions";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

export default function Viewer() {
  const { height, width } = useWindowDimensions();

  return (
    <PDFViewer height={height as number} width={width as number}>
      <Document></Document>
    </PDFViewer>
  );
}
