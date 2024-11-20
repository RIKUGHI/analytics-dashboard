import { FC } from "react";
import { ValueType } from "recharts/types/component/DefaultTooltipContent";

interface ISimpleTooltip {
  label: string;
  highlightedColor?: string;
  data: Data[];
}

interface Data {
  name: string;
  value: ValueType;
}

const SimpleTooltip: FC<ISimpleTooltip> = ({
  label,
  highlightedColor,
  data,
}) => {
  return (
    <div className="rounded-md text-xs overflow-hidden">
      <p className="bg-gray-100 py-1 px-2">{label}</p>
      <div className="bg-white p-1">
        {data.map(({ name, value }, i) => (
          <p key={i}>
            {name}:{" "}
            <strong
              style={{ color: highlightedColor }}
              className={highlightedColor || "text-orange-600"}
            >
              {value}
            </strong>
          </p>
        ))}
      </div>
    </div>
  );
};

export default SimpleTooltip;
