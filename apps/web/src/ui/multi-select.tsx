"use client";
import React from "react";
import { MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";

export type MultiselectOptionType = { label: string; value: string };

export default function MultiSelect({
  value,
  onChangeAction,
  placeholder,
  predefinedTags = [],
}: {
  value: MultiselectOptionType[];
  onChangeAction: (tags: MultiselectOptionType[]) => void;
  placeholder?: string;
  predefinedTags?: MultiselectOptionType[];
}) {
  const handleChange = (selected: MultiValue<MultiselectOptionType>) => {
    onChangeAction(Array.isArray(selected) ? selected : []);
  };

  const handleCreate = (inputValue: string) => {
    const newTag: MultiselectOptionType = {
      label: inputValue,
      value: inputValue,
    };
    onChangeAction([...value, newTag]);
  };

  return (
    <CreatableSelect
      isMulti
      value={value}
      options={predefinedTags}
      onChange={handleChange}
      onCreateOption={handleCreate}
      placeholder={placeholder}
      className="w-full"
      classNamePrefix="react-select"
    />
  );
}
