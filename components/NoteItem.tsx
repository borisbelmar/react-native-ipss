import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import type { Note } from "../types/note";

interface Props {
  note: Note;
  onPress: (note: Note) => void;
  onDelete: (id: string) => void;
}

export default function NoteItem({ note, onPress, onDelete }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(note)} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {note.title}
        </Text>
        <TouchableOpacity onPress={() => onDelete(note.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.delete}>Eliminar</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.content} numberOfLines={2}>
        {note.content}
      </Text>
      <Text style={styles.date}>
        {new Date(note.createdAt).toLocaleDateString("es-CL", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    flex: 1,
    marginRight: 8,
  },
  delete: {
    fontSize: 13,
    color: "#e53e3e",
    fontWeight: "500",
  },
  content: {
    fontSize: 14,
    color: "#555555",
    marginBottom: 4,
  },
  date: {
    fontSize: 11,
    color: "#999999",
  },
});
