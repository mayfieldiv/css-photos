import Editor from '@monaco-editor/react';
import React from 'react';
import styled from 'styled-components';

export interface HtmlEditorProps {
  defaultValue?: string;
  onChange?: (value: string | undefined) => void;
}

const StyledHtmlEditor = styled.div`
  color: pink;
`;

export function HtmlEditor(props: HtmlEditorProps) {
  return (
    <StyledHtmlEditor>
      <Editor
        theme="vs-dark"
        defaultLanguage="html"
        defaultValue={props.defaultValue}
        onChange={(value) => props.onChange?.(value)}
        options={{
          scrollbar: { alwaysConsumeMouseWheel: false },
          scrollBeyondLastLine: false,
        }}
      ></Editor>
    </StyledHtmlEditor>
  );
}

export default HtmlEditor;
