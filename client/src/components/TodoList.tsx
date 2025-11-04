import { useState } from 'react';
import type { Todo } from '../types/todo';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      setTodos(todos.map(todo => 
        todo.id === editingId ? { ...todo, title, description } : todo
      ));
      setEditingId(null);
    } else {
      setTodos([...todos, { id: Date.now(), title, description }]);
    }
    setTitle('');
    setDescription('');
  };

  const handleEdit = (todo: Todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditingId(todo.id!);
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
        />
        <button 
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          {editingId !== null ? 'Update Todo' : 'Add Todo'}
        </button>
      </form>

      <div className="space-y-4">
        {todos.map((todo) => (
          <div key={todo.id} className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-xl font-semibold text-gray-800">{todo.title}</h3>
            <p className="text-gray-600 mt-2">{todo.description}</p>
            <div className="mt-4 space-x-2">
              <button 
                onClick={() => handleEdit(todo)}
                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition-colors"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(todo.id!)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
