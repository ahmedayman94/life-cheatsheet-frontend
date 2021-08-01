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
  function _onBoldClick() {
    const newState = RichUtils.toggleInlineStyle(postEditorState, "BOLD");
    onEditorChange(newState);
  }

  function _onOlListClick() {
    const newState = RichUtils.toggleBlockType(
      postEditorState,
      "ordered-list-item"
    );
    onEditorChange(newState);
  }
  return (
    <div className="style-options pb-2 mb-3">
      <TypeBold className="mx-3 style-type" onClick={_onBoldClick} />
      <CodeSquare className="mx-3 style-type" />
      <ListOl className="mx-3" onClick={_onOlListClick} />
      <ListUl className="mx-3" />
    </div>
  );
};

export default StyleOptions;
