import "./Button.css";

type Props = {
  icon: React.ReactElement<"i">;
  onClick?: () => void;
};
export default function Button({ icon, onClick }: Props) {
  return <button onClick={onClick}>{icon}</button>;
}
