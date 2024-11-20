"use client";
import { IPlayer } from "@/src/entities/Player/model/types";
import Player from "@/src/entities/Player/ui/Player";
import { ticketReportCreationValidationSchema } from "@/src/entities/Ticket/model/ticketReportCreationValidationSchema";
import {
  ITicket,
  ITicketReportFormdata,
} from "@/src/entities/Ticket/model/types";
import DynamicHeightTextArea from "@/src/features/DynamicHeightTextArea/DynamicHeightTextArea";
import Select from "@/src/shared/ui/Select/Select";
import { yupResolver } from "@hookform/resolvers/yup";
import { watch } from "fs";
import React, { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

type Props = {};

const TicketReportForm = (props: Props) => {
  const fetchPlayers = async () => {
    const playersResponse = await fetch("/api/players");
    const playersJson: IPlayer[] = await playersResponse.json();

    setPlayers(playersJson);
  };

  const [errorsPreview, setErrorsPreview] =
    useState<FieldErrors<ITicketReportFormdata> | null>(null);

  const formMethods = useForm<ITicketReportFormdata>({
    resolver: yupResolver(ticketReportCreationValidationSchema),
    defaultValues: { description: "", players: [], rules: "" },
  });

  useEffect(() => {
    fetchPlayers();
  }, []);

  const [players, setPlayers] = useState<IPlayer[]>([]);

  const onSubmit = async (data: ITicketReportFormdata) => {
    const response = await fetch("/api/tickets/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const createdTicket: ITicket = await response.json();

    window.location.replace("/tickets/report/" + createdTicket.id);
  };

  return (
    <form
      onSubmit={formMethods.handleSubmit(onSubmit, (errors) => {
        setErrorsPreview(errors);
      })}
      className="flex flex-col gap-4 w-full p-4 active border"
    >
      <label>Укажите нарушенное правило</label>
      <input
        {...formMethods.register("rules")}
        className="active border p-4 outline-none"
      />
      <hr className="active" />
      <label>Укажите, на кого будет подана жалоба</label>
      <Select
        options={players.map((player) => {
          return { display: <Player player={player} />, value: player };
        })}
        clearOnChange
        onChange={(e) => {
          formMethods.setValue(
            "players",
            [...formMethods.watch("players"), e].filter(
              (player, index, arr) =>
                arr.findIndex((player2) => player2.id === player.id) === index
            )
          );
        }}
      />
      {formMethods.watch("players").length > 0 && (
        <div className="scrollbar-hide active border flex gap-4 p-4 flex-wrap">
          {formMethods.watch("players").map((player) => {
            return (
              <button
                key={player.id}
                onClick={() =>
                  formMethods.setValue(
                    "players",
                    formMethods
                      .watch("players")
                      .filter(
                        (playerIteration) => player.id != playerIteration.id
                      )
                  )
                }
              >
                <Player player={player} />
              </button>
            );
          })}
        </div>
      )}
      <hr className="active" />
      <label>Опишите, что произошло</label>
      <DynamicHeightTextArea
        className="active border p-4 outline-none"
        {...formMethods.register("description")}
      />
      <hr className="active" />
      {errorsPreview && (
        <div className="text-accent flex flex-col gap-2">
          {Object.values(errorsPreview).map((error, index) => {
            return <div key={index}>{error.message}</div>;
          })}
        </div>
      )}
      <input
        type="submit"
        value={"Оставить жалобу"}
        className="p-4 active border drop-shadow-glowsm transition-all hover:drop-shadow-glow ease-out duration-1000"
      />
    </form>
  );
};

export default TicketReportForm;
