import Groq from "groq-sdk";
import Anthropic from "@anthropic-ai/sdk";

export const aiClients = {
    llama: new Groq({
        apiKey: process.env.GROQ_API_KEY
    }),

    claude: new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY
    })
};

export async function runAI({
    model,
    system,
    prompt
}: {
    model: string;
    system: string;
    prompt: string;
}) {
    if (model === "llama") {
        const response = await aiClients.llama.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: system },
                { role: "user", content: prompt }
            ]
        });

        return response.choices[0].message.content;
    }

    if (model === "claude") {
        const response = await aiClients.claude.messages.create({
            model: "claude-3-opus-20240229",
            max_tokens: 2000,
            system,
            messages: [{ role: "user", content: prompt }]
        });

        return response.content[0];
    }

    throw new Error("Unknown model");
}
