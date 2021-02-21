import Editor from '@monaco-editor/react';
import React from 'react';

export interface HtmlEditorProps {
  defaultValue?: string;
  onChange?: (value: string | undefined) => void;
}

export function HtmlEditor(props: HtmlEditorProps) {
  return (
    <div>
      <Editor
        theme="vs-dark"
        defaultLanguage="html"
        defaultValue={props.defaultValue}
        onChange={(value) => props.onChange?.(value)}
        options={{
          // scrollbar: { alwaysConsumeMouseWheel: false },
          scrollBeyondLastLine: false,
        }}
      ></Editor>
    </div>
  );
}

export default HtmlEditor;
