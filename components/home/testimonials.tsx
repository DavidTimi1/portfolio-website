import { TESTIMONIALS } from "@/data/testimonials";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Quote } from "lucide-react";

export function TestimonialsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="size-full min-h-[200px] py-3 group cursor-default">
            <div className="size-full flex flex-col gap-y-6 px-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h3 className="text-xs text-zinc-500 font-mono tracking-widest uppercase">Client Intel</h3>
                    <Quote className="text-zinc-700 w-4 h-4" />
                </div>

                <div className="grow relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 flex flex-col justify-between"
                        >
                            <p className="text-sm text-zinc-300 italic leading-relaxed">
                                &quot;{TESTIMONIALS[currentIndex].text}&quot;
                            </p>

                            <div className="flex items-center gap-3 mt-4">
                                <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden">
                                    {TESTIMONIALS[currentIndex].avatar ? (
                                        <img
                                            src={TESTIMONIALS[currentIndex].avatar}
                                            alt={TESTIMONIALS[currentIndex].author}
                                            className="w-full h-full object-cover opacity-80"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xs text-zinc-500 bg-zinc-900">
                                            {TESTIMONIALS[currentIndex].author[0]}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-zinc-200">
                                        {TESTIMONIALS[currentIndex].author}
                                    </span>
                                    <span className="text-[10px] text-zinc-500 font-mono">
                                        {TESTIMONIALS[currentIndex].role} @ {TESTIMONIALS[currentIndex].company}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>


            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-0.5 bg-zinc-800 w-full">
                <motion.div
                    key={currentIndex}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="h-full bg-accent"
                />
            </div>
        </div>
    );
}
