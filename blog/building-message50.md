`````
{
  "title": "Building Message50: An End-to-End Encrypted Private Chat Application",
  "description": "The CS50 final project that never got submitted.",
  "created_at": "2026-08-06",
  "author": "David Uwagbale",
  "category": "software-engineering",
  "slug": "building-message50",
  "keywords": ["end-to-end encryption", "private chat", "web security", "socket.io", "web crypto api", "message50", "software engineering"]
}
`````


### A Final Project... or So I Thought

When you try out a new project and realise it may have to become a much bigger deal than you first thought.

I was wrapping up the CS50W course: *CS50's Web Programming with Python and JavaScript*, and we were meant to submit a final project. Part of what I learned in the course included Bootstrap, Flask, Django, SQL, and a bit of JavaScript libraries and frameworks. Prior to taking the course, I had taken Harvard's CS50x: *Introduction to Computer Science*, and I also had an intermediate knowledge of web technologies and JavaScript, as that was my primary programming language.

So it was one of those times when I was constantly thinking about what to do for my final project, but I felt all the ideas I came up with didn't really put what I had learned to the test or were just too basic. At that time, my phone had needed repairs for a long time, so I wasn't able to contact any of my friends or classmates (I had graduated from secondary school not long before then), and it felt really hard to come up with anything.

Then one day I was watching my mum chat with someone on her phone, and I thought, *wait... I can build this!*

### Thinking Like a Software Engineer

Retrospectively, this is one of those moments where you notice how programming and software development change the way you think about everyday things. From just pressing buttons and typing on your phone, you begin to think about, based on the technologies you're familiar with, how exactly that process is happening underneath.

Naturally, I got to building. The first thing I did then, and something that remains part of what I do now, was write down everything I needed to make sure I could complete the project. Thinking through the entire flow of what I wanted to build and how I expected it would work. At this time though, I didn't know about complex diagrams, database designs, or great user experience flows. Just a simple note that looked something like this:

![A simple note with a checklist of features](/assets/blog/in-message50-plan-simple-note.png)

Looking at this now, there was a lot I didn't account for then, but I only know this now because I actually built it like this then.

"We live life forward but understand it in reverse... or retrospectively...", well, whatever the exact quote from that philosopher was. 😆

> "Life can only be understood backwards; but it must be lived forwards." - Søren Kierkegaard

### Building the First Prototype

I began laying the foundation with HTML, CSS, JavaScript, Bootstrap, Flask, and SQLite. 
> [!NOTE I later transitioned to using Django apps for the backend]

Setting up the backend (Flask routes and API endpoints) and the database took significantly less time than fine-tuning the frontend. This was the first time I fully agreed **that frontend is definitely the harder one.** That debate can rage on for eternity, so that'll have to be a discussion for another day.

### The "One More Feature" Trap

Development was going all but smoothly, but I was used to the back-and-forth and uncertainty. I mean, that's exactly what Stack Overflow was for.

> "If your question hasn't been asked or answered on Stack Overflow before, then you're doing something really, really wrong." - David (Me), 2025

I asked two questions on Stack Overflow, and the fact that I couldn't find anyone asking the same thing actually made me think I was doing something wrong. One of the replies even hinted that my approach itself might be the problem.

The question I asked is [HERE](https://stackoverflow.com/questions/76597053/can-i-set-the-source-of-an-img-element-to-be-the-path-to-a-file-in-my-local-serv):

![A question about serving assets with Flask on Stack Overflow](/assets/blog/in-flask-stackoverflow-question.png)

At the time, my mental model was simple: a user uploads an image, I save it somewhere on my server, and then I point the `<img>` tag directly at that file. It sounded perfectly reasonable to me.

Looking back, that question says a lot about where I was as a developer. I wasn't just asking how to display an image. I was unknowingly asking about file storage, media serving, URLs, browser security, and how web applications actually deliver user-generated content.

Well... that's not quite how it works 

I would say most of the issues I faced from then on came from a mistake in my project design, or what I considered a design at the time:

> *- It will look like WhatsApp but with different colour scheme.*

I didn't understand then how vague that statement was or how much trouble it would cause me, because I ended up wanting to support almost everything WhatsApp had, while having little to no knowledge of how any of it actually worked.

Even worse, I hadn't factored any of those features into my backend design. It got to a point where my JavaScript code had evolved so much that I was certain I would have to rewrite most of the backend views just to support everything I'd added on the frontend.

But that was only the beginning of my problems.

### The Rabbit Hole Called Cryptography

I started looking into how WhatsApp actually worked, and that's when I discovered end-to-end encryption (E2EE).

See, all this while, what I was building was just a website for sending messages. I had never factored this concept into the project.

The project had to go on hold because after finding this out, every time I wanted to write code on it, my mind kept nagging me about how pointless the whole thing might be if it wasn't secure. It no longer felt like a worthwhile final project if it couldn't protect users' messages.

Eventually, I gave in.

Three months later, I hadn't written much of the actual chat app anymore. Instead, I’d somehow become obsessed with cryptography. I found myself diving headfirst into everything from E2EE basics, hashing, symmetric versus asymmetric encryption, and digital signing, to the raw mathematics behind validating cryptographic concepts and even steganography. I mean, that's the whole family you throw yourself into by searching "cryptography in messaging."

Curiosity is really something.

Once I figured out how to integrate it, I had to grapple with practical realities like the limits of RSA, two-step encryption (encrypting messages with symmetric keys and then encrypting those keys asymmetrically), leveraging browser-native crypto APIs, and storing secrets safely in IndexedDB.

I implemented the JavaScript changes almost immediately, but left the backend updates for later because... well... there was already a massive backlog. Might as well add to it.

Things escalated very quickly.

### When the Frontend Took Over

Although I understood these concepts well enough to work with them, my codebase was already getting messy. It felt like it was one race condition away from becoming a complete disaster.

That was when I knew vanilla JavaScript probably wasn't the best option for this application anymore, so I decided to migrate the codebase to React.

Why? I talked about that here: [https://davidtimi.tech/blog/the-mindset-shift-that-finally-made-react-click](https://davidtimi.tech/blog/the-mindset-shift-that-finally-made-react-click).

At this point, it was obvious I wasn't going to submit this as my CS50 final project anymore, and it became a hill I was almost literally willing to die on.

React made the codebase feel much more alive and gave me the confidence to add even more frontend-heavy logic. Or maybe I should attribute that to the fact that I simply became a better frontend developer and started paying much more attention to user experience somewhere along the journey.

Around this time, I also learned about Progressive Web Applications, and this became my test bed for that as well. I took extra steps to make the web app feel as native as possible; adding offline access via PWA tools, integrating WebSockets for real-time messaging, manipulating browser history for native-like section navigation, and crafting a much smoother overall experience across both mobile and desktop.

The long-overdue backend update finally caught up with me, and I realised there wasn't actually much going on there anymore besides listening for online status, handling read receipts, fetching user data, and coordinating messaging.

The application had become incredibly frontend-heavy.

![A screenshot of Message50](/assets/blog/in-message50-frontend-heavy.png)
![Another screenshot of Message50](/assets/blog/in-message50-large-screen-layout.png)

### The Project That Taught Me More Than CS50

The final result wasn't perfect, and it still didn't have every feature I wanted. I spent over seven months building it, but it was, and still remains, the best project I've ever worked on because I learned so much from it.

Honestly, the bulk of what I know today came from simply sticking with that project, figuring things out one problem at a time, and drowning in the essentials. I even learned the value of shorter release cycles simply because I had spent so long building one thing.

I still make updates to the codebase whenever I can.

Especially now that I'm exploring system design more deeply, I can see plenty of flaws in the application. But that's exactly what learning is about, and proof that I'm growing.

Message50 never became my CS50 final project. But it became the project that taught me more than any course ever could.

Message50 can be checked out here (if still up): https://message50-frontend.vercel.app

Message50 Frontend Github repo - https://github.com/DavidTimi1/Message_50
<br />
Message50 Backend Github repo - https://github.com/DavidTimi1/msg50-be

