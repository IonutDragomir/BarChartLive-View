import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";
import { BarComponent } from "./Components/BarComponent";
import "./CSS/App.css"

export const TRACKS = gql`
  query getTracks {
    allPosts(count: 100) {
      id
      title
      body
      published
      createdAt
      author {
        id
        firstName
        lastName
        avatar
      }
    }
  }
`;

export function App() {
  const { loading, error, data } = useQuery(TRACKS);

  useEffect(() => {
    if (loading) return "Loadiing ...";

    if (error) return `Error! ${error.message}`;

  }, [data]);

  return (
    <>
      <h1 className="title" >Number of posts per month in 2019</h1>
      <BarComponent data={data && true ? data.allPosts : ""} />
    </>
  );
}
