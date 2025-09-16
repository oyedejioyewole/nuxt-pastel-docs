import { h, defineComponent } from "#imports";
import { parse as parseSVG, type Node } from "svg-parser";

const traverseNode = (node: Node) => {
  switch (node.type) {
    case "text":
      return node.value;
    default:
      return h(
        node.tagName ?? "",
        node.properties ?? {},
        node.children.map((child) => traverseNode(child)),
      );
  }
};

/**
 * Originally from: https://gist.github.com/nash403/9e7746f9eda859155c8b111db5f8ed3b
 */
export default defineComponent({
  props: {
    content: { type: String, default: "" },
  },
  async setup(props) {
    const parsedSVG = parseSVG(props.content);
    const elementRoot = parsedSVG.children.at(0);

    if (!elementRoot) {
      console.warn(
        "SVG content doesn't have a root element, disabling render.",
      );
      return () => null;
    }

    const vnodes = traverseNode(elementRoot);
    return () => h(vnodes);
  },
});
