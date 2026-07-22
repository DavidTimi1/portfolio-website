import Home from "../page";

export function generateStaticParams() {
    return [
        { section: "experience" },
        { section: "services" },
        { section: "skills" },
        { section: "contact" },
        { section: "featured-projects" },
        { section: "about" }
    ];
}

export default Home;
