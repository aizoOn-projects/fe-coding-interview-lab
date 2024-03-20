import React from "react";
import { Skeleton } from "./ui/skeleton";

const PageSkeleton: React.FC = () => {
  return (
    <table className="w-full">
      <tbody>
        {Array.from({ length: 10 }).map((_, index) => (
          <tr key={index}>
            <td>
              <Skeleton className="h-8 w-full rounded-md" />
            </td>
            <td>
              <Skeleton className="h-8 w-full rounded-md" />
            </td>
            <td>
              <Skeleton className="h-8 w-full rounded-md" />
            </td>
            <td>
              <Skeleton className="h-8 w-full rounded-md" />
            </td>
            <td>
              <Skeleton className="h-8 w-full rounded-md" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PageSkeleton;
