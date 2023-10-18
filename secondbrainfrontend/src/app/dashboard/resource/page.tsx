"use client";
import AreaCard from "@/components/AreaCard";
import addArea, { getAreas } from "@/services/Areas";
import { getResourcesByProject } from "@/services/Resources";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { Router } from "next/router";
import { useEffect, useState } from "react";

const Home = () => {
  const { push, refresh } = useRouter();

  const [search, setSearch] = useState("");
  const [resources, setResources] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      push("/login");
    }
    const getAllResources = async () => {
      let resArray = [];
      const areas = await getAreas(localStorage.getItem("token"));
      console.log(areas);
      let projectData = [];
      if (areas.status === 200) {
        // get all _id of projects from areas and push it into projectData
        for (let i = 0; i < areas.data.areas.length; i++) {
          for (let j = 0; j < areas.data.areas[i].projects.length; j++) {
            projectData.push(areas.data.areas[i].projects[j]);
          }
        }
        // get resources from projects
        for (let i = 0; i < projectData.length; i++) {
          const res = await getResourcesByProject(
            localStorage.getItem("token"),
            projectData[i]
          );
          resArray = [...resArray, ...res.data.resources];
        }
        console.log(resArray);
        setResources(resArray);
      }
    };
    getAllResources().then(() => console.log("success"));
  }, [push]);

  return (
    <>
      <div className="flex flex-col self-center h-full w-full justify-center items-center gap-5 p-6"></div>
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
    </>
  );
};
export default Home;
