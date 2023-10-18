"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";
import remarkGfm from "remark-gfm";
import {
  addResource,
  getResource,
  getResourcesByProject,
  updateRes,
  deleteRes,
} from "@/services/Resources";
import { redirect } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");
  const [markdownMode, setMarkdownMode] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [resource, setResource] = useState({});

  const fetchResource = async () => {
    const header = localStorage.getItem("token");
    const data = await getResource(header, params.id);
    if (data.status === 200) {
      console.log(data.data.resource);
      setResource(data.data.resource);
      setTitle(data.data.resource.title);
      setDescription(data.data.resource.description);
      setMarkdownContent(data.data.resource.markdownContent);
      setLink(data.data.resource.link);
    } else {
      console.log(data);
    }
  };

  const updateData = async () => {
    const header = localStorage.getItem("token");
    const data = await updateRes(header, params.id, {
      title: title,
      description: description,
      markdownContent: markdownContent,
      link: link,
    });
    if (data.status === 200) {
      console.log("success");
    } else {
      console.log("failure");
    }
  };

  const deleteData = async () => {
    const header = localStorage.getItem("token");
    const data = await deleteRes(header, params.id);
    if (data.status === 200) {
      console.log("success");
      redirect("/dashboard");
    } else {
      console.log("failure");
    }
  };

  useEffect(() => {
    const header = localStorage.getItem("token");
    const fetchResource = async () => {
      const header = localStorage.getItem("token");
      const data = await getResource(header, params.id);
      if (data.status === 200) {
        console.log(data.data.resource);
        setResource(data.data.resource);
        setTitle(data.data.resource.title);
        setDescription(data.data.resource.description);
        setMarkdownContent(data.data.resource.markdownContent);
        setLink(data.data.resource.link);
      } else {
        console.log(data);
      }
    };
    fetchResource().then(() => console.log("fetched resource"));
  }, [params.id]);

  return (
    <>
      <div className="flex flex-col self-center h-full w-full justify-center items-center gap-5 p-6">
        <div className="w-[70%] flex flex-row gap-5 lg:w-[50%]">
          {resource && !updateMode && (
            <div className="flex flex-col gap-3 w-full justify-center">
              <p className="text-3xl font-extrabold hover:text-primary">
                {resource.title}
              </p>
              <p className="text-gray-500"> {resource.description}</p>
              <p className="">
                {" "}
                Mode: <span>{resource.type}</span>
              </p>
              {resource.type === "link" && (
                <a href={resource.link} className="text-primary">
                  {" "}
                  {resource.link}
                </a>
              )}
              <span className="gap-4 flex flex-row">
                Edit Mode:
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  onChange={(e) => setUpdateMode(!updateMode)}
                />{" "}
              </span>
              {resource.type === "markdown" && (
                <div className="prose border-[1px] border-gray-600 rounded-md w-full p-4 mt-8">
                  <Markdown>{resource.markdownContent}</Markdown>
                </div>
              )}
            </div>
          )}

          {resource && updateMode && (
            <div className="flex flex-col gap-3 w-full justify-center">
              <input
                type="text"
                className="input input-bordered focus:input-primary"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                className="input input-bordered focus:input-primary"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <p className="">
                {" "}
                Mode: <span>{resource.type}</span>
              </p>
              {resource.type === "link" && (
                <input
                  type="text"
                  className="input input-bordered focus:input-primary"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              )}
              <span className="gap-4 flex flex-row">
                Edit Mode:
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={updateMode}
                  onChange={(e) => setUpdateMode(!updateMode)}
                />{" "}
              </span>
              {resource.type === "markdown" && (
                <>
                  <textarea
                    value={markdownContent}
                    className=" border-[1px] border-gray-600 bg-base-200 rounded-md w-[100%] h-64 p-4 mt-8 focus:border-primary"
                    onChange={(e) => setMarkdownContent(e.target.value)}
                  />
                </>
              )}
              <div className="flex flex-col justify-center items-center gap-4">
                <button
                  className="btn btn-primary md:w-64"
                  onClick={updateData}
                >
                  {" "}
                  Update{" "}
                </button>
                <button className="btn btn-error md:w-64 " onClick={deleteData}>
                  {" "}
                  Delete{" "}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
