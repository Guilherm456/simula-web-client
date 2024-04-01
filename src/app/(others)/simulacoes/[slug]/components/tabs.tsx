import Link from "next/link";
import { FC } from "react";

interface Props {
  tabs: {
    url: string;
    label: string;
    disabled?: boolean;
  }[];
  actualTab: string;
}
export const Tabs: FC<Props> = ({ actualTab, tabs }) => {
  return (
    <div className="flex rounded-full">
      {tabs.map((tab, index) => (
        <Link
          href={tab.url}
          aria-label={tab.label}
          className="w-1/2 border-b-2 border-solid border-gray-4 text-center font-bold text-gray-12 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:text-gray-4 aria-selected:border-primary aria-selected:text-primary"
          aria-disabled={tab.disabled}
          aria-selected={actualTab === tab.url}
          key={index}
          id={`tab-${index}-button`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
};
