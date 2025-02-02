import ImageToPdfConverter from "@/components/ImageToPdfConverter";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col max-w-screen max-h-screen">
      <div className="flex w-full h-16 bg-pink-200">
        <Navbar />
      </div>
      <div className="flex w-full h-full overflow-y-scroll hide-scrollbar bg-zinc-100">
        <div className="flex flex-col w-full h-full gap-10 px-40 py-20">
          <div className="flex w-full h-max py-3 items-center justify-center text-xl font-semibold">
            Reformat a JPG, PNG, or other image to a PDF file in a few seconds.
          </div>
          <div className="flex w-full h-max">
            <ImageToPdfConverter />
          </div>
          <div className="flex flex-col w-full h-max gap-3 items-center justify-center">
            <span className="flex w-full items-center justify-center py-2 font-semibold text-lg">
              How to Convert JPGs to PDF Free
            </span>
            <div className="flex lg:flex-row flex-col gap-4 w-full h-max items-center justify-between px-10 py-5">
              <div className="flex gap-3 lg:w-1/3 w-full h-full items-center justify-center">
                <div className="flex h-max border border-black rounded-full px-3 py-1 bg-slate-100">1</div>
                <span className="text-sm">
                  Select the JPGs you want to change to PDF, then add the images to our JPG to PDF converter for conversion.
                </span>
              </div>
              <div className="flex gap-3 lg:w-1/3 w-full h-full items-center justify-center">
                <div className="flex h-max border border-black rounded-full px-3 py-1 bg-slate-100">2</div>
                <span className="text-sm">
                  Our online JPG to PDF converter turns your images into multiple PDFs or a single merged PDF in seconds.
                </span>
              </div>
              <div className="flex gap-3 lg:w-1/3 w-full h-full items-center justify-center">
                <div className="flex h-max border border-black rounded-full px-3 py-1 bg-slate-100">3</div>
                <span className="text-sm">
                  Download your converted PDF files and save them to your computer. After converting your images to PDFs, all remaining files will be deleted from our servers.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
