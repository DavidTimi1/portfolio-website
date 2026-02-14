"use client"

import { motion } from "framer-motion"
import { CodeIcon, ServerIcon, LayersIcon } from "lucide-react"
import { Button } from "../ui/button"
import { SectionDetector } from "../ui/section-detector"

const services = [
    {
        icon: <CodeIcon className="size-8 text-accent" />,
        title: "Web Development",
        description: "Building lightning-fast, SEO-optimized web applications using Next.js and React. Focusing on performance and accessibility.",
    },
    {
        icon: <ServerIcon className="size-8 text-accent" />,
        title: "Backend Engineering",
        description: "Designing scalable APIs and database architectures. Experienced with Node.js, Python, and cloud infrastructure.",
    },
    {
        icon: <LayersIcon className="size-8 text-accent" />,
        title: "UI/UX Design",
        description: "Creating intuitive and visually stunning user interfaces. Crafting smooth user journeys with modern design principles.",
    },
]

export default function Services() {
    return (
        <section id="services" className="min-h-screen snap-start w-full relative flex items-center justify-center">
            <SectionDetector sectionId="services" />

            <div className="relative container h-full py-10 mx-auto flex flex-col gap-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-white">
                        MY <span className="text-accent italic">SERVICES</span>
                    </h2>
                    <p className="text-zinc-400 max-w-xl">
                        I deliver high-quality digital solutions tailored to your needs.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 justify-center w-full">
                    <motion.div
                        key="cta"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="group relative p-6 rounded-2xl bg-black border border-zinc-700 hover:scale-105 duration-300"
                    >
                        <div className="relative flex flex-col items-start gap-4">
                            <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                                Let's talk about your project
                            </h3>
                            <Button>
                                Let's build
                            </Button>
                        </div>
                    </motion.div>

                    {services.map((service, index) => (

                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="group relative p-8 rounded-2xl bg-zinc-300 border border-white/10 backdrop-blur-sm hover:bg-zinc-200 transition-colors duration-300" style={{
                                backgroundImage: "url('/assets/wave.svg')",
                                backgroundSize: "20px",
                                backgroundRepeat: "repeat",
                                backgroundBlendMode: "overlay"
                            }}
                        >
                            <div className="flex flex-col items-start gap-2">
                                <div className="absolute -top-4 -right-4 p-3 bg-zinc-900 rounded-full border border-white group-hover:animate-bounce transition-colors duration-300">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-zinc-900">
                                    {service.title}
                                </h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
