"use client";
import "ace-builds/src-noconflict/ace";
import { forwardRef } from "react";
import AceEditor, { AceEditorProps } from "react-ace-builds";

import "ace-builds/src-min-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/ext-beautify";
import "ace-builds/src-noconflict/ext-error_marker";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-settings_menu";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/snippets/javascript";

type Props = {
  label?: string;
  id?: string;
} & AceEditorProps;

export const CodeTextArea = forwardRef<AceEditorProps, Props>(
  ({ label, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col gap-2">
        {label && <label className={"font-medium text-gray-12"}>{label}</label>}
        <AceEditor
          mode="javascript"
          theme="github_dark"
          showGutter
          showPrintMargin
          fontSize={14}
          enableBasicAutocompletion
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

CodeTextArea.displayName = "CodeTextArea";
