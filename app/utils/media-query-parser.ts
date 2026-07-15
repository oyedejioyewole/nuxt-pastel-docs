import type { FeatureNode, InParensNode, QueryNode } from "media-query-parser";

interface RootVisitor {
  onFeature?: (node: FeatureNode) => void;
}

function __traverseNodes(
  newRoot: InParensNode | InParensNode["node"],
  visitor?: RootVisitor,
) {
  switch (newRoot._t) {
    case "condition":
      newRoot.nodes.forEach((child) => __traverseNodes(child, visitor));
      break;
    case "in-parens":
      __traverseNodes(newRoot.node, visitor);
      break;
    case "feature": {
      visitor?.onFeature?.(newRoot);
      break;
    }
  }
}

export const findMediaQueryFeature = (
  tree: QueryNode,
  searchTerm: string,
): string | number | undefined => {
  let result: string | number | undefined;

  if (tree._t === "query" && tree.condition) {
    tree.condition.nodes.forEach((node) => {
      __traverseNodes(node, {
        onFeature: (featureNode) => {
          if (
            featureNode.feature === searchTerm &&
            "value" in featureNode &&
            "value" in featureNode.value
          ) {
            result = featureNode.value.value;
          }
        },
      });
    });
  }

  return result;
};

export const findAndReplaceMediaQueryFeature = (
  tree: QueryNode,
  searchTerm: string,
  replaceWith: string,
): { tree: QueryNode; result?: string | number } => {
  let result: string | number | undefined;

  if (tree._t === "query" && tree.condition) {
    tree.condition.nodes.forEach((node) => {
      __traverseNodes(node, {
        onFeature: (featureNode) => {
          if (
            featureNode.feature === searchTerm &&
            "value" in featureNode &&
            "value" in featureNode.value
          ) {
            result = featureNode.value.value; // Capture old value
            featureNode.value.value = replaceWith; // Mutate
          }
        },
      });
    });
  }

  return { tree, result };
};
