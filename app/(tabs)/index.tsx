import { useCallback } from "react";
import { FlatList, Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import { useNotes } from "@/hooks/useNotes";
import NoteItem from "@/components/NoteItem";
import colors from "@/constants/colors";

export default function NotesListScreen() {
  const { notes, loading, loadNotes, deleteNote } = useNotes();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [loadNotes])
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.tint} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteItem
            note={item}
            onPress={(note) => router.push(`/(tabs)/${note.id}` as any)}
            onDelete={deleteNote}
          />
        )}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>No hay notas todavía</Text>
            <Text style={styles.emptySubtext}>Toca + para crear una</Text>
          </View>
        }
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: 16,
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    color: colors.muted,
    fontWeight: "500",
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 4,
  },
});
