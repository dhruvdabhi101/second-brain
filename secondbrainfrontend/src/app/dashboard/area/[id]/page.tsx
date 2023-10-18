"use client";
import AreaCard from "@/components/AreaCard";
import { getAreaById } from "@/services/Areas";
import { getProjects, createProject } from "@/services/Project";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [area, setArea] = useState({});
  const [projects, setProjects] = useState([]);

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  useEffect(() => {
    const header = localStorage.getItem("token");
    const id = params.id;
    fetchAreaAndProjects(header, id).then(() => console.log("fetched area"));
  }, [params.id]);
  const fetchAreaAndProjects = async (header: string, id: string) => {
    const data = await getAreaById(header, id);
    if (data.status === 200) {
      setArea(data.data.area);
      const projectdata = await getProjects(header, data.data.area["_id"]);
      setProjects(projectdata.data.projects);
      console.log(projectdata.data.projects);
    } else {
      console.log(data);
    }
  };

  const fetchProjects = async () => {
    const header = localStorage.getItem("token");
    const projectdata = await getProjects(header, area["_id"]);
    if (projectdata.status === 200) {
      setProjects(projectdata.data.projects);
    }
    console.log(projectdata);
  };

  const addProject = async () => {
    try {
      const data = await createProject(
        localStorage.getItem("token"),
        projectName,
        projectDescription,
        area["_id"]
      );
      if (data.status === 200) {
        await fetchProjects();
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-col self-center h-full w-full justify-center items-center gap-5 p-6">
        <div className="w-[70%]">
          <button
            className="btn btn-primary self-start"
            onClick={() => document.getElementById("area-form").showModal()}
          >
            {" "}
            Create Project{" "}
          </button>
        </div>
        {/* area modal form */}
        <dialog id="area-form" className="modal">
          <div className="modal-box">
            <p className="text-lg font-bold">Create Area</p>
            <div className="flex flex-col gap-4 my-3">
              <input
                type="text"
                placeholder="Project Name"
                className="input input-bordered focus:input-primary"
                onChange={(e) => setProjectName(e.target.value)}
              />
              <textarea
                placeholder="Description"
                className="textarea textarea-bordered focus:textarea-primary h-32"
                onChange={(e) => setProjectDescription(e.target.value)}
              />
              <div className="flex flex-row justify-between">
                <button className="btn btn-primary" onClick={addProject}>
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
        <div className="flex flex-col gap-5 w-full">
          {projects.map((project: any, i: number) => (
            <AreaCard
              key={i}
              name={project.title}
              description={project.description}
            />
          ))}
        </div>
      </div>
    </>
  );
}
