import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useNotes } from "@/hooks/useNotes";
import NoteForm from "@/components/NoteForm";
import colors from "@/constants/colors";

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { notes, createNote, updateNote } = useNotes();
  const router = useRouter();

  const isNew = id === "nueva";
  const existingNote = isNew ? null : notes.find((n) => n.id === id);

  if (!isNew && !existingNote) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Nota no encontrada</Text>
      </View>
    );
  }

  const handleSubmit = async (data: { title: string; content: string }) => {
    if (isNew) {
      await createNote(data);
    } else if (existingNote) {
      await updateNote(existingNote.id, data);
    }
    router.back();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {isNew ? "Nueva nota" : "Editar nota"}
        </Text>
        <NoteForm
          initial={
            existingNote
              ? { title: existingNote.title, content: existingNote.content }
              : undefined
          }
          onSubmit={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
    padding: 16,
    paddingBottom: 0,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontSize: 16,
    color: colors.danger,
  },
});
