import { HumanMessage } from "@langchain/core/messages";
import graph from "./graph";
import readline from "node:readline/promises";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

while (true) {
  const question = await rl.question("You: ");
  if(question === "/bye") break;
  const reply = await graph.invoke({
    messages: [
      new HumanMessage(question),
    ],
  });
  console.log(`AI: ${reply.messages.at(-1)?.content}`);
}
