import React from "react";

export default function DeleteIcon(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      aria-hidden="true"
    >
      <path d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12z" fill="#c42b2b"/>
      <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="#c42b2b"/>
    </svg>
  );
}
