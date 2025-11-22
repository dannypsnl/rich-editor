import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import "mathlive";
import { SimpleImage } from "./simpleImage";
import { Formula } from "./mathlive";
import Embed from "@editorjs/embed";

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
    embed: {
      class: Embed,
      config: {
        services: {
          youtube: true,
          instagram: true,
          twitter: true,
        },
      },
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
        type: "embed",
        data: {
          service: "youtube",
          source: "https://www.youtube.com/watch?v=RcVA8Nj6HEo",
          embed: "https://www.youtube.com/embed/RcVA8Nj6HEo",
          width: 580,
          height: 320,
          caption: "What is PLUS times PLUS?",
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
