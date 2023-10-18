import axios from "axios";

export default async function addArea(
  areaName: string,
  areaDescription: string,
  header: string
) {
  const headers = { Authorization: `Bearer ${header}` };
  const res = await axios.post(
    "http://localhost:3000/api/area",
    {
      title: areaName,
      description: areaDescription,
    },
    { headers: headers }
  );
  return res;
}

export async function getAreas(header: string) {
  const headers = { Authorization: `Bearer ${header}` };
  const res = await axios.get("http://localhost:3000/api/area", {
    headers: headers,
  });
  return res;
}

export async function getAreaById(header: string, id) {
  const headers = { Authorization: `Bearer ${header}` };
  const res = await axios.get(`http://localhost:3000/api/area/${id}`, {
    headers: headers,
  });
  return res;
}

export async function updateArea(area, header, id) {
  const headers = { Authorization: `Bearer ${header}` };
  const res = await axios.put(`http://localhost:3000/api/area/${id}`, area, {
    headers: headers,
  });
  return res;
}

export async function deleteArea(header, id) {
  const headers = { Authorization: `Bearer ${header}` };
  const res = await axios.delete(`http://localhost:3000/api/area/${id}`, {
    headers: headers,
  });
}
