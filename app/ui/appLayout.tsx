import { Navbar } from "./navbar";

const layoutChildrenStyle: any = { top: "144px", position: "relative" };

export const Layout = ({ children }: any) => {
  
  return (
    <div className="w-full bg-white">
      <Navbar />
      <main
        className="flex justify-center bg-white p-4"
        style={layoutChildrenStyle}
      >
        {children}
      </main>
    </div>
  );
};
