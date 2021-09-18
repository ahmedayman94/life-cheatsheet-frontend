import { EditorState, RichUtils } from "draft-js";
import React from "react";
import { CodeSquare, ListOl, ListUl, TypeBold } from "react-bootstrap-icons";
import "./StyleOptions.css";

export interface StyleOptionsProps {
  postEditorState: EditorState;
  onEditorChange: (editorState: EditorState) => void;
}

const StyleOptions: React.FunctionComponent<StyleOptionsProps> = ({
  postEditorState,
  onEditorChange,
}) => {
  function onBoldClick() {
    const newState = RichUtils.toggleInlineStyle(postEditorState, "BOLD");
    onEditorChange(newState);
  }

  function onCodeBlockClick() {
    const newState = RichUtils.toggleInlineStyle(postEditorState, "CODE");
    onEditorChange(newState);
  }

  function onOlListClick() {
    const newState = RichUtils.toggleBlockType(
      postEditorState,
      "ordered-list-item"
    );
    onEditorChange(newState);
  }

  function onUlListClick() {
    const newState = RichUtils.toggleBlockType(
      postEditorState,
      "unordered-list-item"
    );
    onEditorChange(newState);
  }

  return (
    <div className="style-options pb-2 mb-3">
      <TypeBold className="mx-3 style-type" onClick={onBoldClick} />
      <CodeSquare className="mx-3 style-type" onClick={onCodeBlockClick} />
      <ListOl className="mx-3" onClick={onOlListClick} />
      <ListUl className="mx-3" onClick={onUlListClick} />
    </div>
  );
};

export default StyleOptions;
