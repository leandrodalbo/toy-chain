import Story from "../model-objects/Story";

interface StoriesListProps {
  values: Array<Story>;
}

const StoriesList = ({ values }: StoriesListProps) => {
  return (
    <div className="overflow-hidden border rounded-lg">
      <hr />
      <table className="min-w-full divide-y divide-black-100">
        <thead className="bg-gray-100">
          <tr>
            <th
              scope="col"
              className="px-2 py-1 text-xs font-bold text-left text-gray-500 uppercase "
            >
              TITLE
            </th>
            <th
              scope="col"
              className="px-2 py-1 text-xs font-bold text-left text-gray-500 uppercase "
            >
              POINTS
            </th>
            <th
              scope="col"
              className="px-2 py-1 text-xs font-bold text-left text-gray-500 uppercase "
            >
              URL
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {values.map((it) => (
            <tr key={it.title + it.url + it.points}>
              <td className="px-2 py-1 text-sm font-medium text-gray-800 whitespace-nowrap">
                {it.title}
              </td>
              <td className="px-2 py-1 text-sm font-medium text-gray-800 whitespace-nowrap">
                {it.points}
              </td>
              <td className="px-2 py-1 text-sm font-medium text-gray-800 whitespace-nowrap">
                {it.url}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoriesList;
