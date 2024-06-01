import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 8,
  },
  container: {
    flexGrow: 1,
    border: "8px solid black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  saleText: {
    fontSize: "108px",
    color: "black",
    fontWeight: "extrabold",
    font: "Calibri",
  },
  saleView: {
    backgroundColor: "yellow",
    width: "100%",
    padding: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  itemView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    flexGrow: 1,
  },
  itemText: {
    fontWeight: "bold",
    fontSize: "32px",
    font: "Calibri",
  },
  priceView: { flexGrow: 1 },
  priceText: {
    color: "red",
    fontSize: "128px",
    font: "Calibri",
  },
});

type SignPageProps = {
  name: string;
  volume: string;
  price: number;
};

// Create Document Component
const SignPage = ({ name, volume, price }: SignPageProps) => (
  <Page size="A4" style={styles.page} orientation="landscape">
    <View style={styles.container}>
      <View style={styles.saleView}>
        <Text style={styles.saleText}>SALE</Text>
      </View>
      <View style={styles.itemView}>
        <Text style={styles.itemText}>{name}</Text>
        <Text style={styles.itemText}>{volume}</Text>
      </View>
      <View style={styles.priceView}>
        <Text style={styles.priceText}>{price}</Text>
      </View>
    </View>
  </Page>
);

export default SignPage;
