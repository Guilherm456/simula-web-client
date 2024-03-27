import { StructureParameters } from "@models/structure.model";
import { cn } from "@utils/utils";
import { Dispatch, FC, SetStateAction } from "react";
import { Dragger } from "../Dragger";

interface Props {
  activeTab: StructureParameters | null;
  setActiveTab: Dispatch<SetStateAction<StructureParameters | null>>;
  activeSubTab: StructureParameters | null;
  setActiveSubTab: Dispatch<SetStateAction<StructureParameters | null>>;
  tabs: StructureParameters[];
  value: object;
  onChange: (id: string | null) => void;
}

export const Tabs: FC<Props> = ({
  activeSubTab,
  activeTab,
  setActiveSubTab,
  setActiveTab,
  tabs,
  value,
  onChange,
}) => {
  const handleChangeTab = (tabKey: StructureParameters, isSub?: boolean) => {
    if (isSub) {
      setActiveSubTab(tabKey);

      onChange(value[activeTab?.name][tabKey.name]);
    } else {
      setActiveTab(tabKey);
      setActiveSubTab(null);
      if (!tabKey?.subParameters?.length) onChange(value[tabKey.name]);
      else onChange(null);
    }
  };

  const Tab = ({ tabKey }: { tabKey: StructureParameters }) => (
    <button
      className={cn(
        `w-max min-w-[150px] truncate border-0 border-solid px-4 py-2 text-gray-12`,
        "aria-selected:border-b-2 aria-selected:border-blue-500 aria-selected:font-semibold aria-selected:text-blue-500",
      )}
      aria-selected={activeTab?.name === tabKey.name}
      aria-label={`Parâmetro ${tabKey.name}`}
      id={`tab-${tabKey.name}`}
      onClick={() => handleChangeTab(tabKey)}
    >
      {tabKey.name}
    </button>
  );

  const SubTab = ({ tabKey }: { tabKey: StructureParameters }) => (
    <button
      className={cn(
        `w-max min-w-[150px] truncate border-0 border-solid px-4 py-2 text-gray-12`,
        "aria-selected:border-b-2 aria-selected:border-blue-500 aria-selected:font-semibold aria-selected:text-blue-500",
      )}
      aria-selected={activeSubTab?.name === tabKey.name}
      aria-label={`Parâmetro ${tabKey.name}`}
      id={`subtab-${tabKey.name}`}
      onClick={() => handleChangeTab(tabKey, true)}
    >
      {tabKey.name}
    </button>
  );

  return (
    <div className="grid">
      <Dragger className="flex gap-2 overflow-x-auto bg-gray-3 px-3">
        {tabs?.map((key, index) => <Tab key={index} tabKey={key} />)}
      </Dragger>
      {activeTab && activeTab?.subParameters?.length > 0 && (
        <Dragger className="flex gap-2 overflow-x-auto bg-gray-4 px-4">
          {activeTab?.subParameters?.map((key, index) => (
            <SubTab key={index} tabKey={key} />
          ))}
        </Dragger>
      )}
    </div>
  );
};
