export default function Notification({ message, type }) {
  const bgColor =
    type === "success"
      ? "bg-green-100 text-green-700"
      : type === "error"
      ? "bg-red-100 text-red-700"
      : "bg-blue-100 text-blue-700";

  return (
    <div
      className={`fixed right-5 p-4 rounded shadow-lg ${bgColor} animate-fadeIn`}
      style={{
        top: "72px", // Adjust this to your navbar height + some margin
        zIndex: 1100, // Higher than navbar z-index (1000)
        maxWidth: "320px",
        minWidth: "200px",
      }}
    >
      {message}
    </div>
  );
}
