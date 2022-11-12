import { useState, useEffect } from "react";
import Story from "../model-objects/Story";

const localStories: Array<Story> = [
  { id: 1, storyName: "x" },
  { id: 1, storyName: "y" },
  { id: 3, storyName: "z" },
];

const Stories = () => {
  const [stories, setStories] = useState(Array<Story>);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const fetchStories = () =>
    new Promise<Story[]>((resolve, reject) =>
      setTimeout(() => resolve(localStories), 2000)
    );

  useEffect(() => {
    setIsLoading(true);
    fetchStories()
      .then((it) => {
        setStories(it);
        setIsLoading(false);
      })
      .catch(() => {
        setFetchError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>STORIES</h1>
      {fetchError && <h2>Error Fetching Stories</h2>}
      {!fetchError && isLoading && <h4>Loading Stories</h4>}
      {!fetchError && !isLoading && (
        <ul>
          {stories.map((it) => (
            <li>{`${it.id}_${it.storyName}`}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Stories;
