import { useActiveSection } from "@/components/providers/active-section-context";
import { useRouter } from "next/navigation";
import { Code2Icon, BriefcaseIcon, MailIcon, LayersIcon, FolderGitIcon, HomeIcon } from "lucide-react";


const navItems = [
    { name: "Home", icon: HomeIcon, href: "/" },
    { name: "Services", icon: LayersIcon, href: "/services" },
    { name: "Experience", icon: BriefcaseIcon, href: "/experience" },
    { name: "Skills", icon: Code2Icon, href: "/skills" },
    { name: "Projects", icon: FolderGitIcon, href: "/featured-projects" },
    { name: "Contact", icon: MailIcon, href: "/contact" },
];

export const useAppNav = () => {
    const { activeSection, setActiveSection } = useActiveSection();
    const router = useRouter();

    const isActive = (href: string) => {
        return Boolean(
            activeSection === href.replace("/", "") ||
            activeSection === 'hero' && href === '/'
        )
    }


    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const pathname = window.location.pathname;
        const isHomePage = navItems.some(item => item.href === pathname);

        // If on home page, prevent default navigation and scroll smoothly
        if (isHomePage) {
            const targetId =
                href === '/' ? 'hero' :
                    href === '/contact' ? 'contact-end' :
                        href.replace("/", "");
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                // Update URL and state manually for immediate feedback
                window.history.pushState(null, "", href);
                setActiveSection(targetId);
            }

        } else {
            router.push(href);
        }
    };

    return {
        navItems,
        handleNavClick,
        isActiveSection: isActive
    }
}