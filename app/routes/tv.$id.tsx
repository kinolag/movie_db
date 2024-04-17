/* API: https://api.themoviedb.org/3/tv/{series_id} */
import AppLayout from "../layouts/_app";
import { type MetaFunction, json, LoaderFunctionArgs } from "@remix-run/node";
import { getItemDetails, type TvShowDetails } from "../models/result.server";
import { useLoaderData, useNavigation } from "@remix-run/react";
import invariant from "tiny-invariant";
import Details from "../components/Details";

export const meta: MetaFunction = () => {
  return [
    { title: "Movie DB - Details" },
    { name: "description", content: "TV Show Details" },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  // invariant: a function that throws an error, with a custom message (without in prod)
  if (!params.id) {
    if ("production" !== process.env.NODE_ENV) {
      invariant(false, "Missing id param");
    } else {
      invariant(false);
    }
  }
  const result = await getItemDetails("tv", params.id);
  if (!result) throw new Response("Not found", { status: 404 });
  return json(result);
};

export default function TvShowDetails(): React.ReactNode {
  const navigation = useNavigation();
  const tvShowDetails = useLoaderData<typeof loader>();
  return (
    <AppLayout>
      <section>
        {navigation.state === "loading" ? (
          <h3>Loading details...</h3>
        ) : (
          <>
            <h3>TV Show Details</h3>
            <Details mediaType="tv" itemDetails={tvShowDetails} />
          </>
        )}
      </section>
    </AppLayout>
  );
}
