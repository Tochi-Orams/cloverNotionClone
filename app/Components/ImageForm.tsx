import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Image as ImageIcon, Ruler, Link } from "lucide-react";
import Image from "next/image";
import { cardType } from "../types/types";

// 1. Define the Zod Schema for validation
const BlockSchema = z.object({
  name: z.string(),

  // Source must be a non-empty string and a valid URL (optional, but good practice for 'source')
  source: z
    .string()
    .min(1, { message: "Image source URL is required" })
    .url({ message: "Must be a valid URL" }),

  // Height and Width should be numbers.
  // z.coerce.number() attempts to convert the string input value to a number before validation.
  height: z.coerce
    .number("Height must be a number")
    .int("Height must be an integer")
    .min(10, { message: "Height must be at least 10px" })
    .max(2000, { message: "Height cannot exceed 2000px" }),

  width: z.coerce
    .number("Width must be a number")
    .int("Width must be an integer")
    .min(10, { message: "Width must be at least 10px" })
    .max(2000, { message: "Width cannot exceed 2000px" }),
});

const InputField = ({
  label,
  icon: Icon,
  name,
  register,
  errors,
  type = "text",
  placeholder,
}: any) => (
  <div className="space-y-1 text-black!">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="relative mt-1 rounded-md shadow-sm">
      {Icon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      )}
      <input
        id={name}
        type={type}
        // Apply the register function from React Hook Form
        {...register(name)}
        placeholder={placeholder}
        className={`w-full appearance-none rounded-lg border px-4 py-2 pl-10 focus:outline-none transition duration-150 ease-in-out sm:text-sm
          ${
            errors[name]
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-indigo-500"
          }
        `}
      />
    </div>
    {/* Display error message */}
    {errors[name] && (
      <p className="mt-2 text-xs text-red-600 font-medium">
        {errors[name].message}
      </p>
    )}
  </div>
);

// Main Application Component
const ImageForm = ({ id }: { id: number }) => {
  const [submittedData, setSubmittedData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    // Integrate Zod schema with React Hook Form
    resolver: zodResolver(BlockSchema),
    // Define default values
    defaultValues: {
      name: "",
      source: "",
      height: 250,
      width: 400,
    },
  });

  // Fetch existing data
  const fetchBlock = async (id: number) => {
    try {
      const res = await fetch("/api/blocks", { method: "GET" });

      if (res.ok) {
        const data = (await res.json()) as cardType[];
        const block = data.filter((b) => b.id == id)[0];

        reset(block);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchBlock(id);
  }, [id]);

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch("/api/blocks", {
        method: "POST",
        body: JSON.stringify(watch()),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const { height, name, source, width } = watch();

  return (
    <div className="relative z-10 w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl space-y-8 max-h-[90%] overflow-auto">
      {name && source && (
        <div className="bg-black">
          <div className="mx-auto w-fit">
            <Image
              alt={name}
              src={source}
              width={(width as number) ?? 10}
              height={(height as number) ?? 10}
            />
          </div>
        </div>
      )}

      <header>
        <InputField
          label="Name"
          name="name"
          register={register}
          errors={errors}
          placeholder="Picture Name"
        />
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 1. Source Field (URL) */}
        <InputField
          label="Image Source (URL)"
          icon={Link}
          name="source"
          register={register}
          errors={errors}
          type="url"
          placeholder="e.g., https://example.com/image.jpg"
        />

        <div className="flex space-x-4">
          {/* 2. Width Field (Number) */}
          <InputField
            label="Width (px)"
            icon={Ruler}
            name="width"
            register={register}
            errors={errors}
            type="number"
            placeholder="e.g., 400"
          />

          {/* 3. Height Field (Number) */}
          <InputField
            label="Height (px)"
            icon={Ruler}
            name="height"
            register={register}
            errors={errors}
            type="number"
            placeholder="e.g., 250"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Save Image"}
        </button>
      </form>

      {/* Submitted Data Display */}
      {submittedData && (
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold text-green-700">
            Configuration Saved!
          </h3>
          <pre className="mt-2 text-sm text-green-800 bg-green-100 p-3 rounded-md overflow-x-auto">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ImageForm;
