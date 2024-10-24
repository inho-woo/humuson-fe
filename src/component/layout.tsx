import React from "react";
import Header from "./header"; // header 컴포넌트 import

interface LayoutProps {
  children: React.ReactNode;
  title: string;  // title을 받아서 header로 전달
  subTitle : string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, subTitle }) => {
  return (
    <div>
      <Header title={title} subTitle={subTitle} />  {/* title을 Header로 전달 */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
