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
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      push("/login");
    }
  }, [push]);

  return (
    <>
      <div className="flex flex-col self-center h-full w-full justify-center items-center gap-5 p-6"></div>
    </>
  );
};
export default Home;
