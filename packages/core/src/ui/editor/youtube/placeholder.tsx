import { mergeAttributes, Node, nodePasteRule } from "@tiptap/core";
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewContent,
} from "@tiptap/react";
import Component from "./component";

export interface YoutubeOptions {
  addPasteHandler: boolean;
  allowFullscreen: boolean;
  autoplay: boolean;
  ccLanguage?: string;
  ccLoadPolicy?: boolean;
  controls: boolean;
  disableKBcontrols: boolean;
  enableIFrameApi: boolean;
  endTime: number;
  height: number;
  interfaceLanguage?: string;
  ivLoadPolicy: number;
  loop: boolean;
  modestBranding: boolean;
  HTMLAttributes: Record<string, any>;
  inline: boolean;
  nocookie: boolean;
  origin: string;
  playlist: string;
  progressBarColor?: string;
  width: number;
}

type SetYoutubeVideoOptions = {
  src: string;
  width?: number;
  height?: number;
  start?: number;
};

// declare module '@tiptap/core' {
//   interface Commands<ReturnType> {
//     youtube: {
//       /**
//        * Insert a youtube video
//        */
//       setYoutubeVideo: (options: SetYoutubeVideoOptions) => ReturnType,
//     }
//   }
// }

export const YoutubePlaceholder = Node.create<{}>({
  name: "react-component",

//   addOptions() {},

  group: "block",

  content: "inline*",

  //   defining: true,

  //   draggable: true,

  //   addAttributes() {
  //     return {};
  //   },

  parseHTML() {
    return [
      {
        tag: "react-component",
      },
    ];
  },

  //   addCommands() {
  //     return {
  //       setYoutubeVideo: (options: SetYoutubeVideoOptions) => ({ commands }) => {
  //         if (!isValidYoutubeUrl(options.src)) {
  //           return false
  //         }

  //         return commands.insertContent({
  //           type: this.name,
  //           attrs: options,
  //         })
  //       },
  //     }
  //   },

  //   addPasteRules() {
  //     if (!this.options.addPasteHandler) {
  //       return []
  //     }

  //     return [
  //       nodePasteRule({
  //         find: YOUTUBE_REGEX_GLOBAL,
  //         type: this.type,
  //         getAttributes: match => {
  //           return { src: match.input }
  //         },
  //       }),
  //     ]
  //   },

  renderHTML({ HTMLAttributes }) {
    // Add YouTube placeholder
    return ["react-component", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});
