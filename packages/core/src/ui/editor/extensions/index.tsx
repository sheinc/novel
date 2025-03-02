import StarterKit from "@tiptap/starter-kit";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TiptapLink from "@tiptap/extension-link";
// import TiptapImage from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TiptapUnderline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import { Markdown } from "tiptap-markdown";
import Highlight from "@tiptap/extension-highlight";
import { Youtube } from "@tiptap/extension-youtube";
// import SlashCommand from "./slash-command";
import { InputRule } from "@tiptap/core";
// import UploadImagesPlugin from "@/ui/editor/plugins/upload-images";
import CustomKeymap from "./custom-keymap";
import DragAndDrop from "./drag-and-drop";
import { Heading } from "./custom-heading";
import { Callout } from "./callout";
import { EmbedVideo } from "./video-embed";

export const defaultExtensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: "novel-list-disc novel-list-outside novel-leading-3 novel--mt-2",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class:
          "novel-list-decimal novel-list-outside novel-leading-3 novel--mt-2",
      },
    },
    listItem: {
      HTMLAttributes: {
        class: "novel-leading-normal novel--mb-2",
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: "novel-border-l-4 novel-border-stone-700",
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class:
          "novel-rounded-sm novel-bg-stone-100 novel-p-5 novel-font-mono novel-font-medium novel-text-stone-800",
      },
    },
    code: {
      HTMLAttributes: {
        class:
          "novel-rounded-md novel-bg-stone-200 novel-px-1.5 novel-py-1 novel-font-mono novel-font-medium novel-text-stone-900",
        spellcheck: "false",
      },
    },
    horizontalRule: false,
    dropcursor: {
      color: "#DBEAFE",
      width: 4,
    },
    gapcursor: false,
    // NOTE: Heading should be explicitly set for changing the background color
    heading: false,
  }),
  Heading.configure({
    HTMLAttributes: {
      class: "custom-heading",
    },
  }),
  // patch to fix horizontal rule bug: https://github.com/ueberdosis/tiptap/pull/3859#issuecomment-1536799740
  HorizontalRule.extend({
    addInputRules() {
      return [
        new InputRule({
          find: /^(?:---|—-|___\s|\*\*\*\s)$/,
          handler: ({ state, range }) => {
            const attributes = {};

            const { tr } = state;
            const start = range.from;
            let end = range.to;

            tr.insert(start - 1, this.type.create(attributes)).delete(
              tr.mapping.map(start),
              tr.mapping.map(end),
            );
          },
        }),
      ];
    },
  }).configure({
    HTMLAttributes: {
      class: "novel-mt-4 novel-mb-6 novel-border-t novel-border-stone-300",
    },
  }),
  // CAUTION: Youtube link をペーストしたときには、EmbedVideo が使われる。しかし、すでに作成された youtube node を描画するためにこの Extension は残しておく。
  Youtube.configure({
    inline: false,
    controls: true,
    nocookie: false,
    allowFullscreen: true,
    autoplay: false,
    addPasteHandler: false, // to use EmbedVideo instead
  }),
  EmbedVideo.configure({
    inline: false,
    controls: true,
  }),
  TiptapLink.configure({
    HTMLAttributes: {
      class:
        "novel-text-stone-400 novel-underline novel-underline-offset-[3px] hover:novel-text-stone-600 novel-transition-colors novel-cursor-pointer",
    },
    linkOnPaste: false,
  }),
  // Expect TiptapImage to be is explicitly set from the extensions(not as defaultExtensions)
  // TiptapImage.extend({
  //   HTMLAttributes: {
  //     class: "novel-rounded-lg novel-border novel-border-stone-200",
  //   },
  //   addAttributes() {
  //     return {
  //       ...this.parent?.(),
  //       width: {
  //         default: null,
  //       },
  //       height: {
  //         default: null,
  //       },
  //     };
  //   },
  //   addProseMirrorPlugins() {
  //     return [UploadImagesPlugin()];
  //   },
  // }).configure({
  //   allowBase64: true,
  //   HTMLAttributes: {
  //     class: "novel-rounded-lg novel-border novel-border-stone-200",
  //   },
  // }),
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (["callout"].includes(node.type.name)) {
        return "";
      }
      if (node.type.name === "heading") {
        return `Heading ${node.attrs.level}`;
      }
      return "Press '/' for commands";
    },
    includeChildren: true,
  }),
  Table.configure({
    HTMLAttributes: {
      class:
        "novel-table-fixed novel-m-0 novel-overflow-hidden novel-w-[98%] novel-mx-auto novel-my-3 novel-border-collapse",
    },
    allowTableNodeSelection: true,
  }),
  TableRow.configure({
    HTMLAttributes: {
      class:
        "novel-border novel-box-border novel-min-w-[1em] novel-py-2 novel-px-1 novel-relative novel-align-top novel-text-start !novel-py-1",
    },
  }),
  TableCell.configure({
    HTMLAttributes: {
      class:
        "novel-border novel-box-border novel-min-w-[1em] novel-py-2 novel-px-1 novel-relative novel-align-top novel-text-start !novel-py-1",
    },
  }),
  TableHeader.configure({
    HTMLAttributes: {
      class:
        "novel-bg-stone-100 novel-border novel-box-border novel-min-w-[1em] novel-py-2 novel-px-1 novel-relative novel-align-top novel-text-start !novel-py-1",
    },
  }),
  // Expect SlashCommand to be is explicitly set from the extensions(not as defaultExtensions)
  // SlashCommand,
  TiptapUnderline,
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: "novel-not-prose novel-pl-2",
    },
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: "novel-flex novel-items-start novel-my-4",
    },
    nested: true,
  }),
  Markdown.configure({
    html: false,
    transformCopiedText: true,
    transformPastedText: true,
  }),
  CustomKeymap,
  DragAndDrop,
  Callout,
];
