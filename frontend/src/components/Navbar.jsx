export default function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-primary text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-40">
      <h1 className="text-xl font-bold">Wellness Tracker</h1>
      <div className="flex items-center space-x-4">
        <span>Hello, {user.name}</span>
        <button
          onClick={onLogout}
          className="bg-secondary px-3 py-1 rounded hover:bg-accent transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
