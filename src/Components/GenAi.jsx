import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useRef, useEffect } from "react";
import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ShineBorder } from "./ui/shine-border";
import { FaArrowTurnUp } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



export default function GenAi(){

    const [tweet, setTweet] = useState("")
    const [data, setData] = useState("")
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

        [PROCESS]

        1. TONE: Convert to casual tone while preserving message
        2. EMPTY: If the input provided is empty return "Please enter something to refine."
        3. DO NOT: Give anything which will hurt the sentiments of people and dont make it too short!
        

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
        4. Validate against all constraints before outputting`

    const handleGenerate = async () => {
        const result = await model.generateContent(prompt)
        setData(result.response.text())
        console.log(result.response.text());
        
    }
    
    return (
        
        <div className=" flex flex-col items-center justify-center gap-4">
          <div className="relative">
            <Textarea 
              className="resize-none text-white rounded-3xl tracking-widest p-4 pl-8 border border-slate-500 min-h-[100px] min-w-[800px] pr-32" 
              type="text"
              id="userInput"
              value={tweet}
              onChange={(e) => setTweet(e.target.value)} 
              placeholder="Type your Tweet" 
            />
            <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
    </Select>
            <div ref={buttonRef} onClick={handleGenerate} className="absolute bottom-4 right-4">
              <Button variant="outline" size="icon" className="bg-inherit text-white "><FaArrowTurnUp/></Button>
            </div>
          </div>
         
            <div className="font-p-sans bg-inherit">
              {
                !data ? <p></p> : <ShineBorder 
            className="bg-inherit mt-10 min-h-10 text-white min-w-full"color={["#1F1F1F", "#FFFFFF", "#66B2B2", "#EAB308"]}> {data} </ShineBorder>
                }
            </div>

          </div>

      )
}