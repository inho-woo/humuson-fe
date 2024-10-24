import React from "react";
import Header from "./header";

interface LayoutProps {
  children?: React.ReactNode;
  title: string;
  subTitle : string;
}

const Layout = (props : LayoutProps ) => {
  return (
    <>
      <Header title={props.title} subTitle={props.subTitle}/> 
      {props.children ? props.children : ""}
    </>
  );
  
};

export default Layout;
