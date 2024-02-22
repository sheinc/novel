import {
  YOUTUBE_REGEX_GLOBAL,
  getEmbedUrlFromYoutubeUrl,
  isValidYoutubeUrl,
} from "./youtube";
import {
  VIMEO_REGEX_GLOBAL,
  getEmbedUrlFromVimeoUrl,
  isValidVimeoUrl,
} from "./vimeo";

export type VideoEmbedType = "youtube" | "vimeo";
export interface GetEmbedUrlOptions {
  url: string;
  allowFullscreen?: boolean;
  autoplay?: boolean;
  ccLanguage?: string;
  ccLoadPolicy?: boolean;
  controls?: boolean;
  disableKBcontrols?: boolean;
  enableIFrameApi?: boolean;
  endTime?: number;
  interfaceLanguage?: string;
  ivLoadPolicy?: number;
  loop?: boolean;
  modestBranding?: boolean;
  nocookie?: boolean;
  origin?: string;
  playlist?: string;
  progressBarColor?: string;
  startAt?: number;
}

export const GLOBAL_REGEX = new RegExp(
  `(${YOUTUBE_REGEX_GLOBAL.source})|(${VIMEO_REGEX_GLOBAL.source})`,
  "g",
);

export const isValidUrl = (url: string) => {
  return isValidYoutubeUrl(url) || isValidVimeoUrl(url);
};

export const getEmbedUrl = (
  options: GetEmbedUrlOptions,
): [VideoEmbedType, string | null] => {
  if (isValidYoutubeUrl(options.url)) {
    return ["youtube", getEmbedUrlFromYoutubeUrl(options)];
  } else if (isValidVimeoUrl(options.url)) {
    return ["vimeo", getEmbedUrlFromVimeoUrl(options)];
  }
  throw new Error("Invalid video URL");
};
