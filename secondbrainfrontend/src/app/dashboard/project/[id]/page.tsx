"use client";
import ProjectCard from "@/components/ProjectCard";
import { getAreaById } from "@/services/Areas";
import { getProjects, createProject, updateProject } from "@/services/Project";
import Link from "next/link";
import { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";
import remarkGfm from "remark-gfm";
import { addResource, getResourcesByProject } from "@/services/Resources";

export default function Page({ params }: { params: { id: string } }) {
  const [resources, setResources] = useState([]);
  const [linkMode, setLinkMode] = useState(false);
  const [markdownMode, setMarkdownMode] = useState(false);
  const [markdownContent, setMarkdownContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const createResource = async () => {
    try {
      const header = localStorage.getItem("token");
      let mode = "markdown";
      if (linkMode === true) {
        mode = "link";
      }
      const data = await addResource(
        header,
        title,
        description,
        params.id,
        mode,
        link,
        markdownContent
      );
      if (data.status === 200) {
        console.log(data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchBarOn = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "k") {
      document.getElementById("search-bar").focus();
    }
  };

  const options = {
    overrides: {
      h1: {
        component: ({ children, ...props }) => (
          <h1 className="text-3xl font-bold underline" {...props}>
            {children}
          </h1>
        ),
      },
    },
  };
  const fetchResources = async () => {
    const header = localStorage.getItem("token");
    const data = await getResourcesByProject(header, params.id);
    if (data.status === 200) {
      console.log(data.data.resources);
      setResources(data.data.resources);
    }
  };

  useEffect(() => {
    const header = localStorage.getItem("token");
    const fetchResources = async () => {
      const header = localStorage.getItem("token");
      const data = await getResourcesByProject(header, params.id);
      if (data.status === 200) {
        console.log(data.data.resources);
        setResources(data.data.resources);
      }
    };
    fetchResources().then((data) => console.log(data));
  }, [params.id]);

  return (
    <>
      <div className="flex flex-col self-center h-full w-full justify-center items-center gap-5 p-6">
        <div className="w-[70%] flex flex-row gap-5 justify-center items-center">
          <button
            className="btn btn-primary self-start"
            onClick={() => document.getElementById("area-form").showModal()}
          >
            {" "}
            Create Resources{" "}
          </button>
          <input
            type="text"
            id="search-bar"
            placeholder="Search Project with Ctrl + K"
            className="input input-bordered  w-full max-w-xs focus:input-primary"
          />
        </div>
        {/* area modal form */}
        <dialog id="area-form" className="modal">
          <div className="modal-box">
            <p className="text-lg font-bold">Create Resource</p>
            <div className="flex flex-col gap-4 my-3">
              <input
                type="text"
                placeholder="Resource Title"
                className="input input-bordered focus:input-primary"
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Description"
                className="textarea textarea-bordered focus:textarea-primary h-32"
                onChange={(e) => setDescription(e.target.value)}
              />
              {linkMode === true ? (
                <input
                  type="text"
                  className="input input-bordered focus:input-primary"
                  placeholder="Link"
                  onChange={(e) => setLink(e.target.value)}
                />
              ) : (
                <>
                  {markdownMode === true ? (
                    <div className="">
                      Markdown:
                      <div className="border-[1px] border-gray-600 rounded-md p-5 prose lg:prose-xl">
                        <Markdown options={options}>{markdownContent}</Markdown>
                      </div>
                    </div>
                  ) : (
                    <>
                      <textarea
                        placeholder="Markdown Content"
                        value={markdownContent}
                        className="textarea textarea-bordered focus:textarea-primary h-32"
                        onChange={(e) => setMarkdownContent(e.target.value)}
                      />
                    </>
                  )}
                  <div className="flex flex-row gap-3">
                    <p> See markdown:</p>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      onChange={(e) => setMarkdownMode(!markdownMode)}
                    />
                  </div>
                </>
              )}
              <div className="flex flex-row gap-3">
                <p> Set Link Mode: </p>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  onChange={() => setLinkMode(!linkMode)}
                />
              </div>
              <div className="flex flex-row justify-between">
                <button className="btn btn-primary" onClick={createResource}>
                  Create
                </button>
                {/* <button className="btn btn-secondary">Close</button> */}
              </div>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button> close </button>
          </form>
        </dialog>
        <div className="w-[100%] flex flex-center justify-center">
          <table className="table w-[60%] ">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Type</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {resources.length &&
                resources.map((resource, i) => {
                  return (
                    <tr key={i} className="hover:bg-primary">
                      {/* <Link
                        href={`/dashboard/resource/${resource._id}`}
                        key={i}
                      > */}
                      <th>{i}</th>
                      <td>{resource.title}</td>
                      <td>{resource.type}</td>
                      <td>
                        <Link href={`/dashboard/resource/${resource["_id"]}`}>
                          Link{" "}
                        </Link>
                      </td>

                      {/* </Link> */}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
