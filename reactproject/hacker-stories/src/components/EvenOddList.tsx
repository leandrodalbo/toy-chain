import HistoryObject from "../model-objects/HistoryObject";

const EvenOddList = (props: any) => {
  const values: Array<HistoryObject> = props.values;
  return (
    <div>
      <ul>
        {values.map((it) => (
          <h1 key={it.id}>
            <span>{it.value}</span>:<span>{it.result}</span>
          </h1>
        ))}
      </ul>
    </div>
  );
};

export default EvenOddList;
