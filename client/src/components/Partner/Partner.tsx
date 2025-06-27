import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function Partner() {
  return (
    <div className="container mx-auto text-auto mb-8 md:mb-12 px-4 md:px-30">
      <div className="flex items-center justify-center">
        <div className="w-full">
          <div className="md:mb-2">
            <h4 className="text-sm md:text-base text-[#A52A2A] text-center font-bold mb-1 md:mb-2">
              Partners & Clients
            </h4>
            <h1 className="text-3xl md:text-4xl font-bold text-center text-black">
              We work with the best people
            </h1>
          </div>

          {/* Marquee Left-to-Right */}
          <Marquee direction="right" speed={120} className="py-4 ">
            <div className="flex items-center gap-8 md:gap-12 ">
              <Image src="/assets/client1.png" alt="partner1" width={150} height={150} className="w-25 h-25 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain" />
              <Image src="/assets/client2.png" alt="partner2" width={150} height={150} className="w-25 h-25 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain" />
              <Image src="/assets/client3.png" alt="partner3" width={150} height={150} className="w-25 h-25 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain" />
              <Image src="/assets/client4.png" alt="partner4" width={150} height={150} className="w-25 h-25 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain" />
              <Image src="/assets/client5.png" alt="partner5" width={150} height={150} className="w-25 h-25 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain" />
              <Image src="/assets/client6.png" alt="partner6" width={150} height={150} className="w-25 h-25 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain" />
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
}
