import { css } from "@emotion/css";
import { useState } from "react";

const Tag = ({ tag, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(tag.name);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit({ ...tag, name: editedName });
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    onDelete(tag.id);
  };

  return (
    <div
      className={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background-color: #f0f0f0;
        border-radius: 4px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        margin-bottom: 10px;
      `}
    >
      {isEditing ? (
        <>
          <input
            className={css`
              flex: 1;
              padding: 5px;
              border: 1px solid #ccc;
              border-radius: 4px;
            `}
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <button onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <div
          className={css`
            display: flex;
            gap: 5px;
          `}
        >
          <span
            className={css`
              display: flex;
              align-items: center;
              margin-right: 20px;
            `}
          >
            {tag.name}
          </span>
          <button
            className={css`
              background-color: #007bff;
              color: #fff;
              border: none;
              border-radius: 4px;
              padding: 5px 10px;
              cursor: pointer;
            `}
            onClick={handleEditClick}
          >
            Edit
          </button>
          <button
            className={css`
              background-color: #dc3545;
              color: #fff;
              border: none;
              border-radius: 4px;
              padding: 5px 10px;
              cursor: pointer;
            `}
            onClick={handleDeleteClick}
            data-testid="delete-button-New Tag"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Tag;
