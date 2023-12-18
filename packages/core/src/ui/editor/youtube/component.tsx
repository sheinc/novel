import {
  Editor,
  NodeViewContent,
  NodeViewWrapper,
  NodeViewProps,
} from "@tiptap/react";
import React from "react";
import { YoutubeIcon } from "lucide-react";

type Props = {} & NodeViewProps;
export default (props: Props) => {
  const [youtubeLink, setYoutubeLink] = React.useState("");

  console.log("youtube Link", youtubeLink);

  return (
    <NodeViewWrapper className="youtube-placeholder">
      <div
        className="novel-bg-stone-100 novel-w-full novel-p-5 novel-flex novel-justify-center"
        // contentEditable={false}
      >
        <div>😃</div>
        {/* <YoutubeIcon className="novel-mr-2" /> Youtube */}
        <div className="novel-w-half novel-h-5 novel-border">
          {/* <YoutubeIcon /> */}
          <NodeViewContent>
            {/* <input
              type="text"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
            />
            <button
              onClick={() => {
                // Remove Current Node (Youtube placeholder)
                // props.editor.commands.removeNode();
                console.log("test");
                // props.editor.commands.toggleNode("react-component", "youtube", {
                //   src: "https://www.youtube.com/watch?v=35kwlY_RR08",
                // });
                // Show the YouTube Node
                props.editor
                  .chain()
                  .deleteNode("react-component")
                  // .toggleNode("paragraph", "youtube", {
                  //   src: youtubeLink,
                  // })
                  // .clearContent()
                  .insertContent({
                    type: "youtube",
                    attrs: {
                      src: youtubeLink,
                    },
                  })
                  // .selectNodeForward()
                  // .selectNodeForward()
                  // .focus()
                  .run();
              }}
            >
              link
            </button> */}
          </NodeViewContent>
        </div>
      </div>
    </NodeViewWrapper>
  );
};
