"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";

interface FormData {
  subject: string;
  body: string;
  email: string;
  name: string;
}

const initFormData: FormData = {
  subject: "New Portfolio Message",
  body: "",
  email: "",
  name: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initFormData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const isError = message.includes("error");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    // Map the textarea 'message' id to the 'body' key in our state
    const fieldName = id === "message" ? "body" : id;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Message sent successfully!");
        setFormData(initFormData);
      } else {
        setMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setMessage("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full flex flex-col gap-4 bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 backdrop-blur-sm max-w-xl relative z-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="wait">
          {message && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`flex items-center gap-2 p-3 rounded-lg border text-sm font-medium md:col-span-2 ${
                isError? "bg-red-500/10 border-red-500/50 text-red-400" :
                  "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
              }`}
            >
              {isError ? (
                <AlertCircleIcon size={16} />
              ) : (
                <CheckCircle2Icon size={16} />
              )}
              {message}
            </motion.div>
          )}
      </AnimatePresence>

        <div className="space-y-2">
          <label htmlFor="name" className="text-xs font-mono text-zinc-500 uppercase">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm focus:border-accent focus:outline-none transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-mono text-zinc-500 uppercase">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm focus:border-accent focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-xs font-mono text-zinc-500 uppercase">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={formData.body}
          onChange={handleChange}
          placeholder="Tell me about your project..."
          className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm focus:border-accent focus:outline-none resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full bg-accent text-black font-bold py-3 rounded-lg hover:bg-cyan-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <span>{loading ? "SENDING..." : "SEND MESSAGE"}</span>
      </button>
    </motion.form>
  );
}