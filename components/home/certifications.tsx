import { CERTIFICATIONS } from "@/data/certifications";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRightIcon } from "lucide-react";
import { useEffect, useState } from "react";




export function CertificatesCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const certs = CERTIFICATIONS;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % certs.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [certs.length]);

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className="w-full h-full min-h-[300px] flex flex-col relative py-3 space-y-6">
            <h3 className="text-xs text-zinc-500 font-mono tracking-widest uppercase px-4">Certifications</h3>

            <div className="grow flex flex-col w-full relative">
                <div className="flex-1 flex items-center justify-center relative perspective-[1000px] overflow-x-hidden">
                    <AnimatePresence mode="popLayout" initial={false}>
                        <div className="relative flex items-center justify-center size-full">
                            {[-1, 0, 1].map((offset) => {
                                const index = (currentIndex + offset + certs.length) % certs.length;
                                const item = certs[index];
                                const isCenter = offset === 0;

                                return (
                                    <motion.div
                                        key={`${index}-${offset}`}
                                        className={`absolute cursor-pointer rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden flex flex-col items-center justify-center 
                                        ${isCenter ? "shadow-[0_0_50px_rgba(0,0,0,0.5)] border-zinc-700" : "opacity-40 blur-[1px] grayscale"}`}
                                        initial={{
                                            scale: isCenter ? 0.8 : 0.6,
                                            x: offset * 300,
                                            opacity: 0
                                        }}
                                        animate={{
                                            scale: isCenter ? 1 : 0.85,
                                            x: offset * 320, // Increased spacing
                                            opacity: isCenter ? 1 : 0.4,
                                            zIndex: isCenter ? 20 : 10,
                                            rotateY: offset * -15 // Add subtle 3D rotation
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30
                                        }}
                                        onClick={() => {
                                            if (isCenter) {
                                                if (item.imageURL && !item.imageURL.includes("....")) {
                                                    window.open(item.imageURL, "_blank");
                                                } else {
                                                    console.log("No image url for", item.name)
                                                }
                                            } else {
                                                setCurrentIndex(index);
                                            }
                                        }}
                                    >
                                        <div className="w-64 bg-zinc-950 flex items-center justify-center relative group/cert">
                                            {isCenter && (
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/cert:opacity-100 transition-opacity flex items-center justify-center">
                                                    <ArrowUpRightIcon className="text-white w-6 h-6" />
                                                </div>
                                            )}

                                            {/* Image or Fallback */}
                                            {item.imageURL && !item.imageURL.includes("....") ? (
                                                <img src={item.imageURL} alt={item.name} className="h-full w-full object-cover opacity-80" />
                                            ) : (
                                                <div className="text-center p-2">
                                                    <div className="text-4xl mb-2">🎓</div>
                                                    <p className="text-[10px] text-zinc-500 uppercase">{item.licensor}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute bottom-0 w-full p-1 flex items-center justify-center bg-zinc-900/70">
                                            {
                                                item.licensorLogo && !item.licensorLogo.includes("....") ? (
                                                    <img src={item.licensorLogo} alt={item.licensor} className="h-5 w-5 object-cover rounded-full bg-white" />
                                                ) : (
                                                    <p className="text-xs font-bold text-zinc-300 truncate text-center px-2">{item.licensor}</p>
                                                )
                                            }
                                            <p className="text-xs text-zinc-300 truncate text-center px-2">{item.name}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </AnimatePresence>
                </div>

                {/* Navigation Dots */}
                <div className="h-12 flex items-center justify-center gap-2">
                    {certs.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleDotClick(idx)}
                            className={`transition-all duration-300 rounded-full 
                            ${idx === currentIndex ? "w-8 h-1 bg-white" : "w-1 h-1 bg-zinc-700 hover:bg-zinc-500"}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
