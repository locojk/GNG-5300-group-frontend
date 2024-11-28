import React, { ReactNode } from "react";

interface CardDataStatsProps {
  title: string;
  total: string;
  rate?: string;
  icon?: ReactNode;
  isPositive?: boolean;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  icon,
  isPositive,
}) => {
  return (
    <div className="rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center">
        {icon && <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200 dark:bg-blue-700">{icon}</div>}
      </div>

      <div className="mt-3 flex items-end justify-between">
        <div>
          <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">{total}</h4>
          <span className="text-sm text-gray-600 dark:text-gray-300">{title}</span>
        </div>

        {rate && (
          <span
            className={`flex items-center gap-1 text-sm font-medium ${
              isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {rate}

            {isPositive ? (
              <svg
                className="fill-green-500"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                  fill=""
                />
              </svg>
            ) : (
              <svg
                className="fill-red-500"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                  fill=""
                />
              </svg>
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default CardDataStats;

