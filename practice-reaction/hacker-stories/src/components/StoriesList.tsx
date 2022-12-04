import Story from "../model-objects/Story";

interface StoriesListProps {
  values: Array<Story>;
}

const StoriesList = ({ values }: StoriesListProps) => {
  return (
    <div>
      <hr />
      <table style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>TITLE</th>
            <th>URL</th>
            <th>POINTS</th>
          </tr>
        </thead>
        <tbody>
          {values.map((it) => (
            <tr key={it.title + it.url + it.points}>
              <td>{it.title}</td>
              <td>
                <a href={it.url}>{it.url}</a>
              </td>
              <td>{it.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoriesList;
