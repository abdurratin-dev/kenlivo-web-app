
import { ShieldCheck } from "lucide-react";
import { GrDeliver } from "react-icons/gr";

export default function FastDelivery() {
  return (
    <div className="inline-flex items-center gap-4 px-5 py-3">
      {/* Golden Badge */}
      <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full border-[5px] border-[#f8ead5]">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#c6a16b] bg-[#fbf2e4]">
          <GrDeliver
            size={30}
            strokeWidth={1.8}
            className="text-[#9b7945]"
          />
        </div>
      </div>

      {/* Text */}
      <h3 className="max-w-[180px] text-[19px] font-bold leading-[1.4] tracking-tight text-[#77716d]">
        Fast Delivery
        <br />
        Access Bungladesh
      </h3>
    </div>
  );
}
