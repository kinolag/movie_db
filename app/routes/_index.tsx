import AppLayout from "../layouts/_app";
import { type MetaFunction, json } from "@remix-run/node";
import {
  type MediaType,
  getResults,
  type Output,
} from "~/models/result.server";
import { useLoaderData, useNavigation } from "@remix-run/react";
import { useState } from "react";
import Tabs, { type AvailableTab } from "../components/Tabs";
import ResultsGrid from "../components/ResultsGrid";

export const meta: MetaFunction = () => {
  return [
    { title: "Movie DB" },
    { name: "description", content: "An app to explore The Movie DB" },
  ];
};

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const mediaType = search.get("media-type") ?? "movie";

  const output = await getResults("trending", mediaType as MediaType);
  return json(output);
};

export default function Index() {
  const { results, page, totalPages }: Output = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  const [selectedTab, setSelectedTab] = useState<AvailableTab>("Movies");
  return (
    <AppLayout>
      <section>
        {navigation.state === "loading" ? (
          <h3>Loading results...</h3>
        ) : results?.length > 0 ? (
          <>
            <h3>Trending This Week</h3>
            <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <h5 className="y-spaced">{`Page ${page} of ${totalPages}`}</h5>
            <ResultsGrid results={results} />
          </>
        ) : (
          <h3>No results to display</h3>
        )}
      </section>
    </AppLayout>
  );
}
