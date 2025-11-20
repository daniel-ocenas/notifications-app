"use client";
import React from "react";
import { MultiValue } from "react-select";
import ReactCreatableSelect from "react-select/creatable";

export type MultiselectOptionType = { label: string; value: string };

export default function CreatableSelect({
  value,
  onChangeAction,
  predefinedTags = [],
}: {
  value: MultiselectOptionType[];
  onChangeAction: (tags: MultiselectOptionType[]) => void;
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
    <ReactCreatableSelect
      isMulti
      value={value}
      options={predefinedTags}
      onChange={handleChange}
      onCreateOption={handleCreate}
      placeholder="Select or type tags..."
      className="w-full"
      classNamePrefix="react-select"
      formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
    />
  );
}
