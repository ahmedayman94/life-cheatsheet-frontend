import { convertFromRaw, convertToRaw, Editor, EditorState } from "draft-js";
import React, { useState } from "react";

export interface EditorHelperProps {
  rawContent: string;
}

const EditorHelper = ({ rawContent }: EditorHelperProps) => {
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
