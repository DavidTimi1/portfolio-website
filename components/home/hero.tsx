"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { DownloadCloudIcon, GithubIcon, MailIcon, MoveDownIcon, TwitterIcon, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { GlassShard } from "./glass-shard";
import { useTypingName } from "@/hooks/use-typing";

const resumeLink = "#"; // Update with actual link
const GHLink = "https://github.com/DavidTimi1";
const XLink = "https://x.com/DavidTimi_1";
const MailLink = "mailto:duwagbale07@gmail.com";

const ELEVATOR = "20x JS Developer | Python Developer | Full-stack Software Engineer"

export default function Hero() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"],
    });

    const name = useTypingName();

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
    const shardY = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <section
            ref={targetRef}
            id="hero"
            className="h-dvh w-full bg-zinc-900 flex flex-col items-center justify-center snap-start relative overflow-hidden z-20"
        >
            {/* Background Video/Blurred Effect */}
            {/* todo */}

            {/* Floating Glass Shards */}
            <GlassShard variant={0} className="top-20 right-[10%] w-32 h-32 opacity-60" delay={0} duration={8} />
            <GlassShard variant={1} className="bottom-32 left-[5%] w-48 h-48 opacity-40 rotate-12" delay={1} duration={10} />
            <GlassShard variant={2} className="top-1/3 left-[20%] w-24 h-24 opacity-50 -rotate-12" delay={2} duration={7} />
            <GlassShard variant={3} className="bottom-20 right-[20%] w-40 h-40 opacity-30" delay={0.5} duration={12} />

            {/* Fractured Glass bg */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden md:block backdrop-blur-xs">

                <Image
                    src="/assets/transparent-cracked.png"
                    alt=""
                    width={1920}
                    height={1080}
                    className="h-full md:w-full object-cover opacity-50 mix-blend-overlay"
                />
            </div>

            <div className="w-full flex flex-col-reverse md:flex-row gap-6 items-center justify-center">
                <motion.div
                    style={{ opacity, scale }}
                    className="z-30 flex items-center justify-center px-4 md:w-1/2 shrink-0"
                >
                    <div className="flex flex-col items-center md:items-start justify-center gap-6 w-full relative">

                        {/* "Trap" Animation Title */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-accent/20 blur-xl opacity-50 animate-pulse" />
                            <motion.div
                                initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                                animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
                                transition={{ duration: 0.8, ease: "circOut" }}
                            >
                                <h1 className="text-4xl md:text-6xl min-w-44 text-center font-black tracking-tighter text-white mix-blend-overlay">
                                    {name}
                                </h1>
                            </motion.div>
                        </div>

                        <p className="text-xl md:text-2xl text-zinc-300 font-light tracking-wide">
                            <span className="font-mono text-accent">{`{`}</span> {ELEVATOR} <span className="font-mono text-accent">{`}`}</span>
                        </p>

                        <div className="flex flex-col gap-4 items-center justify-center md:flex-row">
                            <Button className="bg-white text-black hover:bg-zinc-200 border-none rounded-full px-8 py-6 text-lg font-bold">
                                <DownloadCloudIcon className="mr-2" />
                                Download Resume
                            </Button>

                            <Button className="bg-transparent border border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg">
                                <MoveDownIcon className="mr-2" />
                                View Projects
                            </Button>
                        </div>

                    </div>
                </motion.div>

                <div className="flex items-center justify-center w-64 h-64 z-30 shrink-0">
                    <Image
                        src="/assets/my-avatar.jpg"
                        alt="my profile avatar"
                        width={512}
                        height={512}
                        className="w-full object-cover rounded-full grayscale"
                    />
                </div>

            </div>


            {/* Social Dock */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 items-center justify-center z-40 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                <Button asChild size="icon" variant="ghost" className="rounded-full hover:bg-white/10 hover:text-accent">
                    <Link href={GHLink} target="_blank">
                        <GithubIcon size={20} />
                    </Link>
                </Button>
                <Button asChild size="icon" variant="ghost" className="rounded-full hover:bg-white/10 hover:text-accent">
                    <Link href={XLink} target="_blank">
                        <TwitterIcon size={20} />
                    </Link>
                </Button>
                <Button asChild size="icon" variant="ghost" className="rounded-full hover:bg-white/10 hover:text-accent">
                    <Link href={MailLink}>
                        <MailIcon size={20} />
                    </Link>
                </Button>
            </div>
        </section>
    );
}
