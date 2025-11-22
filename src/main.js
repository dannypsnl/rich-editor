import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";

const editorContainer = document.querySelector("#editorjs");
console.log(editorContainer);

const editor = new EditorJS({
  holder: editorContainer,
  autofocus: true,
  tools: {
    header: Header,
    list: List,
  },
});
