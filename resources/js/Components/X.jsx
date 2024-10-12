import React, { forwardRef, useEffect, useRef } from "react";

const createFormComponent = (Component) =>
  forwardRef(({ className = "", isFocused = false, ...props }, ref) => {
    const localRef = useRef(null);

    useEffect(() => {
      if (isFocused && localRef.current) {
        localRef.current.focus();
      }
    }, [isFocused]);

    return (
      <Component
        {...props}
        className={`rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${className}`}
        ref={(node) => {
          localRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
      />
    );
  });

export const TextInput = createFormComponent("input");
export const TextAreaInput = createFormComponent("textarea");
