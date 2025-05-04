import "./MainContent.css";

export default function MainContent({isSidebarOpen, country }) {
  return (
    <main className={`main-content ${!isSidebarOpen ? "closed" : ""}`}>
      {Array.from({ length: 100 }).map((_, index) => (
        <p key={index}>{index+1}</p>
      ))}
    </main>
  );
}
