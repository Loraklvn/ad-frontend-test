import React from "react";

export default function CatalogHeader() {
  return (
    <div className="mt-6 border-b border-[#EFEDF3] pb-12">
      <div className="max-w-7xl mx-auto w-full p-4">
        <h1 className="text-4xl font-bold">Top Sellers</h1>

        <div className="mt-12 flex justify-end w-full">
          <div className="flex items-center">
            <h2 className="text-xl font-bold border-r pr-6">Genre</h2>{" "}
            <select className="text-xl ml-10 w-56 outline-none">
              <option value="all">All</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
