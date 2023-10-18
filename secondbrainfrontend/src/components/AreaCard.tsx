export default function AreaCard(props) {
  return (
    <div>
      <div className="card w-86 bg-base-100 shadow-xl hover:shadow-2xl">
        <div className="card-body ">
          <h2 className="card-title">{props.name}</h2>
          {props.description.length > 30 ? (
            <p> {props.description.slice(0, 30) + "..."}</p>
          ) : (
            <p>{props.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
