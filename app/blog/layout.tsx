
import Navbar from "@/components/Nav";
import Options from "@/components/Options";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
      <div className={ "container min-h-screen max-w-screen-xl mx-auto inter-font"}>
        <Navbar />
        <div className="grid-home max-w-screen-xl mx-auto gap-4 mt-20">
        <div className="side_bar w-14- transition duration-300 ease-in-out relative">
            {/* side options */}
            <Options />
        </div>
        {children}
        </div>
      </div>
 
  );
}
