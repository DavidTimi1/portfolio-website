export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    date: string;
    type: "Collaboration" | "Solo";
    image?: string; // Optional for now, can fallback to gradient
    color?: string; // Fallback gradient
    links: {
        live?: string;
        github?: string;
    };
}

export const projects: Project[] = [
    {
        id: "pic2plate",
        title: "Pic2Plate",
        description: "AI-powered application that generates recipes from food images using Gemini Vision Pro.",
        technologies: ["Next.js", "AI", "Tailwind", "Gemini API"],
        date: "2024",
        type: "Solo",
        color: "from-green-400/20 to-emerald-900/20",
        links: {
            live: "https://pic2plate-tau.vercel.app",
            github: "https://github.com/DavidTimi1/Pic2Plate"
        },
        image: "/assets/projects/pic2plate.webp"
    },
    {
        id: "message50",
        title: "Message50",
        description: "A secure, decentralized messaging platform leveraging blockchain technology for privacy.",
        technologies: ["React", "Crypto", "Node.js", "Socket.io"],
        date: "2023",
        type: "Collaboration",
        color: "from-blue-400/20 to-indigo-900/20",
        links: {
            live: "https://message50-frontend.vercel.app",
            github: "https://github.com/DavidTimi1/Message50"
        },
        image: "/assets/projects/message50.jpg"
    },
    {
        id: "whatsapp-bot",
        title: "Whatsapp AI Bot",
        description: "Intelligent WhatsApp bot built with Python and Gemini for automated responses and assistance.",
        technologies: ["Python", "Gemini", "Flask", "Twilio"],
        date: "2024",
        type: "Solo",
        color: "from-purple-400/20 to-fuchsia-900/20",
        links: {
            github: "https://github.com/DavidTimi1/Whatsapp-Chatgpt-AI"
        },
        image: "/assets/projects/whatsapp-Chatgpt-AI.png"
    },
    {
        id: "chess-2d",
        title: "2D Multi-Chess",
        description: "Interactive 2D multiplayer chess game with logic for valid moves and game states.",
        technologies: ["JavaScript", "HTML5 Canvas", "Socket.io"],
        date: "2023",
        type: "Solo",
        color: "from-orange-400/20 to-red-900/20",
        links: {
            github: "https://github.com/DavidTimi1/Chess",
            live: "https://rawcdn.githack.com/DavidTimi1/Chess/64c39e35f42adec0175795ddaa860131c2ec0868/Chess.html"
        },
        image: "/assets/projects/chess.jpg"
    },
    {
        id: "aisylum",
        title: "Aisylum",
        description: "Private Offline-first AI Tools for Refugees and Asylum seekers.",
        technologies: ["HTML", "CSS", "JavaScript, React"],
        date: "2022",
        type: "Solo",
        color: "from-pink-400/20 to-rose-900/20",
        links: {
            github: "https://github.com/DavidTimi1/davidtimi1.github.io",
            live: "https://davidtimi1.github.io/"
        }
    },
    {
        id: "portfolio-v1",
        title: "Portfolio V1",
        description: "My first portfolio website showcasing early web development skills.",
        technologies: ["HTML", "CSS", "JavaScript, React"],
        date: "2022",
        type: "Solo",
        color: "from-pink-400/20 to-rose-900/20",
        links: {
            github: "https://github.com/DavidTimi1/davidtimi1.github.io",
            live: "https://davidtimi1.github.io/"
        }
    },
    // social media mobile app
    // aisylum
    // 
];
