import React, { memo } from "react";
import { MemoProps } from "./ClientComponent";
import { formatJapaneseTime } from "@/app/utils/formatJapaneseTime";

const DataList = memo(function DataList({ memo }: { memo: MemoProps[] }) {
  const reversedMemo = [...memo].reverse();
  return (
    <ul className="flex flex-col gap-1 max-w-3xl border-white border-2">
      {reversedMemo.map((item) => (
        <li className="p-8 border-4 border-black relative" key={item.id}>
          <span className="text-xl">{item.memo}</span>
          <span className="text-sm text-gray-400 absolute right-0 bottom-1">
            {formatJapaneseTime(item.created_at)}
          </span>
        </li>
      ))}
    </ul>
  );
});

export default DataList;
