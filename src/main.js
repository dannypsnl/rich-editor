import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import "mathlive";
import { SimpleImage } from "./simpleImage";
import { Formula } from "./mathlive";

const editorContainer = document.querySelector("#editorjs");

const editor = new EditorJS({
  holder: editorContainer,
  autofocus: true,
  tools: {
    header: Header,
    list: List,
    formula: Formula,
    image: {
      class: SimpleImage,
      inlineToolbar: true,
    },
  },
  data: {
    time: 1550476186479,
    version: "2.8.1",
    blocks: [
      {
        type: "formula",
        data: {
          latex: "x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}",
        },
      },
      {
        type: "image",
        data: {
          url: "https://cdn.pixabay.com/photo/2017/09/01/21/53/blue-2705642_1280.jpg",
          caption: "A women with blue hair wears a sun glass",
        },
      },
    ],
  },
});

const saveButton = document.getElementById("save-button");
const output = document.getElementById("output");

saveButton.addEventListener("click", () => {
  editor.save().then((savedData) => {
    output.innerHTML = JSON.stringify(savedData, null, 4);
  });
});
