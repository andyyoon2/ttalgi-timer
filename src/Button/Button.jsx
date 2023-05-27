import './Button.css';

export default function Button(props) {
  return (
    <button class={`btn ${props.class}`} onClick={() => props.onClick()}>
      {props.children}
    </button>
  );
}
