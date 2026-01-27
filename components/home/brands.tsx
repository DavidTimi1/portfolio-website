import { BRANDS } from "@/data/brands";
import { motion } from "framer-motion";


export function BrandsCarousel() {
    return (
        <div className="w-full h-full flex flex-col relative py-3 space-y-6">
            <h3 className="text-xs text-zinc-500 font-mono tracking-widest uppercase pl-5">Trusted By</h3>

            {/* Infinite Horizontal Scroll */}
            <div className="w-full overflow-hidden flex relative gradient-masks-x before:w-24 after:w-24">
                <motion.div
                    className="flex gap-12 items-center px-12"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20,
                    }}
                    style={{ width: "max-content" }}
                >
                    {/* Double the array for seamless infinite loop */}
                    {[...BRANDS, ...BRANDS].map((brand, i) => (
                        <div key={i} className="flex flex-col items-center gap-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                            {brand.logo && !brand.logo.includes("....") ? (
                                <img src={brand.logo} alt={brand.name} className="h-8 w-auto object-contain max-w-[300px] brightness-150" />
                            ) : (
                                <span className="text-xl font-bold text-zinc-400 hover:text-white whitespace-nowrap">{brand.name}</span>
                            )}
                        </div>
                    ))}
                </motion.div>

                {/* Gradient Masks */}
                {/* <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-black to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-black to-transparent pointer-events-none" /> */}
            </div>
        </div>
    );
}
