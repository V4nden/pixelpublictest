import { threadCreationValidationSchema } from "@/src/entities/Thread/model/threadCreationValidationSchema";
import { IThread } from "@/src/entities/Thread/model/types";
import Popup from "@/src/shared/ui/Popup/Popup";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

type Props = {};

const ThreadCreationForm = (props: Props) => {
  const { register, handleSubmit, watch, setValue } = useForm<{
    title: string;
  }>({
    resolver: yupResolver(threadCreationValidationSchema),
    defaultValues: { title: "" },
  });

  const [errorsPreview, setErrorsPreview] = useState<FieldErrors<{
    content: string;
    attachments: File[];
  }> | null>(null);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: { title: string }) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("title", data.title);

    const threadCreationResponse = await fetch("/api/threads", {
      method: "POST",
      body: formData,
    });
    const createdThread: IThread = await threadCreationResponse.json();

    window.location.replace("/threads/" + createdThread.id);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, (errors) => {
          setErrorsPreview(errors);
        })}
        className={classNames("flex gap-4 flex-wrap w-full", {
          skeleton: loading,
        })}
      >
        <input
          className={classNames(
            "active border p-4 flex-grow outline-none transition-all duration-500"
          )}
          type="text"
          {...register("title")}
        />
        <input
          type="submit"
          value="Создать"
          className="active sm:w-full md:w-fit border p-4"
        />
      </form>
      {errorsPreview && (
        <div className="text-accent flex flex-col gap-2">
          {Object.values(errorsPreview).map((error, index) => {
            return <div key={index}>{error.message}</div>;
          })}
        </div>
      )}
    </>
  );
};

export default ThreadCreationForm;
