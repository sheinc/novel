import "./styles/globals.css";

import React from "react";
import { Builder } from "@builder.io/react";
import { Editor as NovelEditor, createSlashCommand } from "@sheinc/novel";

const STORAGE_KEY = "builder-novel";

interface PluginProps {
  value: object;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: object) => void;
}
const RichTextEditor = (props: PluginProps) => {
  // @ts-ignore
  const slashCommandExtension = createSlashCommand({
    suggestionItems: [],
  });
  const extensions = [slashCommandExtension];
  return (
    // @ts-ignore
    <NovelEditor
      extensions={extensions}
      defaultValue={props.value}
      autofocus={false}
      onUpdate={(editor) => {
        if (!editor) return;
        props.onChange(editor.getJSON());
      }}
      storageKey={STORAGE_KEY}
    />
  );
};

Builder.registerEditor({
  name: "WysiwygEditor",
  component: RichTextEditor,
});
