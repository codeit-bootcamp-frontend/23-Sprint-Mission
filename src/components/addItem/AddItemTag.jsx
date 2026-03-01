import { useState } from "react";

// Imges
import X from "../../assets/icons/ic_X.svg";

// Components
import AddItemInput from "./AddItemInput";

export default function AddItemTag({ tags, setTags }) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = inputValue.trim();

      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setInputValue("");
      }
    }
  };

  return (
    <div className="space-y-4">
      <AddItemInput
        id="tag"
        label="태그"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="태그를 입력해주세요"
      />
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div
            key={tag}
            className="px-3 py-1 bg-gray-100 rounded-full flex items-center"
          >
            <span className="text-gray-800">#{tag}</span>
            <button
              type="button"
              onClick={() => setTags(tags.filter((t) => t !== tag))}
              className="ml-2"
            >
              <img src={X} alt="태그 삭제" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
