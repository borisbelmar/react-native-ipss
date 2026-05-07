import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { useNoteForm } from "../hooks/useNoteForm";
import type { CreateNoteInput } from "../schemas/note.schema";

interface Props {
  initial?: { title: string; content: string };
  onSubmit: (data: CreateNoteInput) => Promise<void>;
}

export default function NoteForm({ initial, onSubmit }: Props) {
  const {
    title,
    setTitle,
    content,
    setContent,
    errors,
    submitting,
    handleSubmit,
  } = useNoteForm(initial, onSubmit);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.flex}
    >
      <View style={styles.container}>
        <TextInput
          style={[styles.input, errors.title ? styles.inputError : null]}
          placeholder="Título"
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
        />
        {errors.title ? <Text style={styles.error}>{errors.title}</Text> : null}

        <TextInput
          style={[styles.input, styles.textArea, errors.content ? styles.inputError : null]}
          placeholder="Contenido"
          placeholderTextColor="#999"
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        {errors.content ? <Text style={styles.error}>{errors.content}</Text> : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={submitting}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {submitting ? "Guardando..." : "Guardar nota"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { gap: 8, padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#1a1a1a",
    backgroundColor: "#fff",
  },
  textArea: { minHeight: 100 },
  inputError: { borderColor: "#e53e3e" },
  error: { fontSize: 12, color: "#e53e3e", marginTop: -4 },
  button: {
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
