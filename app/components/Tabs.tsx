import type { MediaType } from "../models/result.server";
import { Form } from "@remix-run/react";

export type AvailableTab = "Movies" | "TV Shows";

const TABS: Array<{ label: AvailableTab; mediaType: MediaType }> = [
  { label: "Movies", mediaType: "movie" },
  { label: "TV Shows", mediaType: "tv" },
];

type TabsProps = {
  selectedTab: AvailableTab;
  setSelectedTab: React.Dispatch<AvailableTab>;
};

export default function Tabs({ selectedTab, setSelectedTab }: TabsProps) {
  return (
    <Form>
      {TABS.map((t, i) => (
        <button
          key={t.label}
          className="tab"
          style={{
            cursor: t.label === selectedTab ? "default" : "pointer",
            fontWeight: t.label === selectedTab ? "bold" : "normal",
            borderRight: i < TABS.length - 1 ? "1px solid #ccc" : 0,
          }}
          name={"media-type"}
          value={t.mediaType}
          onClick={() => {
            setSelectedTab(t.label);
          }}
        >
          {t.label}
        </button>
      ))}
    </Form>
  );
}
