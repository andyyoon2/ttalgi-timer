import './Button.css';

export default function Button(props) {
  return (
    <button class="btn" onClick={() => props.onClick()}>{props.children}</button>
  );
}
