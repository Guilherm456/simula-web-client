import { ComponentPropsWithRef, ReactNode, forwardRef } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  onUpload: (file: File[]) => void;
  children: ReactNode;
} & ComponentPropsWithRef<"div">;

export const UploadFile = forwardRef<HTMLDivElement, Props>(
  ({ onUpload, children, ...props }, ref) => {
    const { getRootProps } = useDropzone({
      validator: (file) => file.type !== "text/csv",
      onDrop: (files) => onUpload(files),
      accept: {
        "text/csv": [".csv"],
      },
    });

    return (
      <div {...getRootProps()} {...props} ref={ref}>
        {children}
      </div>
    );
  },
);
