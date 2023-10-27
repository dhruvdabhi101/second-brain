import Link from "next/link";

export default function ProjectCardWithArea(props) {
  return (
    <div>
      <div className="card w-86 bg-base-100 shadow-xl hover:shadow-2xl">
        <Link href={`/dashboard/project/${props.id}`}>
          <div className="card-body ">
            <h2 className="card-title hover:text-primary">{props.name}</h2>
            {props.description.length > 30 ? (
              <p> {props.description.slice(0, 30) + "..."}</p>
            ) : (
              <p>{props.description}</p>
            )}
            <div className="badge badge-primary hover:badge-outline">
              {props.area}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
