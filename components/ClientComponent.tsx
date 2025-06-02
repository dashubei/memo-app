"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import DataList from "./DataList";
import { createClient } from "@supabase/supabase-js";
import { fetchMemo } from "@/app/utils/api/fetchMemo";

export type MemoProps = {
  id: number;
  created_at: string;
  memo: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey); // ← ここはコンポーネント外で作るのがおすすめ

export default function ClientComponent() {
  const [text, setText] = useState("");
  const [memo, setMemo] = useState<MemoProps[] | null>([]);

  const fetchData = async () => {
    const newData = await fetchMemo();
    setMemo(newData);
  };
  useEffect(() => {
    const init = async () => {
      const newMemo = await fetchMemo();
      setMemo(newMemo);
    };
    init();
  }, []);

  const handleMemo = async (): Promise<void> => {
    if (!text.trim()) return;

    const { error } = await supabase.from("memo").insert([{ memo: text }]);

    if (error) {
      console.error(error);
      alert("メモの追加に失敗しました！");
      return;
    }

    await fetchData();
    setText("");
  };

  return (
    <div>
      <div className="flex max-w-full">
        <Button
          onClick={handleMemo}
          variant="outline"
          size="lg"
          className="cursor-pointer text-black"
        >
          追加
        </Button>
        <Textarea
          className="text-white"
          placeholder="Type your message here."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      {memo === null ? (
        <div className="text-white">メモがありません。</div>
      ) : (
        <DataList memo={memo} />
      )}
    </div>
  );
}
