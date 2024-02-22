import { GetEmbedUrlOptions } from ".";

export const VIMEO_REGEX =
  /^(https:\/\/player\.vimeo\.com\/video\/|https:\/\/vimeo\.com\/)\d+$/;
export const VIMEO_REGEX_GLOBAL =
  /^(https:\/\/player\.vimeo\.com\/video\/|https:\/\/vimeo\.com\/)\d+$/;

export const isValidVimeoUrl = (url: string) => {
  return url.match(VIMEO_REGEX);
};

export const getEmbedUrlFromVimeoUrl = (options: GetEmbedUrlOptions) => {
  const { url } = options;

  if (!isValidVimeoUrl(url)) {
    return null;
  }

  if (!url.includes("player")) {
    // NOTE: if the url is not an embed url, we need to convert it to an embed url
    const videoId = url.match(/\d+/);
    return `https://player.vimeo.com/video/${videoId}`;
  }

  return url;
};
