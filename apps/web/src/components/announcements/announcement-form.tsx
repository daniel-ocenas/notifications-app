"use client";
import { Announcement } from "@/components/announcements/announcements.types";
import MultiSelect, { MultiselectOptionType } from "@/ui/multi-select";
import { PREDEFINED_TAGS } from "@/utils/constants";
import { formatDateForDatetimeLocal } from "@/utils/date-formatter";
import { PropsWithChildren } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface InputWrapperProps extends PropsWithChildren {
  label?: string;
  error?: string;
  subHeader?: string;
}

export function InputWrapper({
  label,
  subHeader,
  error,
  children,
}: InputWrapperProps) {
  return (
    <div className="mb-4">
      {label && <label className="block font-semibold mb-1">{label}</label>}
      {subHeader && (
        <p className={"text-sm text-gray-500 mb-2 "}>{subHeader}</p>
      )}
      <div className={error ? "border border-red-500 rounded" : ""}>
        {children}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

const mapCategoriesToInput = (categories?: string[]): MultiselectOptionType[] =>
  categories?.map((category) => ({ label: category, value: category })) ?? [];

export type OnSubmitActionProps = {
  id?: string;
  title: string;
  content: string;
  category: string[];
  publicationDate: string;
};

type FormValues = {
  title: string;
  content: string;
  tags: MultiselectOptionType[];
  publicationDate: string;
};

export default function AnnouncementForm({
  announcement,
  onSubmitAction,
}: {
  announcement?: Announcement;
  onSubmitAction: (announcement: OnSubmitActionProps) => void;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: announcement?.title ?? "",
      content: announcement?.content ?? "",
      tags: mapCategoriesToInput(announcement?.category),
      publicationDate: announcement?.publicationDate
        ? formatDateForDatetimeLocal(announcement.publicationDate)
        : "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    onSubmitAction({
      id: announcement?.id,
      title: data.title,
      content: data.content,
      category: data.tags.map((tag) => tag.value),
      publicationDate: data.publicationDate,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[50%] mx-auto p-4 space-y-4 w-full"
    >
      <InputWrapper label={"Title"} error={errors.title?.message}>
        <input
          type="text"
          placeholder="Enter title"
          className="w-full border-1 border-gray-300 rounded px-2 py-1"
          {...register("title", { required: "Title is required" })}
        />
      </InputWrapper>
      <InputWrapper label={"Content"} error={errors.content?.message}>
        <textarea
          placeholder="Enter content"
          className="w-full border-1 border-gray-300 rounded px-2 py-1"
          {...register("content", { required: "Content is required" })}
        />
      </InputWrapper>
      <InputWrapper
        label={"Categories"}
        subHeader={
          "Select category so readers know what your announcement is about."
        }
        error={errors.tags ? "At least 1 category is required" : undefined}
      >
        <Controller
          name={"tags"}
          control={control}
          rules={{ validate: (v) => (v?.length ?? 0) > 0 }}
          render={({ field }) => (
            <MultiSelect
              value={field.value}
              onChangeAction={field.onChange}
              placeholder={"Select categories"}
              predefinedTags={PREDEFINED_TAGS}
            />
          )}
        />
      </InputWrapper>
      <InputWrapper
        label={"Publication Date"}
        error={errors.publicationDate?.message}
      >
        <input
          type={"datetime-local"}
          className={"border-1 border-gray-300 rounded px-2 py-1 w-full"}
          {...register("publicationDate", {
            required: "Publication date is required",
          })}
        />
      </InputWrapper>
      <div className={"flex justify-end"}>
        <button
          type="submit"
          className="bg-yellow-500 px-4 py-2 rounded-3xl hover:bg-yellow-600 cursor-pointer"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
