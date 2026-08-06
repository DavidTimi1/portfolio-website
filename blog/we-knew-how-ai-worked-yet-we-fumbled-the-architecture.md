`````
{
  "title": "We Knew How AI Worked Yet We Fumbled the Architecture",
  "description": "The problem wasn't the AI feature we built, it was the pipeline behind it",
  "created_at": "2026-07-26",
  "author": "David Uwagbale",
  "category": "software-engineering",
  "slug": "we-knew-how-ai-worked-yet-we-fumbled-the-architecture",
  "keywords": ["ai architecture", "system design", "machine learning", "software pipelines", "ai integration"]
}
`````

I know a lot of people that have taken courses in AI or Machine Learning, and yet when they want to build something other than training a model, it's like all that knowledge gets locked away or just goes down the drain.

In this era of AI, 2026, it is essential to have a basic knowledge of how AI works, and even more so if you hope to create solutions using AI itself. Yet the same mistakes are still being made, and honestly, I can't really fault them. It only really becomes noticeable when System Design is explored.

### The Trap Big Models Lure Us Into

When faced with a complex feature, our modern impulse as builders is almost too simple: **just throw the strongest LLM at it.** 

We’ve been conditioned by these powerful APIs to treat top-tier enterprise models like universal computing engines. If a task involves data interpretation, we dump the raw context into the prompt window and let the model figure it out. It’s quick to prototype, that's what is shown in tutorials and feels like magic... right until you try to run it in production at scale.

### Building an AI Tool for a Payment App

Let's cite a really easy example.

Sometime in 2025, I had the opportunity of participating in a hackathon, and what we built was a user experience revision of what making payments should feel like, especially when trying to make sure that the user gets more utility from the payment app than just making payments.

This seemed straightforward enough at first until we thought: **what else would someone want to do aside make payments** 😂.
Regardless, we set out to build this.

We made a redesign of what the User Flow and Experience might feel like to accomodate what we figured would help, among these was a pill section for easy and quick labelling of transactions (like Food, Transport, Subscription, etc).

The AI feature we added was that, having labelled the transactions, we would be able to show the user really great insights into their spending habits and give suggestions too, while allowing them to visually confirm their excesses rather than just seeing the regular: total inflow, total outflow, and list of transactions.

The issue? We planned to just take the selected range of the user's transaction data within that period and feed it to an enterprise LLM.

Wait...
Pause...

If that sounded normal or typical to you, then you really need this next part.

![Diagram showing a naive AI architecture dumping an entire transaction history straight into a large cloud AI model to generate insights](/assets/blog/in-lazy-transaction-ai-architecture.png)

### The true cost of our "lazy" architecture

Even if we decide to completely turn a blind eye to the legal and privacy issues with this approach 😖, we also have a huge issue with the design of this system because what this implies is that for every single user, we will be sending all of that data to the model.

The token costs alone will be outrageouly expensive. Then if we later decide to introduce daily insights too, it becomes a lot worse because we'll need to compute all of this every single day. And if we eventually want insights after every transaction... we're swimming in debt hell.

Not too long ago, I came across something while reading online about using Fable 5 that made me come back to this experience:

> **Don't make your superpower do all the work.**

Your strongest model shouldn't be doing everything. Let your application handle all the smaller, deterministic work so that the really good model only performs the part that actually needs that intelligence. You're saving tokens, time, resources, and honestly building a much better system in the process.

### Rethinking the Pipeline

Alright back to the project: remember, we already have knowledge of how AI works. If you really look at our problem, it is simply a classification issue. Well, that is the first step:

1. **Local Vectorization & Classification**: Instead of sending raw text logs to a remote model, we can compute embeddings locally or run light statistical classification to group spending.

2. **Deterministic Aggregation**: The backend then sums up totals, compute percentages, and even detect anomalies (still using regular code).

3. **Targeted Inference**: Pass only the condensed, anonymized summary metrics into a lightweight local model to generate a short, human-readable insight.


![Architectural comparison diagram showing raw transactions processed through local classification and aggregation before triggering a small local LLM](/assets/blog/in-redesigned-transaction-ai-pipeline.png)

See, there was really no need to send every single raw transaction to an enterprise LLM, and the data never even had to leave our system.

### Zooming out a bit

This principle doesn't stop at fintech apps either. You see it everywhere in AI engineering: like people feeding a massive 50-page PDF straight into an LLM just to extract a date, instead of letting a simple parser pull the text first. Or letting a chatbot search an entire raw database on every prompt instead of querying a structured vector index first.

So maybe the next thing your AI product needs isn't another memory cache or more queues for speed. It may just be taking a step back to ask if you're forcing your biggest model to do basic math that a few lines of standard code could handle.

Because when those other optimizations are eventually added on top of a sane architecture, the speed boost almost feels exponential.
