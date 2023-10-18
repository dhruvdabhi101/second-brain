"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";
import remarkGfm from "remark-gfm";
import { addResource, getResourcesByProject } from "@/services/Resources";

export default function Page({ params }: { params: { id: string } }) {
  const [markdownMode, setMarkdownMode] = useState(false);
  const [markdownContent, setMarkdownContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const fetchResource = async () => {};

  useEffect(() => {
    const header = localStorage.getItem("token");
    const fetchResource = async () => {
      const header = localStorage.getItem("token");
    };
  }, []);

  return (
    <>
      <div className="flex flex-col self-center h-full w-full justify-center items-center gap-5 p-6">
        <div className="w-[70%] flex flex-row gap-5 justify-center items-center"></div>
      </div>
    </>
  );
}
