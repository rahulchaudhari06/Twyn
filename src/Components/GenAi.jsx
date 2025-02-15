import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useRef, useEffect } from "react";
import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ShineBorder } from "./ui/shine-border";
import { Toaster, toast } from "./ui/sonner";
import { FaArrowTurnUp, FaRegCopy } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function GenAi() {
  const [tweet, setTweet] = useState("");
  const [data, setData] = useState("");
  const [tone, setTone] = useState("Casual");
  const [mode, setMode] = useState("Formatting");
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        buttonRef.current?.click();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const prompt = `[CRITICAL RULES]
        1. NEVER use emojis, hashtags, or markdown - strictly prohibited
        2. NO NEW CONTENT: Never add motivational phrases, opinions, advise or commentary. It's strict rule
        3. NEVER add new content - only refine what's provided 
        4. ALWAYS maintain original intent while enhancing clarity
        5. STRICT length limit: Max 280 characters (hard stop)
        6. NEVER mention your actions or process - output only the refined tweet no other bullshit
        7. If the user provides you with a tweet, your task is to refine it, not comment on it or make it longer than the original tweet.
        8. If the user provides you a question to refine, do not try to answer it at all. Just refine the question more so that the reader can understand what the user wants to ask

        [TONE REQUIREMENT]
        Use a ${tone} tone while maintaining the message.

        [PROCESS]

        1. TONE: Convert to casual tone while preserving message
        2. EMPTY: If the input provided is empty return "Please enter something to refine."
        3. DO NOT: Give anything which will hurt the sentiments of people and dont make it too short!
        
        3. ACTION: Execute "${mode}" with:
        - Formatting: Logical line breaks, remove fluff
        - Improving: Boost impact using mindset, tighten phrasing no commentary and opinions
        - Correcting: Fix errors, improve readability

        [OUTPUT REQUIREMENTS]
        - Multi-line format unless user specifies single-line
        - Preserve original formatting style when possible
        - Remove redundant phrases while keeping core message
        - Use active voice and concise language

        [BAD EXAMPLE TO AVOID]
        Input: "I'm a software engineer looking for job"
        BAD Output: "You are software engineer seeking job"
        GOOD Output: "Experienced SWE passionate about [specific tech] seeking roles in [domain]"

        [INPUT TO REFINE]
        "${tweet}"

        [FINAL INSTRUCTIONS]
        1. Check for grammar
        2. Apply casual tone 
        3. Generate ONLY the refined tweet meeting all rules
        4. Validate against all constraints before outputting
        5.Apply ${tone} tone and ${mode} action
        `;

  const handleGenerate = async () => {
    const result = await model.generateContent(prompt);
    setData(result.response.text());
    console.log(result.response.text());
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center gap-4 mt-10 sm:mt-20 px-4 sm:px-6">
        <div className="relative w-full max-w-[800px]">
          <Textarea
            className="resize-none text-white rounded-3xl tracking-widest p-4 pl-4 sm:pl-8 border border-slate-500 min-h-[120px] sm:min-h-[150px] w-full pr-16 sm:pr-32"
            type="text"
            id="userInput"
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            placeholder="Type your Tweet"
          />
          <div className="absolute bottom-4 left-4 sm:left-5 flex flex-col sm:flex-row gap-2 sm:gap-4">
            <Select onValueChange={(value) => setTone(value)} defaultValue="Casual">
              <SelectTrigger className="w-[110px] sm:w-[130px] bg-inherit text-white border-slate-500 tracking-widest text-sm sm:text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1F1F1F] text-white border-slate-500">
                <SelectGroup>
                  <SelectLabel>Tone</SelectLabel>
                  <SelectItem value="Funny">Funny</SelectItem>
                  <SelectItem value="Casual">Casual</SelectItem>
                  <SelectItem value="Formal">Formal</SelectItem>
                  <SelectItem value="Humorous">Humorous</SelectItem>
                  <SelectItem value="Serious">Serious</SelectItem>
                  <SelectItem value="Sarcastic">Sarcastic</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setMode(value)} defaultValue="Formatting">
              <SelectTrigger className="w-[120px] sm:w-[140px] bg-inherit text-white border-slate-500 tracking-widest text-sm sm:text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1F1F1F] text-white border-slate-500">
                <SelectGroup>
                  <SelectLabel>Mode</SelectLabel>
                  <SelectItem value="Formatting">Formatting</SelectItem>
                  <SelectItem value="Improving">Improving</SelectItem>
                  <SelectItem value="Correcting">Correcting</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div ref={buttonRef} onClick={handleGenerate} className="absolute bottom-4 right-4">
            <Button variant="outline" size="icon" className="bg-inherit text-white border-slate-500 rounded-xl">
              <FaArrowTurnUp />
            </Button>
          </div>
        </div>

        {data && (
          <div className="w-full max-w-[800px] mt-6 sm:mt-10 relative px-2 sm:px-0">
            <ShineBorder
              className="bg-inherit min-h-10 text-white w-full text-sm sm:text-base p-4"
              color={["#1F1F1F", "#FFFFFF", "#66B2B2", "#EAB308"]}
            >
              {data}
            </ShineBorder>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 bg-inherit p-3 text-white border-slate-500 rounded-xl"
              onClick={() => {
                navigator.clipboard.writeText(data);
                toast("Copied to clipboard!");
              }}
            >
              <FaRegCopy />
            </Button>
          </div>
        )}
      </div>
    </>
  );
}