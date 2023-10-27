"use client";
import AreaCard from "@/components/AreaCard";
import ProjectCardWithArea from "@/components/ProjectCardWithArea";
import { getAreas } from "@/services/Areas";
import { getProjects } from "@/services/Project";
import { useEffect, useState } from "react";

const Home = () => {
  const [projects, setProjects] = useState([]); // [ {title: "title", area: "area"}, ...
  const getProjectsByArea = async () => {
    const token = localStorage.getItem("token");
    const projectss = [];
    const areass = await getAreas(token);
    const areas = areass.data.areas;
    console.log(areas);
    for (let area of areas) {
      const projectOfArea = await getProjects(token, area._id);
      console.log(projectOfArea);
      for (let project of projectOfArea.data.projects) {
        project["area"] = area.title;
        console.log(project);
        if (project.archived === true) {
          projectss.push(project);
        }
      }
    }
    console.log(projectss);
    setProjects(projectss);
    console.log(projects);
  };

  useEffect(() => {
    getProjectsByArea().then(() => {
      console.log("success");
    });
  }, []);
  return (
    <>
      <div className="flex flex-col h-full w-full justify-center items-center gap-5 p-6">
        <div className="w-[100%] flex flex-col gap-7 items-center justify-center">
          <h2 className="text-3xl font-bold  hover:text-primary"> Projects </h2>
          <div className="flex md:flex-row gap-5 flex-col">
            {projects.length > 0 &&
              projects.map((project) => {
                return (
                  <ProjectCardWithArea
                    archived={project.archived}
                    id={project._id}
                    name={project.title}
                    description={project.description}
                    key={project._id}
                    area={project.area}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
