// src/components/RichTextField.tsx

import React from "react";
import { useFormContext, FieldPath, FieldValues } from "react-hook-form";
import z from "zod";

const FormFieldSchema = z.object({
  text: z.string().min(1, "Text is required."),
  tag: z.enum(["h1", "h2", "h3", "p"]), // Restrict tag to the four button options
});

export const MasterFormSchema = z.object({
  // The master form will contain an array of these rich text fields
  content: z.array(FormFieldSchema),
});

export type FormFieldType = z.infer<typeof FormFieldSchema>;
export type MasterFormType = z.infer<typeof MasterFormSchema>;

// The buttons array defines the options and labels
const TAG_OPTIONS: FormFieldType["tag"][] = ["h1", "h2", "h3", "p"];

interface RichTextFieldProps<TFieldValues extends FieldValues> {
  // Use FieldPath to correctly infer the path from the form's type
  name: FieldPath<TFieldValues>;
  tagFieldName: FieldPath<TFieldValues>;
  defaultText: string;
}

export function RichTextField<TFieldValues extends FieldValues>({
  name,
  tagFieldName,
  defaultText,
}: RichTextFieldProps<TFieldValues>) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  // Watch the current tag value to highlight the active button
  const currentTag = watch(tagFieldName) as FormFieldType["tag"];
  const error = errors[name]?.message || errors[tagFieldName]?.message;

  const handleTagClick = (tag: FormFieldType["tag"]) => {
    // Manually set the value for the hidden tag field
    setValue(tagFieldName, tag as any, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg bg-white shadow-sm">
      {/* Left Input Field */}
      <div className="flex">
        <input
          id={name}
          type="text"
          defaultValue={defaultText}
          {...register(name)}
          className={`w-full p-2 border rounded-l-md focus:ring-blue-500 focus:border-blue-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter content text..."
        />
        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-500 mt-1">
            {typeof error === "string" ? error : ""}
          </p>
        )}
      </div>

      {/* Right Buttons */}
      <div className="shrink-0 flex space-x-1">
        <input type="hidden" {...register(tagFieldName)} />
        {TAG_OPTIONS.map((tag) => (
          <button
            key={tag}
            type="button" // Important: prevents form submission
            onClick={() => handleTagClick(tag)}
            className={`
              px-3 py-2 text-sm font-medium rounded-md transition duration-150 ease-in-out
              ${
                currentTag === tag
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}
            title={`Set text as ${tag}`}
          >
            {tag.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
