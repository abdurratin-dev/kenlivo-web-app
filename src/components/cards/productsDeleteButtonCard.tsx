import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { AlertTriangle, X, Trash2 } from "lucide-react";
import { ProductType } from "@/types/AllDataType";

interface DeleteTravelPackageProps {
  product: ProductType
  onDelete?: () => void;
}

export default function DeleteButton({
  product,
}: DeleteTravelPackageProps) {
    const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_KENLIVO_DATA_API}products/${product?._id}`,{
        method: 'DELETE',
    });
    const result = await res.json();
    console.log(result);
  };
  
  return (
    <Dialog>
      <form>
        <DialogTrigger render={<Button variant="destructive">Delete</Button>} />
        <DialogContent className="sm:max-w-sm">
          <div className="w-full max-w-[747px] bg-white px-6 py-6 sm:px-10 sm:py-[42px]">
            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full bg-[#f5eded]">
                <AlertTriangle
                  className="h-[34px] w-[34px] text-[#ff4247]"
                  strokeWidth={2.5}
                />
              </div>

              <h2 className="font-serif text-[26px] leading-tight tracking-[-1.1px] text-[#111111] sm:text-[30px]">
                Delete Travel Package
              </h2>
            </div>

            {/* Description */}
            <p className="mt-[17px] text-[16px] leading-[30px] text-[#6f6b70] sm:text-[20px]">
              Are you sure you want to delete{" "}
              <strong className="font-semibold text-[#111111]">
                "{product.name}"
              </strong>
              ? This action cannot be undone and will permanently remove this
              product from the system.
            </p>

            {/* Actions */}
            <div className="mt-[50px] flex flex-col-reverse justify-end gap-3 sm:flex-row sm:gap-5">

              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex h-[71px] items-center justify-center gap-3 bg-[#ff4146] px-[32px] text-[20px] text-white transition-colors hover:bg-[#e9363c] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Trash2 size={23} strokeWidth={2.5} />
                {isDeleting ? "Deleting..." : "Delete Package"}
              </button>
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
