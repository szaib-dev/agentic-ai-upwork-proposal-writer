import { StateGraph } from "@langchain/langgraph";
import model from "./model";
import { StateAnnotation } from "./state";

const GenerateProposal = async (state: typeof StateAnnotation.State) => {
  return state;
};

const ImprovementInProposal = async (state: typeof StateAnnotation.State) => {
  return state;
};

const AddStrongHook = async (state: typeof StateAnnotation.State) => {
  return state;
};

const AddStrongClosingLine = async (state: typeof StateAnnotation.State) => {
  return state;
};

// conditional edges
const shouldImproveMore = (state: typeof StateAnnotation.State) => {
  if (state.itterations !== 5 && state.agent === "IMPROVE") {
    return "improvement_in_proposal";
  } else if (state.itterations === 5 && state.agent === "HOOK") {
    return "add_strong_hook";
  } else if (state.itterations === 5 && state.agent === "CLOSING_LINE") {
    return "add_strong_closing_line";
  } else {
    return "__end__";
  }
};
const graph = new StateGraph(StateAnnotation)
  .addNode("generate_proposal", GenerateProposal)
  .addNode("improvement_in_proposal", ImprovementInProposal)
  .addNode("add_strong_hook", AddStrongHook)
  .addNode("add_strong_closing_line", AddStrongClosingLine)

  .addEdge("__start__", "generate_proposal")
  .addConditionalEdges("generate_proposal", shouldImproveMore)
  .addEdge("improvement_in_proposal", "generate_proposal")
  .addEdge("add_strong_hook", "generate_proposal")
  .addEdge("add_strong_closing_line", "generate_proposal")
