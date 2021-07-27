import { convertFromRaw, Editor, EditorState } from "draft-js";
import { useState } from "react";

export interface EditorHelperProps {
  rawContent: string;
}

const EditorHelper: React.FunctionComponent<EditorHelperProps> = ({
  rawContent,
}) => {
  const content = convertFromRaw(JSON.parse(rawContent));
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createWithContent(content)
  );

  return (
    <>
      <Editor editorState={editorState} onChange={setEditorState} />
    </>
  );
};

export default EditorHelper;
