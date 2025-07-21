import { jetBrainsMono } from "@/components/CodeFont";
import AsciiOutput from "@/components/ASCIIpre";
export default function Home() {
  return (
    <div className={`${jetBrainsMono.className} flex flex-col items-center justify-center min-h-screen bg-black text-green-500 p-8`}>
      <AsciiOutput/>
    </div>
  );
}
