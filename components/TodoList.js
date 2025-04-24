import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const BASE_URL = "https://salasfullstacktodo.onrender.com";

export default function TodoList({ darkMode, toggleTheme }) {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/tasks/list/`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const addTask = () => {
    if (task.trim() === "") return alert("Task cannot be empty!");

    const newTask = { text: task, completed: false };

    fetch(`${BASE_URL}/tasks/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks([...tasks, data]);
        setTask("");
      })
      .catch((err) => console.error("Add error:", err));
  };

  const toggleComplete = (index) => {
    const updated = { ...tasks[index], completed: !tasks[index].completed };
    const taskId = tasks[index].id;

    fetch(`${BASE_URL}/tasks/update/${taskId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ completed: updated.completed }),
    })
      .then((res) => res.json())
      .then(() => {
        const newTasks = tasks.map((t, i) =>
          i === index ? { ...t, completed: updated.completed } : t
        );
        setTasks(newTasks);
      })
      .catch((err) => console.error("Toggle error:", err));
  };

  const removeTask = (index) => {
    const taskId = tasks[index].id;

    fetch(`${BASE_URL}/tasks/delete/${taskId}/`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
      },
    })
      .then(() => setTasks(tasks.filter((_, i) => i !== index)))
      .catch((err) => console.error("Delete error:", err));
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedTask(tasks[index].text);
  };

  const saveEdit = (index) => {
    if (editedTask.trim() === "") return alert("Task cannot be empty!");
    const taskId = tasks[index].id;

    fetch(`${BASE_URL}/tasks/update/${taskId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ text: editedTask }),
    })
      .then((res) => res.json())
      .then(() => {
        const newTasks = tasks.map((t, i) =>
          i === index ? { ...t, text: editedTask } : t
        );
        setTasks(newTasks);
        setEditingIndex(null);
        setEditedTask("");
      })
      .catch((err) => console.error("Edit error:", err));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.taskItem,
        { backgroundColor: darkMode ? "#1e1e1e" : "#F0F0F0" },
      ]}
    >
      <TouchableOpacity onPress={() => toggleComplete(index)}>
        <FontAwesome
          name={item.completed ? "check-square" : "square-o"}
          size={22}
          color="#E7473C"
        />
      </TouchableOpacity>

      {editingIndex === index ? (
        <TextInput
          style={[
            styles.taskText,
            styles.editInput,
            darkMode && {
              backgroundColor: "#333",
              color: "#fff",
              borderColor: "#555",
            },
          ]}
          value={editedTask}
          onChangeText={setEditedTask}
          autoFocus
        />
      ) : (
        <Text
          style={[
            styles.taskText,
            item.completed && styles.taskTextCompleted,
            darkMode && { color: "#fff" },
          ]}
        >
          {item.text}
        </Text>
      )}

      <View style={styles.taskActions}>
        {editingIndex === index ? (
          <TouchableOpacity onPress={() => saveEdit(index)}>
            <FontAwesome name="save" size={20} color="#ccc" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => startEditing(index)}>
            <FontAwesome name="edit" size={20} color="#ccc" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => removeTask(index)}>
          <FontAwesome name="trash" size={20} color="#E7473C" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.container, darkMode && { backgroundColor: "#121212" }]}
    >
      <View style={styles.themeToggleContainer}>
        <TouchableOpacity onPress={toggleTheme}>
          <FontAwesome
            name={darkMode ? "sun-o" : "moon-o"}
            size={24}
            color={darkMode ? "#FFD700" : "#333"}
          />
        </TouchableOpacity>
      </View>

      <Text style={[styles.heading, darkMode && { color: "#fff" }]}>
        To-Do List
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            darkMode && {
              backgroundColor: "#333",
              color: "#fff",
              borderColor: "#555",
            },
          ]}
          placeholder="Add a new task..."
          placeholderTextColor={darkMode ? "#aaa" : "#999"}
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTask}>
          <FontAwesome name="plus" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        {["all", "completed", "pending"].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterButton,
              filter === type && styles.activeFilterButton,
            ]}
            onPress={() => setFilter(type)}
          >
            <Text
              style={[
                styles.filterText,
                filter === type && styles.activeFilterText,
                darkMode && { color: "#fff" },
              ]}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  themeToggleContainer: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginRight: 10,
    backgroundColor: "#fff",
    color: "#000",
  },
  addBtn: {
    backgroundColor: "#E7473C",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 10,
  },
  filterButton: {
    borderColor: "#ccc",
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  activeFilterButton: {
    backgroundColor: "#E7473C",
  },
  filterText: {
    color: "#333",
    fontSize: 14,
  },
  activeFilterText: {
    color: "#fff",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    gap: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  taskActions: {
    flexDirection: "row",
    gap: 10,
  },
  editInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 6,
  },
});
