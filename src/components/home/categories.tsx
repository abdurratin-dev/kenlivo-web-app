import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const imageParams = "?auto=format&fit=crop&w=600&h=600&q=80";

// The photo fills its circle and is blended in with `mix-blend-multiply`, so a
// light studio backdrop turns into the blush gradient behind it. `lift` blows
// near-white backdrops fully out to white so every circle reads the same pink.
const lift = "brightness-[1.18]";
const imageClass = `absolute inset-0 h-full w-full object-cover mix-blend-multiply ${lift}`;

type Category = {
  name: string;
  href: string;
  image: string;
  alt: string;
};

const categories: Category[] = [
  {
    name: "Cream",
    href: "/cream",
    image: `https://images.unsplash.com/photo-1512496015851-a90fb38ba796${imageParams}`,
    alt: "Assorted makeup compacts, lipsticks and brushes",
  },
  {
    name: "Face Wash",
    href: "/face-wash",
    image: `https://images.unsplash.com/photo-1556228720-195a672e8a03${imageParams}`,
    alt: "Facial cleanser tube on a light background",
  },
  {
    name: "Lotion",
    href: "/lotion",
    image: `https://images.unsplash.com/photo-1522338140262-f46f5913618a${imageParams}`,
    alt: "Hair dryer against a warm pink backdrop",
  },
  {
    name: "Sunscreen",
    href: "/sunscreen",
    image: `https://images.unsplash.com/photo-1592945403244-b3fbafd7f539${imageParams}`,
    alt: "Perfume bottle surrounded by blush roses",
  },
  {
    name: "Serum",
    href: "/serum",
    image: `https://images.unsplash.com/photo-1503236823255-94609f598e71${imageParams}`,
    alt: "Makeup brush resting on a powder compact",
  },
  {
    name: "Accessories",
    href: "/accessories",
    image: `https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d${imageParams}`,
    alt: "Pink chain-strap handbag on a display stand",
  },
];

const imageSizes =
  "(min-width: 1280px) 216px, (min-width: 1024px) 24vw, (min-width: 640px) 31vw, 45vw";

export function Categories() {
  return (
    <section>
      <div className="mx-auto w-full max-w-screen-2xl px-6 py-14 md:px-10 md:py-20">
        <div className="mb-8 md:mb-12">
          <h2 className="text-3xl font-bold tracking-[-0.02em] text-[#1F1B18] md:text-[2rem]">
            Shop by Category
          </h2>
          <p className="mt-1.5 text-sm text-neutral-400 md:text-base">
            Explore your favorite beauty essentials
          </p>
        </div>

        <Carousel opts={{ align: "start" }}>
          <CarouselContent className="-ml-6">
            {categories.map((category) => (
              <CarouselItem
                key={category.name}
                className="basis-1/2 pl-6 sm:basis-1/3 lg:basis-1/4 xl:basis-1/6"
              >
                <Link
                  href={category.href}
                  className="group flex flex-col items-center gap-4 text-center"
                >
                  <span className="relative isolate block aspect-square w-full max-w-[13.5rem] overflow-hidden rounded-full bg-[linear-gradient(180deg,#FDEBE5_0%,#F8D2C8_100%)] transition-transform duration-300 ease-out group-hover:-translate-y-1">
                    <Image
                      src={category.image}
                      alt={category.alt}
                      width={600}
                      height={600}
                      sizes={imageSizes}
                      className={imageClass}
                    />
                  </span>
                  <span className="text-sm font-medium text-[#2B2622] transition-colors group-hover:text-[#B95770] md:text-base">
                    {category.name}
                  </span>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* All six cards fit at xl+, so the arrows only appear when scrolling is possible. */}
          <CarouselPrevious className="left-2 hidden bg-white/90 shadow-sm sm:flex xl:hidden" />
          <CarouselNext className="right-2 hidden bg-white/90 shadow-sm sm:flex xl:hidden" />
        </Carousel>
      </div>
    </section>
  );
}
