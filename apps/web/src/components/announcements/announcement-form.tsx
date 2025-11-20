"use client";
import { Announcement } from "@/components/announcements/announcements.types";
import CreatableSelect, { MultiselectOptionType } from "@/ui/creatable-select";
import { PREDEFINED_TAGS } from "@/utils/constants";
import { formatDateForDatetimeLocal } from "@/utils/date-formatter";
import { PropsWithChildren, useState } from "react";

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

function mapCategoriesToInput(
  categories?: string[],
): { label: string; value: string }[] {
  return (
    categories?.map((category) => ({ label: category, value: category })) ?? []
  );
}

export type OnSubmitActionProps = {
  id?: string;
  title: string;
  content: string;
  category: string[];
  publicationDate: Date;
};

export default function AnnouncementForm({
  announcement,
  onSubmitAction,
}: {
  announcement?: Announcement;
  onSubmitAction: (announcement: OnSubmitActionProps) => void;
}) {
  const [title, setTitle] = useState(announcement?.title);
  const [content, setContent] = useState(announcement?.content);
  const [tags, setTags] = useState<MultiselectOptionType[]>(
    mapCategoriesToInput(announcement?.category),
  );
  const [publicationDate, setPublicationDate] = useState<string>(
    announcement?.publicationDate
      ? formatDateForDatetimeLocal(new Date(announcement.publicationDate))
      : "",
  );
  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
    category?: string;
    publicationDate?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!title || title.length < 1) {
      newErrors.title = "Title is required";
    }
    if (!content || content.length < 1) {
      newErrors.content = "Content is required";
    }
    if (tags.length < 1) {
      newErrors.category = "At least 1 category is required";
    }
    if (!publicationDate || publicationDate.length < 1) {
      newErrors.publicationDate = "Publication date is required";
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const category: string[] = tags.map((tag) => tag.value);
    onSubmitAction({
      id: announcement?.id,
      title: title!,
      content: content!,
      category,
      publicationDate: new Date(publicationDate),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[50%] mx-auto p-4 space-y-4 w-full"
    >
      <InputWrapper label={"Title"} error={errors.title}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border-1 border-gray-300 rounded px-2 py-1"
          placeholder="Enter title"
        />
      </InputWrapper>
      <InputWrapper label={"Content"} error={errors.content}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border-1 border-gray-300 rounded px-2 py-1"
          placeholder="Enter content"
        />
      </InputWrapper>
      <InputWrapper
        label={"Categories"}
        subHeader={
          "Select category so readers know what your announcement is about."
        }
        error={errors.category}
      >
        <CreatableSelect
          value={tags}
          onChangeAction={setTags}
          predefinedTags={PREDEFINED_TAGS}
        />
      </InputWrapper>
      <InputWrapper label={"Publication Date"} error={errors.publicationDate}>
        <input
          type="datetime-local"
          value={publicationDate}
          onChange={(e) => setPublicationDate(e.target.value)}
          className="border-1 border-gray-300 rounded px-2 py-1 w-full"
        />
      </InputWrapper>
      <div className={"flex justify-end"}>
        <button
          type="submit"
          className="bg-yellow-500  px-4 py-2 rounded-3xl hover:bg-yellow-600 cursor-pointer"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
