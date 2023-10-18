import axios from "axios";

export async function addResource(
  header,
  title,
  description,
  projectID,
  type,
  link,
  markdown
) {
  const headers = { Authorization: `Bearer ${header}` };

  const res = await axios.post(
    "http://localhost:3000/api/resource",
    {
      title: title,
      description: description,
      projectID: projectID,
      type: type,
      link: link,
      markdownContent: markdown,
    },
    { headers: headers }
  );
  return res;
}

export async function getResourcesByProject(header, pid) {
  const headers = { Authorization: `Bearer ${header}` };
  const res = await axios.get(
    `http://localhost:3000/api/project/resources/${pid}`,
    {
      headers: headers,
    }
  );
  return res;
}

export async function getResource(header, id) {
  const headers = { Authorization: `Bearer ${header}` };
  const res = await axios.get(`http://localhost:3000/api/resource/${id}`, {
    headers: headers,
  });
  return res;
}

export async function updateRes(header, id, resource) {
  const headers = { Authorization: `Bearer ${header}` };
  const res = await axios.put(
    `http://localhost:3000/api/resource/${id}`,
    resource,
    {
      headers: headers,
    }
  );
  return res;
}
export async function deleteRes(header, id) {
  const headers = { Authorization: `Bearer ${header}` };
  const res = await axios.delete(`http://localhost:3000/api/resource/${id}`, {
    headers: headers,
  });
  return res;
}
