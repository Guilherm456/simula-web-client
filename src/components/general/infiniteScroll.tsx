import {
  ComponentPropsWithRef,
  FC,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
} from "react";

type Props = {
  onEndReached: () => void | Promise<void>;
} & ComponentPropsWithRef<"div">;
export const InfiniteScroll: FC<Props> = forwardRef(
  ({ onEndReached, children, ...props }, ref) => {
    const endRef = useRef<HTMLDivElement>(null);
    const handleIntersection = useCallback(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) {
          onEndReached?.();
        }
      },
      [onEndReached],
    );

    useEffect(() => {
      if (!endRef.current) return;

      const observer = new IntersectionObserver(handleIntersection, {});

      observer.observe(endRef.current);

      return () => observer.disconnect();
    }, [endRef.current, handleIntersection]);

    return (
      <div {...props} ref={ref}>
        {children}
        <div ref={endRef} className="invisible" />
      </div>
    );
  },
);
