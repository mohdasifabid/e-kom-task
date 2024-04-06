import OfferBar from "./OfferBar";
import { Navbar } from "./Navbar";

const layoutChildrenStyle: any = { top: "144px", position: "relative" };

export const Layout = ({ children }: any) => {
  
  return (
    <div className="w-full bg-white">
      <Navbar />
      <OfferBar />
      <main
        className="flex justify-center bg-white p-4"
        style={layoutChildrenStyle}
      >
        {children}
      </main>
    </div>
  );
};
