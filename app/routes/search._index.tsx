import AppLayout from "../layouts/_app";
import { type MetaFunction, json } from "@remix-run/node";
import {
  type MediaType,
  type Output,
  getResults,
} from "~/models/result.server";
import {
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import ResultsGrid from "../components/ResultsGrid";
import SearchForm from "../components/SearchForm";
import { LABELS } from "../components/Card";

export const meta: MetaFunction = () => {
  return [
    { title: "Movie DB - Search" },
    { name: "description", content: "Search shows in The Movie DB" },
  ];
};

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const query = search.get("query");
  const mediaType = search.get("media-type") ?? "movie";

  const output = await getResults(
    "search",
    mediaType as MediaType,
    query as string
  );
  return json(output);
};

export default function Search() {
  const { results, page, totalPages }: Output = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");
  const mediaType = searchParams.get("media-type");
  const label = LABELS[mediaType as MediaType] + "s";
  return (
    <AppLayout>
      <section>
        {navigation.state === "loading" ? (
          <h3>Searching...</h3>
        ) : (
          <>
            <h3>Search the Database</h3>
            <SearchForm />
            {query && mediaType && results.length > 0 ? (
              <>
                <h3>{`Results for "${query}" (${label})`}</h3>
                <h5 className="y-spaced">{`Page ${page} of ${totalPages}`}</h5>
                <ResultsGrid results={results} />
              </>
            ) : query && !results.length ? (
              <h3 className="txt-c">
                No results to display.
                <br />
                Please try a different search.
              </h3>
            ) : null}
          </>
        )}
      </section>
    </AppLayout>
  );
}
