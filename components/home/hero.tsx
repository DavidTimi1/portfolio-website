"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GithubIcon, MailIcon, MoveDownIcon, TwitterIcon, ArrowUpRightFromSquareIcon, SeparatorVertical } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { GlassShard } from "./glass-shard";
import { useTypingName } from "@/hooks/use-typing";
import { SectionDetector } from "../ui/section-detector";
import { HeroImage } from "./hero-image";


const GHLink = "https://github.com/DavidTimi1";
const XLink = "https://x.com/DavidTimi_1";
const MailLink = "mailto:duwagbale07@gmail.com";

const ELEVATOR = <> Hi I&apos;m David Uwagbale — a 20x Full-stack Software Engineer. <br />
    <SeparatorVertical className="mx-auto" />
    I have a talent for developing awesome user experiences and building scalable solutions. </>

export default function Hero() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"],
    });

    const name = useTypingName();

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
    // const shardY = useTransform(scrollYProgress, [0, 1], [0, -100]);

    const viewFeaturedProjects = () => {
        document.getElementById('featured-projects')?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <section
            ref={targetRef}
            id="hero"
            className="h-dvh w-full md:snap-start flex flex-col items-center justify-center relative overflow-hidden"
        >
            <SectionDetector sectionId="hero" />

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
                    aria-hidden
                    width={1920}
                    height={1080}
                    className="h-full md:w-full object-cover opacity-10 mix-blend-overlay"
                />
            </div>

            <div className="w-full container flex flex-col-reverse md:flex-row gap-6 items-center justify-evenly text-center">
                <motion.div
                    style={{ opacity, scale }}
                    className="z-30 flex items-center justify-center px-4 md:w-1/2 max-w-xl shrink-0"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -150 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25, delay: 0.1 }}
                        className="flex flex-col items-center justify-center gap-6 w-full relative"
                    >

                        {/* "Trap" Animation Title */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-accent/20 blur-xl opacity-50 animate-pulse" />
                            <motion.div
                                initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                                animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
                                transition={{ duration: 0.8, ease: "circOut", delay: 0.5 }} // Added delay to sync with container
                            >
                                <h1 className="text-3xl md:text-6xl font-black text-white mix-blend-overlay">
                                    {name}
                                </h1>
                            </motion.div>
                        </div>

                        <p className="text-md md:text-xl text-zinc-300 font-light tracking-wide">
                            <span className="font-mono text-accent">{`<>`}</span> <br />
                            {ELEVATOR} <br />
                            <span className="font-mono text-accent">{`</>`}</span>
                        </p>

                        <div className="flex flex-col gap-4 items-center justify-center md:flex-row">
                            <Button asChild className="bg-white text-black hover:bg-zinc-200 border-none rounded-full px-8 py-6 text-lg font-bold">
                                <Link autoFocus href="/resume.pdf" target="_blank">
                                    View Resume
                                    <ArrowUpRightFromSquareIcon />
                                </Link>
                            </Button>

                            <Button className="relative bg-transparent group border border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg"
                                onClick={viewFeaturedProjects}
                            >
                                <div className="absolute scale-60 inset-0 animate-ping group-hover:animate-none group-hover:opacity-0 bg-white/20 rounded-full"></div>
                                <MoveDownIcon className="group-hover:animate-bounce" />
                                Featured Projects
                            </Button>
                        </div>

                    </motion.div>
                </motion.div>

                <HeroImage />
            </div>


            {/* Social Dock */}
            <SocialDock />
        </section>
    );
}


const SocialDock = () => {
    // Stagger animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.5, // Start after line animates
                staggerChildren: -0.4
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="absolute bottom-5 md:bottom-auto md:top-1/2 md:-translate-y-1/2 left-5 flex md:flex-col gap-4 items-center justify-center h-auto z-20">
            {/* Animated Icons Container */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex md:flex-col gap-4"
            >
                <motion.div variants={itemVariants}>
                    <Button asChild size="icon" variant="ghost" className="bg-black/40 size-12 border border-white/10 rounded-full hover:bg-white/10 hover:text-accent">
                        <Link href={GHLink} target="_blank">
                            <GithubIcon size={24} />
                        </Link>
                    </Button>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Button asChild size="icon" variant="ghost" className="bg-black/40 size-12 border border-white/10 rounded-full hover:bg-white/10 hover:text-accent">
                        <Link href={XLink} target="_blank">
                            <TwitterIcon size={24} />
                        </Link>
                    </Button>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Button asChild size="icon" variant="ghost" className="bg-black/40 size-12 border border-white/10 rounded-full hover:bg-white/10 hover:text-accent">
                        <Link href={MailLink}>
                            <MailIcon size={24} />
                        </Link>
                    </Button>
                </motion.div>
            </motion.div>

            {/* Desktop Line */}
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: "25vh" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="hidden md:block absolute left-auto top-[calc(100%+1.25rem)] w-px bg-zinc-600"
            />

            {/* Mobile Line */}
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "45vw" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="block md:hidden absolute left-[calc(100%+1.25rem)] top-1/2 -translate-y-1/2 h-px bg-zinc-600"
            />

        </div>
    )
}