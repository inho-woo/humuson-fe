import React from "react";
import Header from "./header"; // header 컴포넌트 import

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  subTitle : string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, subTitle }) => {
  return (
    <div>
      <Header title={title} subTitle={subTitle} /> 
      <main>{children}</main>
    </div>
  );
};

export default Layout;
