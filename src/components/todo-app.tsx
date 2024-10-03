"use client"

import { useState } from "react"
import { CheckCircle2, Circle, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface Todo {
  id: number
  text: string
  completed: boolean
}

export function TodoAppComponent() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Create a todo app with v0", completed: true },
    { id: 2, text: "Create a nextJs application", completed: false },
    { id: 3, text: "Add v0 component to application", completed: false },
    { id: 4, text: "Create GitHub Repository", completed: false },
    { id: 5, text: "Push to GitHub", completed: false },
    { id: 6, text: "Deploy to Vercel", completed: false },
  ])
  const [newTodo, setNewTodo] = useState("")

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo("")
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

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
                <Button variant="ghost" size="icon" onClick={() => toggleTodo(todo.id)}>
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
  )
}