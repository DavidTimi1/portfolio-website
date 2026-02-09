"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Twitter, Mail, ArrowUpRight, Send, GithubIcon, TwitterIcon, MailIcon } from "lucide-react";
import { FaLinkedinIn, FaTelegram } from "react-icons/fa";
import { Button } from "../ui/button";


export default function Contact() {
    return (
        <section id="contact" className="min-h-screen w-full sticky bottom-0 bg-black text-white border-t border-zinc-800 flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-size-[50px_50px] mask-[linear-gradient(to_bottom,transparent,black)]" />

            <div className="container py-10 flex flex-col md:flex-row items-center md:items-start md:justify-center gap-4 md:gap-12 ">
                {/* Header */}
                <div className="space-y-4 md:w-1/3">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
                        GET IN <span className="text-accent italic">TOUCH</span>
                    </h2>
                    <p className="text-zinc-400 max-w-md mx-auto">
                        Have a project in mind or want to connect? Leave a message.
                    </p>
                    <div className="w-full hidden md:flex">
                        <Socials />
                    </div>
                </div>

                {/* Form */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-full flex flex-col gap-4 bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 backdrop-blur-sm max-w-xl"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-xs font-mono text-zinc-500 uppercase">Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm focus:border-accent focus:outline-none transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-xs font-mono text-zinc-500 uppercase">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm focus:border-accent focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-xs font-mono text-zinc-500 uppercase">Message</label>
                        <textarea
                            id="message"
                            placeholder="Tell me about your project..."
                            rows={4}
                            className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm focus:border-accent focus:outline-none transition-colors resize-none"
                        />
                    </div>

                    <button className="mt-2 w-full bg-accent text-black font-bold py-3 rounded-lg hover:bg-cyan-300 transition-colors flex items-center justify-center gap-2 group">
                        <span>SEND MESSAGE</span>
                    </button>
                </motion.form>

                <div className="md:hidden w-full">
                    <Socials />
                </div>


                {/* Footer */}
                <div className="absolute bottom-4 text-center">
                    <p className="text-zinc-500 font-mono text-sm">
                        &copy; {new Date().getFullYear()} All Rights Reserved.
                    </p>
                </div>
            </div>
        </section>
    );
}


const Socials = () => (
    <div className="flex flex-col gap-6 mt-6 items-center w-full">
        <div className="h-px w-full bg-linear-to-r from-transparent via-zinc-800 to-transparent" />

        <div className="w-full flex justify-center gap-6 flex-wrap">

            <Button asChild size="icon" className="hover:scale-110 transition-transform">
                <Link href="https://github.com/DavidTimi1" target="_blank" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group">
                    <GithubIcon size={20} />
                    <span className="sr-only">GITHUB</span>
                </Link>
            </Button>
            <Button asChild size="icon" className="hover:scale-110 transition-transform">
                <Link href="https://x.com/DavidTimi_1" target="_blank" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group">
                    <TwitterIcon size={20} />
                    <span className="sr-only">TWITTER</span>
                </Link>
            </Button>
            <Button asChild size="icon" className="hover:scale-110 transition-transform">
                <Link href="mailto:duwagbale07@gmail.com" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group">
                    <MailIcon size={20} />
                    <span className="sr-only">EMAIL</span>
                </Link>
            </Button>
            <Button asChild size="icon" className="hover:scale-110 transition-transform">
                <Link href="mailto:duwagbale07@gmail.com" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group">
                    <MailIcon size={20} />
                    <span className="sr-only">EMAIL</span>
                </Link>
            </Button>
            <Button asChild size="icon" className="hover:scale-110 transition-transform">
                <Link href="mailto:duwagbale07@gmail.com" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group">
                    <FaTelegram size={20} />
                    <span className="sr-only">TELEGRAM</span>
                </Link>
            </Button>
            <Button asChild size="icon" className="hover:scale-110 transition-transform">
                <Link href="mailto:duwagbale07@gmail.com" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group">
                    <FaLinkedinIn size={20} />
                    <span className="sr-only">LINKEDIN</span>
                </Link>
            </Button>
        </div>
    </div>
)