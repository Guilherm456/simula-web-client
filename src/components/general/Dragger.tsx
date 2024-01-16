"use client";
import { ComponentProps, FC, useRef } from "react";

import { useDraggable } from "react-use-draggable-scroll";

type Props = ComponentProps<"div">;

export const Dragger: FC<Props> = ({ children, ...props }) => {
  const ref = useRef();
  const { events } = useDraggable(ref);
  return (
    <div ref={ref} {...events} {...props}>
      {children}
    </div>
  );
};
