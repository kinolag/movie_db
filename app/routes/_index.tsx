import AppLayout from "../layouts/_app";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Movie DB" },
    { name: "description", content: "An app to explore The Movie DB" },
  ];
};

export default function Index() {
  return (
    <AppLayout>
      <p style={{ padding: "24px 12px", textAlign: "center", lineHeight: 1.5 }}>
        Discover Movies
        <br />
        and TV Shows
      </p>
    </AppLayout>
  );
}
