import { createRoot } from 'react-dom/client';
// import "./style.css";
const div = document.createElement('div');
div.id = '__root';
document.body.appendChild(div);

const rootContainer = document.querySelector('#__root');
if (!rootContainer) throw new Error("Can't find Options root element");
