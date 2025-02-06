import { useState, useEffect } from "react";
import { CheckCircle2, Circle, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { db } from "./firebase"; // adjust path as necessary
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export function TodoAppComponent() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
      const todosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todosData);
    });

    return () => unsubscribe();
  }, []);

  const addTodo = async () => {
    if (newTodo.trim() !== "") {
      await addDoc(collection(db, 'todos'), {
        text: newTodo,
        completed: false,
      });
      setNewTodo("");
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    const todoRef = doc(db, 'todos', id);
    await updateDoc(todoRef, {
      completed: !completed,
    });
  };

  const deleteTodo = async (id: string) => {
    const todoRef = doc(db, 'todos', id);
    await deleteDoc(todoRef);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Todo App</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Add a new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
          />
          <Button onClick={addTodo}>
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between p-2 bg-secondary rounded-md">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={() => toggleTodo(todo.id, todo.completed)}>
                  {todo.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </Button>
                <span className={todo.completed ? "line-through text-muted-foreground" : ""}>
                  {todo.text}
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => deleteTodo(todo.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          {todos.filter(todo => todo.completed).length} of {todos.length} tasks completed
        </p>
      </CardFooter>
    </Card>
  );
}
