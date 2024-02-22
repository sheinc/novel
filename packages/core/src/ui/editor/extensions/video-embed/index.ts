import { isValidUrl } from "@/lib/utils";
import { Node, mergeAttributes, nodePasteRule } from "@tiptap/core";
import { GLOBAL_REGEX, VideoEmbedType, getEmbedUrl } from "./utils";

export interface EmbedOptions {
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

type SetEmbedVideoOptions = {
  src: string;
  width?: number;
  height?: number;
  start?: number;
};

declare module "@tiptap/core" {
  // eslint-disable-next-line no-unused-vars -- declared in the module
  interface Commands<ReturnType> {
    embed: {
      /**
       * Insert a youtube video
       */
      // eslint-disable-next-line no-unused-vars -- declared in the module
      setEmbedVideo: (options: SetEmbedVideoOptions) => ReturnType;
    };
  }
}

export const EmbedVideo = Node.create({
  name: "embed-video", // unique name for the Node
  selectable: true, // so we can select the video
  atom: true, // is a single unit

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? "inline" : "block";
  },

  draggable: true,

  addOptions() {
    return {
      addPasteHandler: true,
      allowFullscreen: true,
      autoplay: false,
      ccLanguage: undefined,
      ccLoadPolicy: undefined,
      controls: true,
      disableKBcontrols: false,
      enableIFrameApi: false,
      endTime: 0,
      height: undefined,
      interfaceLanguage: undefined,
      ivLoadPolicy: 0,
      loop: false,
      modestBranding: false,
      HTMLAttributes: {},
      inline: false,
      nocookie: false,
      origin: "",
      playlist: "",
      progressBarColor: undefined,
      width: undefined,
    };
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
      start: {
        default: 0,
      },
      width: {
        default: this.options.width,
      },
      height: {
        default: this.options.height,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-embed-video] iframe",
      },
    ];
  },

  addCommands() {
    return {
      setYoutubeVideo:
        (options: SetEmbedVideoOptions) =>
        ({ commands }) => {
          if (!isValidUrl(options.src)) {
            return false;
          }

          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addPasteRules() {
    if (!this.options.addPasteHandler) {
      return [];
    }

    return [
      nodePasteRule({
        find: GLOBAL_REGEX,
        type: this.type,
        getAttributes: (match) => {
          return {
            src: match.input,
          };
        },
      }),
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const [videoEmbedType, embedUrl] = getEmbedUrl({
      url: HTMLAttributes.src,
      allowFullscreen: this.options.allowFullscreen,
      autoplay: this.options.autoplay,
      ccLanguage: this.options.ccLanguage,
      ccLoadPolicy: this.options.ccLoadPolicy,
      controls: this.options.controls,
      disableKBcontrols: this.options.disableKBcontrols,
      enableIFrameApi: this.options.enableIFrameApi,
      endTime: this.options.endTime,
      interfaceLanguage: this.options.interfaceLanguage,
      ivLoadPolicy: this.options.ivLoadPolicy,
      loop: this.options.loop,
      modestBranding: this.options.modestBranding,
      nocookie: this.options.nocookie,
      origin: this.options.origin,
      playlist: this.options.playlist,
      progressBarColor: this.options.progressBarColor,
      startAt: HTMLAttributes.start || 0,
    });

    const DEFAULT_SIZE: Record<
      VideoEmbedType,
      { width: number; height: number }
    > = {
      youtube: { width: 640, height: 480 },
      vimeo: { width: 640, height: 360 },
    };

    HTMLAttributes.src = embedUrl;
    HTMLAttributes.width =
      this.options.width ?? DEFAULT_SIZE[videoEmbedType].width;
    HTMLAttributes.height =
      this.options.height ?? DEFAULT_SIZE[videoEmbedType].height;

    return [
      "div",
      { "data-embed-video": "" },
      [
        "iframe",
        mergeAttributes(
          this.options.HTMLAttributes,
          {
            allowfullscreen: this.options.allowFullscreen,
            autoplay: this.options.autoplay,
            ccLanguage: this.options.ccLanguage,
            ccLoadPolicy: this.options.ccLoadPolicy,
            disableKBcontrols: this.options.disableKBcontrols,
            enableIFrameApi: this.options.enableIFrameApi,
            endTime: this.options.endTime,
            interfaceLanguage: this.options.interfaceLanguage,
            ivLoadPolicy: this.options.ivLoadPolicy,
            loop: this.options.loop,
            modestBranding: this.options.modestBranding,
            origin: this.options.origin,
            playlist: this.options.playlist,
            progressBarColor: this.options.progressBarColor,
          },
          HTMLAttributes,
        ),
      ],
    ];
  },
});
