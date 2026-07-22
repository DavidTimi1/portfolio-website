import { useActiveSection } from "@/components/providers/active-section-context";
import { useRouter } from "next/navigation";
import { Code2Icon, BriefcaseIcon, MailIcon, LayersIcon, FolderGitIcon, HomeIcon, BookOpenIcon } from "lucide-react";

export const navItems = [
    { name: "Home", icon: HomeIcon, href: "/" },
    { name: "Services", icon: LayersIcon, href: "/services" },
    { name: "Experience", icon: BriefcaseIcon, href: "/experience" },
    { name: "Skills", icon: Code2Icon, href: "/skills" },
    { name: "Projects", icon: FolderGitIcon, href: "/featured-projects" },
    { name: "Contact", icon: MailIcon, href: "/contact" },
];

const homeSections = ["/", "/services", "/experience", "/skills", "/featured-projects", "/contact"];

export const useAppNav = () => {
    const { activeSection, setActiveSection } = useActiveSection();
    const router = useRouter();

    const isActive = (href: string) => {
        if (typeof window === "undefined") return false;
        const pathname = window.location.pathname;

        if (href === "/blog") {
            return pathname.startsWith("/blog");
        }

        // Only use scroll-based section active state if on the home page
        const isCurrentPageHome = homeSections.includes(pathname);
        if (!isCurrentPageHome) {
            return false;
        }

        return Boolean(
            activeSection === href.replace("/", "") ||
            (activeSection === "hero" && href === "/")
        );
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (typeof window === "undefined") return;
        const pathname = window.location.pathname;
        const isCurrentPageHome = homeSections.includes(pathname);
        const isTargetHomeSection = homeSections.includes(href);

        // If currently on home page and target is a home section, scroll smoothly
        if (isCurrentPageHome && isTargetHomeSection) {
            e.preventDefault();
            const targetId =
                href === "/" ? "hero" :
                    href === "/contact" ? "contact-end" :
                        href.replace("/", "");
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                window.history.pushState(null, "", href);
                setActiveSection(targetId);
            }
        } else {
            // For other pages or navigation away from/to home page, use standard router push
            e.preventDefault();
            router.push(href);
        }
    };

    return {
        navItems,
        handleNavClick,
        isActiveSection: isActive
    };
};