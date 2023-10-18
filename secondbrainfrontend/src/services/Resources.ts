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

export async function getResourcesByProject(header, resourceid) {
  const headers = { Authorization: `Bearer ${header}` };
  const res = await axios.get(
    `http://localhost:3000/api/project/resources/${resourceid}`,
    {
      headers: headers,
    }
  );
  return res;
}

export async function getResources(header, projectID) {
  const headers = { Authorization: `Bearer ${header}` };
  const res = await axios.get(
    `http://localhost:3000/api/resource/${projectID}`,
    {
      headers: headers,
    }
  );
  return res;
}
