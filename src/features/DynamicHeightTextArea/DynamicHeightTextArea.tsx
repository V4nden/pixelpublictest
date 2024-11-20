import classNames from "classnames";
import React, {
  ComponentProps,
  ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";

interface DynamicHeightTextAreaProps extends ComponentProps<"textarea"> {}

const DynamicHeightTextArea = forwardRef<
  HTMLTextAreaElement,
  DynamicHeightTextAreaProps
>(({ className, ...props }, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
      textareaRef.current.addEventListener("input", (e) => {
        const target = e.target as HTMLTextAreaElement;
        target.style.height = "";
        target.style.height = target.scrollHeight + "px";
      });
    }
    return () => {};
  }, [textareaRef.current]);

  const setRef = (element: HTMLTextAreaElement) => {
    textareaRef.current = element;
    if (typeof ref === "function") {
      ref(element);
    } else if (ref) {
      ref.current = element;
    }
  };

  return (
    <textarea
      className={classNames(
        "resize-none overflow-y-scroll max-h-96 scrollbar-hide",
        className
      )}
      ref={setRef}
      {...props}
    />
  );
});

DynamicHeightTextArea.displayName = "DynamicHeightTextArea";

export default DynamicHeightTextArea;
