import axios from "axios";

export async function createProject(header, title, description, areaID) {
  const headers = { Authorization: `Bearer ${header}` };
  const res = await axios.post(
    "http://localhost:3000/api/project",
    {
      title: title,
      description: description,
      areaID: areaID,
    },
    { headers: headers }
  );
  return res;
}

export async function getProject(header, id) {
  const headers = { Authorization: `Bearer ${header}` };
  const res = await axios.get(`http://localhost:3000/api/project/${id}`, {
    headers: headers,
  });
  return res;
}

export async function getProjects(header, aid) {
  const headers = { Authorization: `Bearer ${header}` };
  const res = await axios.get(`http://localhost:3000/api/area/project/${aid}`, {
    headers: headers,
  });
  return res;
}

export async function updateProject(header, project, id) {
  const headers = { Authorization: `Bearer ${header}` };
  const res = await axios.put(
    "http://localhost:3000/api/project/" + id,
    project,
    {
      headers: headers,
    }
  );
  return res;
}
export async function deleteProject(header, id) {
  const headers = { Authorization: `Bearer ${header}` };
  const res = await axios.delete(`http://localhost:3000/api/project/${id}`, {
    headers: headers,
  });
  return res;
}
