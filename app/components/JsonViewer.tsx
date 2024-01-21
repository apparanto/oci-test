"use client";

import React from "react";
import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

type JsonViewerProps = {
  json: any;
};

export default function JsonViewer(props: JsonViewerProps) {
  return (
    <div>
      <JsonView
        data={props.json}
        style={defaultStyles}
        shouldExpandNode={allExpanded}
      />
    </div>
  );
}
