import { useState } from "react";
import { z } from "zod";
import { createNoteSchema, type CreateNoteInput } from "../schemas/note.schema";

export function useNoteForm(
  initial: { title: string; content: string } = { title: "", content: "" },
  onSubmit: (data: CreateNoteInput) => Promise<void>
) {
  const [title, setTitle] = useState(initial.title);
  const [content, setContent] = useState(initial.content);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const result = createNoteSchema.safeParse({ title, content });

    if (!result.success) {
      const tree = z.treeifyError(result.error);
      setErrors({
        title: tree.properties?.title?.errors?.[0] ?? "",
        content: tree.properties?.content?.errors?.[0] ?? "",
      });
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      await onSubmit(result.data);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    errors,
    submitting,
    handleSubmit,
  };
}
