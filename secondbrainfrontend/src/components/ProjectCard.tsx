export default function ProjectCard(props) {
  return (
    <div>
      <div className="card w-86 bg-base-100 shadow-xl hover:shadow-2xl flex flex-row items-center">
        <div className="card-body bg-base-100 ">
          <div>
            <h2 className="card-title hover:text-primary transition-colors">
              {props.name}
            </h2>
            {props.description.length > 30 ? (
              <p> {props.description.slice(0, 30) + "..."}</p>
            ) : (
              <p>{props.description}</p>
            )}
          </div>
        </div>
        {props.pushToArchived && (
          <div>
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              onChange={props.pushToArchived}
            />
          </div>
        )}
      </div>
    </div>
  );
}
