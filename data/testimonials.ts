export interface Testimonial {
    id: string;
    text: string;
    author: string;
    role: string;
    company: string;
    avatar?: string;
}

export const TESTIMONIALS: Testimonial[] = [
    {
        id: "1",
        text: "David transformed our vague requirements into a high-performance application that exceeded our expectations. His attention to detail is unmatched.",
        author: "Sarah Jenkins",
        role: "CTO",
        company: "TechFlow",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
    },
    {
        id: "2",
        text: "Working with David was seamless. He not only wrote clean code but also contributed to the product design with valuable insights.",
        author: "Michael Chen",
        role: "Product Manager",
        company: "StartUp Inc",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    },
    {
        id: "3",
        text: "The level of creativity and technical skill David brings to the table is rare. He built a stunning 3D experience for our landing page.",
        author: "Jessica Lee",
        role: "Creative Director",
        company: "Design Studio",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d"
    },
    {
        id: "4",
        text: "Reliable, fast, and communicative. David is the developer you want on your team when deadlines are tight.",
        author: "Robert Fox",
        role: "CEO",
        company: "NextGen Solutions",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
    }
];
