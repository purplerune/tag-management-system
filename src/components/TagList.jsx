import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import { addTag, deleteTag, editTag, loadTags } from "../services/api";
import Tag from "./Tag";

const TagList = () => {
  const [tags, setTags] = useState([]);
  const [newTagName, setNewTagName] = useState("");

  useEffect(() => {
    const fetchTags = async () => {
      const tags = await loadTags();
      setTags(tags);
    };
    fetchTags();
  }, []);

  const handleAddTag = async () => {
    try {
      const addedTag = await addTag(newTagName);
      setTags([...tags, addedTag]);
      setNewTagName("");
    } catch (error) {
      console.error("Error adding tag:", error.message);
    }
  };

  const handleNewTagNameChange = (e) => {
    setNewTagName(e.target.value);
  };

  const handleEditTag = async (editedTag) => {
    try {
      if (!editedTag) return;
      const updatedTag = await editTag(editedTag.id, editedTag.name);
      setTags((prevTags) =>
        prevTags.map((tag) => (tag.id === editedTag.id ? updatedTag : tag))
      );
    } catch (error) {
      console.error("Error editing tag:", error.message);
    }
  };

  const handleDeleteTag = async (tagId) => {
    try {
      await deleteTag(tagId);
      setTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId));
    } catch (error) {
      console.error("Error deleting tag:", error.message);
    }
  };

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
      `}
      data-testid="tag-list"
    >
      <div
        role="listitem"
        className={css`
          display: grid;
          grid-gap: 20px;
          margin-top: 20px;
        `}
        data-testid="tag-list-items"
      >
        {tags.map((tag) => (
          <Tag
            key={tag.id}
            tag={tag}
            className={css`
              display: grid;
              grid-gap: 20px;
              margin-top: 20px;
            `}
            onEdit={handleEditTag}
            onDelete={handleDeleteTag}
          >
            <span
              className={css`
                font-size: 16px;
              `}
            >
              {tag.name}
            </span>
          </Tag>
        ))}
      </div>
      <div
        className={css`
          display: flex;
          align-items: center;
          margin-top: 20px;
        `}
      >
        <input
          type="text"
          value={newTagName}
          onChange={handleNewTagNameChange}
          className={css`
            flex: 1;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
          `}
          data-testid="add-tag-input"
        />
        <button
          onClick={handleAddTag}
          className={css`
            margin-left: 10px;
            padding: 10px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          `}
          data-testid="add-tag-button"
        >
          Add Tag
        </button>
      </div>
    </div>
  );
};

export default TagList;
