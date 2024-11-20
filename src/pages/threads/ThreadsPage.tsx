"use client";
import { IThread } from "@/src/entities/Thread/model/types";
import ThreadPreview from "@/src/entities/Thread/ui/ThreadPreview";
import ThreadCreationForm from "@/src/features/ThreadCreationForm/ui/ThreadCreationForm";
import Popup from "@/src/shared/ui/Popup/Popup";
import useDebounce from "@/src/shared/utils/useDebounce";
import classNames from "classnames";
import { useEffect, useState } from "react";

type Props = { threads: IThread[] };

const ThreadsPage = ({ threads }: Props) => {
  const [threadsState, setThreadsState] = useState<IThread[]>(threads);

  const [creatonOpened, setCreationOpened] = useState(false);

  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 500);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    !!debounced ? searchForThreads() : setThreadsState(threads);
  }, [debounced]);

  if (!threads) return null;
  const searchForThreads = async () => {
    setLoading(true);
    fetch(
      "/api/threads" +
        (debounced ? `?filter=${encodeURIComponent(debounced)}` : "")
    ).then(async (data) => {
      const fetchedThreads: IThread[] = await data.json();
      setLoading(false);
      setThreadsState(fetchedThreads);
    });
  };

  return (
    <main className="min-h-screen flex flex-col gap-4 py-20">
      <Popup
        title="Создать тред"
        state={{ action: setCreationOpened, current: creatonOpened }}
      >
        <ThreadCreationForm />
      </Popup>
      <div className="flex gap-4">
        <input
          className={classNames(
            "active border p-4 w-full outline-none focus:drop-shadow-glow transition-all duration-1000",
            { skeleton: loading }
          )}
          placeholder="Искать по тредам..."
          value={search}
          onChange={(e) => {
            setSearch(e.currentTarget.value);
          }}
          type="text"
        />
        <button
          onClick={() => {
            setCreationOpened(true);
          }}
          className="active border drop-shadow-glow p-4"
        >
          Создать
        </button>
      </div>
      {threadsState.map((thread) => {
        return <ThreadPreview key={thread.id} thread={thread} />;
      })}
    </main>
  );
};

export default ThreadsPage;
