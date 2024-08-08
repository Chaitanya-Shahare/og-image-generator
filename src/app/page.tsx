"use client";
import html2canvas from "html2canvas";
import Image, { HTMLImageElement } from "next/image";
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const capture = async () => {
    const root = document.getElementById("preview") as HTMLElement;
    const canvas = await html2canvas(root, {});
    const link = document.createElement("a");
    link.download = "screenshot.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <main className="p-24">
      <h1 className="font-extrabold text-4xl pb-12">
        OpenGraph Image Generator
      </h1>
      <div className="flex gap-8">
        <div className="w-1/2 flex flex-col gap-8">
          <label>
            <h3 className="text-xl pb-4">
              Title
              <span className="text-red-400">*</span>
            </h3>
            <input
              type="text"
              className="p-2 w-full bg-slate-700 border-2 rounded-md"
              required
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </label>
          <label>
            <h3 className="text-xl pb-4">
              Content
              <span className="text-red-400">*</span>
            </h3>
            <textarea
              className="p-2 w-full bg-slate-700 border-2 rounded-md"
              rows={10}
              required
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </label>
          <label>
            <h3 className="text-xl pb-4">Image </h3>
            <input
              type="file"
              accept="image/png, image/jpeg"
              className="p-2 w-full bg-slate-700 border-2 rounded-md"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            ></input>

            {file && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={URL.createObjectURL(file)}
                alt={"preview of selected file"}
              />
            )}
          </label>
        </div>

        <div className="flex flex-col gap-4 w-1/2">
          <h3 className="text-xl pb-4">Preview</h3>
          <div
            className="bg-white text-black p-4 rounded-md h-[400px] w-[600px]"
            id="preview"
          >
            {file && (
              <>
                <img
                  src={URL.createObjectURL(file)}
                  alt={"preview of selected file"}
                  className="w-full h-3/4 object-cover rounded-md pb-4"
                />
                <h1 className="text-3xl font-extrabold pb-2 overflow-hidden text-ellipsis w-full whitespace-nowrap">
                  {title}
                </h1>
                <p
                  className="text-lg overflow-hidden text-ellipsis w-full whitespace-nowrap"
                  style={{ textOverflow: "ellipsis" }}
                >
                  {content}
                </p>
              </>
            )}
          </div>

          <button
            className="bg-orange-400 text-black p-2 rounded-md"
            onClick={capture}
          >
            Download
          </button>
        </div>
      </div>
    </main>
  );
}
