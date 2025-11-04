import TodoList from './components/TodoList'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Todo List</h1>
        <TodoList />
      </div>
    </div>
  )
}

export default App
