import React, { useState } from "react";
import { ContentState, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML, convertFromHTML } from "draft-convert";
import DOMPurify from "dompurify";
import styled from "styled-components";
import { setTextById } from "../api/textApi";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: raw;
  justify-content: center;
`;

const SavedButton = styled.div`
  display: flex;
  margin: 10px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: fit-content;
  color: white;
  border-radius: 12px;
  background-color: grey;
  cursor: pointer;
`;

const TextEditor = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(convertFromHTML(props.text))
  );
  const [convertedContent, setConvertedContent] = useState(null);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <div className="TextEditor">
      {" "}
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
      />
      <ButtonContainer>
        <SavedButton onClick={props.toggle}>Annuler</SavedButton>
        <SavedButton
          onClick={() => {
            setTextById(props.id, convertedContent).then((res) => {
              props.toggle();
            });
          }}
        >
          Enregistrer
        </SavedButton>
      </ButtonContainer>
      <div
        className="preview"
        dangerouslySetInnerHTML={createMarkup(convertedContent)}
      ></div>
    </div>
  );
};
export default TextEditor;
