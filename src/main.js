import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";

const editorContainer = document.querySelector("#editorjs");

// https://cdn.pixabay.com/photo/2017/09/01/21/53/blue-2705642_1280.jpg
class SimpleImage {
  static get toolbox() {
    return {
      title: "Image",
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
    };
  }

  constructor({ data }) {
    this.data = data;
    this.wrapper = undefined;
  }

  render() {
    this.wrapper = document.createElement("div");

    this.wrapper.classList.add("simple-image");
    if (this.data && this.data.url) {
      this._createImage(this.data.url, this.data.caption);
      return this.wrapper;
    }

    this.wrapper.appendChild(input);

    input.placeholder = "Paste an image URL...";
    input.value = this.data && this.data.url ? this.data.url : "";

    input.addEventListener("paste", (event) => {
      this._createImage(event.clipboardData.getData("text"));
    });

    return this.wrapper;
  }

  _createImage(url, captionText) {
    const image = document.createElement("img");
    const caption = document.createElement("input");

    image.src = url;
    caption.placeholder = "Caption...";
    caption.value = captionText || "";

    this.wrapper.innerHTML = "";
    this.wrapper.appendChild(image);
    this.wrapper.appendChild(caption);
  }

  save(blockContent) {
    const image = blockContent.querySelector("img");
    const caption = blockContent.querySelector("input");

    return {
      url: image.src,
      caption: caption.value,
    };
  }

  validate(savedData) {
    if (!savedData.url.trim()) {
      return false;
    }

    return true;
  }
}

const editor = new EditorJS({
  holder: editorContainer,
  autofocus: true,
  tools: {
    header: Header,
    list: List,
    image: SimpleImage,
  },
  data: {
    time: 1550476186479,
    version: "2.8.1",
    blocks: [
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
