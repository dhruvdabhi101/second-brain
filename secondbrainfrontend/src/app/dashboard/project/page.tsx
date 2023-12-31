"use client";
import AreaCard from "@/components/AreaCard";
import ProjectCard from "@/components/ProjectCard";
import ProjectCardWithArea from "@/components/ProjectCardWithArea";
import addArea, { getAreas } from "@/services/Areas";
import { getProjects } from "@/services/Project";
import { getResourcesByProject } from "@/services/Resources";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { Router } from "next/router";
import { useEffect, useState } from "react";

const Home = () => {
  const { push, refresh } = useRouter();

  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      push("/login");
    }
    const fetchProjects = async () => {
      let areaIDs = [];
      const areas = await getAreas(localStorage.getItem("token"));
      let projectsArray = [];
      for (let i = 0; i < areas.data.areas.length; i++) {
        areaIDs.push(areas.data.areas[i]._id);
        const data = await getProjects(
          localStorage.getItem("token"),
          areaIDs[i]
        );
        let tempArray = [];
        for (let j = 0; j < data.data.projects.length; j++) {
          // check for archives
          data.data.projects[j].area = areas.data.areas[i].title;
          if (!data.data.projects[j].archived) {
            tempArray.push(data.data.projects[j]);
          }
        }
        projectsArray = [...projectsArray, ...tempArray];
      }
      console.log(projectsArray);
      setProjects(projectsArray);
    };
    fetchProjects().then(() => console.log("success"));
  }, [push]);

  return (
    <>
      <div className="flex flex-row flex-wrap self-center h-full w-full justify-center items-center gap-5 p-6">
        {projects.map((project: any, i: number) => {
          {
            if (!project.archived) {
              return (
                <Link href={`/dashboard/project/${project["_id"]}`}>
                  <ProjectCardWithArea
                    key={i}
                    archived={project.archived}
                    id={project._id}
                    area={project.area}
                    name={project.title}
                    description={project.description}
                  />
                </Link>
              );
            }
          }
        })}
      </div>
    </>
  );
};
export default Home;
