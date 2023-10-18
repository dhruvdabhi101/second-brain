"use client";
import AreaCard from "@/components/AreaCard";
import addArea, { getAreas } from "@/services/Areas";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { Router } from "next/router";
import { useEffect, useState } from "react";

const Home = () => {
  const [search, setSearch] = useState("");
  const [areaName, setAreaName] = useState("");
  const [areaDescription, setAreaDescription] = useState("");
  const [areas, setAreas] = useState([]);
  const { push, refresh } = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      push("/login");
    }
    fetchAreas().then(() => console.log("fetched areas"));
  }, [push]);

  const createArea = async () => {
    try {
      const data = await addArea(
        areaName,
        areaDescription,
        localStorage.getItem("token")
      );
      if (data.status === 200) {
        refresh();
        await fetchAreas();
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const fetchAreas = async () => {
    const header = localStorage.getItem("token");
    const data = await getAreas(header);
    console.log(typeof data);
    console.log(data);
    setAreas(data.data.areas);
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
            Create Area{" "}
          </button>
        </div>
        {/* area modal form */}
        <dialog id="area-form" className="modal">
          <div className="modal-box">
            <p className="text-lg font-bold">Create Area</p>
            <div className="flex flex-col gap-4 my-3">
              <input
                type="text"
                placeholder="Area Name"
                className="input input-bordered focus:input-primary"
                onChange={(e) => setAreaName(e.target.value)}
              />
              <textarea
                placeholder="Description"
                className="textarea textarea-bordered focus:textarea-primary h-32"
                onChange={(e) => setAreaDescription(e.target.value)}
              />
              <div className="flex flex-row justify-between">
                <button className="btn btn-primary" onClick={createArea}>
                  Create
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => document.getElementById("area-form").close()}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button> close </button>
          </form>
        </dialog>
        {/* wrtie a map function for areas */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {areas.length > 0 ? (
            areas.map((area, i) => {
              return (
                <Link href={`/dashboard/area/${area._id}`} key={i}>
                  <AreaCard name={area.title} description={area.description} />
                </Link>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
export default Home;
