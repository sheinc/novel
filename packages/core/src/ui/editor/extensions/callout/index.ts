import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import CalloutComponent from "./callout";

export interface CalloutOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  // eslint-disable-next-line no-unused-vars
  interface Commands<ReturnType> {
    callout: {
      /**
       * Set a background color
       */
      // eslint-disable-next-line no-unused-vars
      setCalloutBackgroundColor: (attributes: {
        bgColor: string;
      }) => ReturnType;
    };
  }
}

export const defaultAttributes = {
  emoji: "🔔",
  bgColor: "#fbf3da",
};

export const Callout = Node.create<CalloutOptions>({
  name: "callout",

  group: "block",

  content: "inline*",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      emoji: {
        default: defaultAttributes.emoji,
        rendered: false,
      },
      bgColor: {
        default: defaultAttributes.bgColor,
        rendered: false,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "callout",
      },
    ];
  },

  addCommands() {
    return {
      setCalloutBackgroundColor:
        (attributes) =>
        ({ commands }) => {
          if (!attributes.bgColor) {
            return false;
          }
          return commands.updateAttributes(this.name, attributes);
        },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "callout",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CalloutComponent);
  },
});
