import React from "react";
import HeaderComponent from "./header/HeaderComponent";
import FooterComponent from "./footer/FooterComponent";
import MainComponent from "./main/MainComponent";
import { ThemeProvider } from "@/components/themeProvider";

const LayoutComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <HeaderComponent />
        <MainComponent>{children}</MainComponent>
        <FooterComponent />{" "}
      </ThemeProvider>
    </>
  );
};

export default LayoutComponent;
