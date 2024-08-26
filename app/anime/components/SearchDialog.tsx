export default function SearchDialog() {
    return (
      <div className="w-[800px]">
        <input
          type="text"
          className="focus:outline-none p-5 text-lg placeholder-gray-400 font-medium text-[#f6f4f4] bg-gray-800 rounded-lg size-full"
          placeholder="Search anime..."
        />
      </div>
    );
  }
  