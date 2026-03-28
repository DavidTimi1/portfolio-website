"use client";

import Link from "next/link";
import { GithubIcon, MailIcon } from "lucide-react";
import { FaLinkedinIn, FaMedium, FaTelegram } from "react-icons/fa";
import { Button } from "../ui/button";
import { BsTwitterX } from "react-icons/bs";
import ContactForm from "./contact-form"; // Adjust path as needed

export default function Contact() {
    return (
        <section id="contact" className="min-h-screen w-full sticky bottom-0 bg-black text-white border-t border-zinc-800 flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-size-[50px_50px] mask-[linear-gradient(to_bottom,transparent,black)]" />

            <div className="container py-10 flex flex-col md:flex-row items-center md:justify-center gap-4 md:gap-12 ">
                {/* Header */}
                <div className="space-y-4 md:w-1/3 text-center">
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

                {/* Form Component */}
                <ContactForm />

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
    <div className="relative flex flex-col gap-6 mt-6 items-center w-full z-10">
        <div className="h-px w-full bg-linear-to-r from-transparent via-zinc-800 to-transparent" />

        <div className="grid grid-cols-3 items-center justify-center gap-5">

            <Button asChild size="icon" className="hover:scale-110 transition-all">
                <Link href="https://github.com/DavidTimi1" target="_blank">
                    <GithubIcon size={20} />
                    <span className="sr-only">GITHUB</span>
                </Link>
            </Button>
            <Button asChild size="icon" className="hover:scale-110 transition-all">
                <Link href="https://x.com/DavidTimi_1" target="_blank">
                    <BsTwitterX size={20} />
                    <span className="sr-only">TWITTER</span>
                </Link>
            </Button>
            <Button asChild size="icon" className="hover:scale-110 transition-all">
                <Link href="https://www.linkedin.com/in/daviduwagbale" target="_blank">
                    <FaLinkedinIn size={20} />
                    <span className="sr-only">LINKEDIN</span>
                </Link>
            </Button>
            <Button asChild size="icon" className="hover:scale-110 transition-all">
                <Link href="mailto:duwagbale07@gmail.com" target="_blank">
                    <MailIcon size={20} />
                    <span className="sr-only">EMAIL</span>
                </Link>
            </Button>

            <Button asChild size="icon" className="hover:scale-110 transition-all">
                <Link href="https://medium.com/@duwagbale07" target="_blank">
                    <FaMedium size={20} />
                    <span className="sr-only">MEDIUM</span>
                </Link>
            </Button>
            <Button asChild size="icon" className="hover:scale-110 transition-all">
                <Link href="https://t.me/DavidTimi1" target="_blank">
                    <FaTelegram size={24} />
                    <span className="sr-only">TELEGRAM</span>
                </Link>
            </Button>
        </div>
    </div>
)