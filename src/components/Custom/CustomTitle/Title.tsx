import "./Title.css";

type Props = {
  title: string;
};
export default function Title({ title }: Props) {
  return <p className="page-title">{title}</p>;
}
