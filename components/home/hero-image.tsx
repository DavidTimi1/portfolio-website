import { motion } from 'framer-motion'
import Image from 'next/image';
import { useState } from 'react';

export const HeroImage = () => {
    const [flipped, setFlipped] = useState(false);
    const [hasBeenFlipped, setHasBeenFlipped] = useState(false);


    return (
        <div className="relative size-54 md:size-96 z-30 shrink-0 perspective-1000">

            <motion.div
                initial={{ opacity: 0, x: 150 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{
                    rotateY: hasBeenFlipped
                        ? { type: "spring", stiffness: 200, damping: 18 }
                        : { duration: 1.2, delay: 1 },
                    x: { type: 'spring', stiffness: 400, damping: 25, delay: 0.1 }
                }}
                onClick={() => {
                    setHasBeenFlipped(true);
                    setFlipped(prev => !prev)
                }}
                animate={{ rotateY: hasBeenFlipped ? flipped ? 180 : 0 : [0, 25, 0] }}
                className="relative w-full h-full cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
            >

                {/* Spinning border */}
                <div className="size-[calc(100%+20px)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute border border-dashed border-zinc-400 rounded-full animate-spin" />

                {/* FRONT IMAGE */}
                <div
                    className="absolute inset-0 backface-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <Image
                        src="/assets/my-avatar.jpg"
                        alt="front avatar"
                        width={512}
                        height={512}
                        className="w-full h-full object-cover rounded-full grayscale"
                    />
                </div>

                {/* BACK IMAGE */}
                <div
                    className="absolute inset-0 rotate-y-180"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <Image
                        src="/assets/my-pic.jpg" // ← your second image
                        alt="back avatar"
                        width={512}
                        height={512}
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>

            </motion.div>
        </div>

    )
}