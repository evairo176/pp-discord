"use client";
import React from "react";
import "@uploadthing/react/styles.css";
import { UploadDropzone } from "@/lib/uploadthing";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";

interface FileUploadInterface {
  endpoint: "messageFile" | "serverImage";
  onChange: (url?: string) => void;
  value: string;
}

const FileUpload = ({ endpoint, onChange, value }: FileUploadInterface) => {
  const fileType = value?.split(".").pop();
  console.log(value);
  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-muted">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-200" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
        console.log(res);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};

export default FileUpload;
