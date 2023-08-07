const tags = [
  { id: 1, name: "Tag 1" },
  { id: 2, name: "Tag 2" },
  { id: 3, name: "Tag 3" },
  { id: 4, name: "Tag 4" },
  { id: 5, name: "Tag 5" },
  { id: 6, name: "Tag 6" },
  { id: 7, name: "Tag 7" },
];

export const listTags = (_, res) => {
  res.json(tags);
};

export const getTagById = (req, res) => {
  const { id } = req.params;
  const tag = tags.find((t) => t.id === parseInt(id));
  if (!tag) {
    return res.status(404).json({ message: "Tag not found" });
  }
  res.json(tag);
};

export const createTag = (req, res) => {
  const { name } = req.body;
  const maxId = Math.max(...tags.map((tag) => tag.id));
  const newTag = { id: maxId + 1, name };
  tags.push(newTag);
  res.status(201).json(newTag);
};

export const updateTag = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const tag = tags.find((t) => t.id === parseInt(id));
  if (!tag) {
    return res.status(404).json({ message: "Tag not found" });
  }

  tag.name = name;
  res.json(tag);
};

export const deleteTag = (req, res) => {
  const { id } = req.params;
  const tagIndex = tags.findIndex((t) => t.id === parseInt(id));

  if (tagIndex === -1) {
    return res.status(404).json({ message: "Tag not found" });
  }

  tags.splice(tagIndex, 1);

  res.json({ message: "Tag deleted with sucess" });
};
