import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import "mathlive";

const editorContainer = document.querySelector("#editorjs");

class Formula {
  static get toolbox() {
    return {
      title: "Formula",
      icon: '<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.1873 4.14049C11.2229 3.41714 9.84236 4.0695 9.78883 5.27389L9.71211 7H12C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9H9.62322L9.22988 17.8501C9.0996 20.7815 5.63681 22.261 3.42857 20.3287L3.34151 20.2526C2.92587 19.8889 2.88375 19.2571 3.24743 18.8415C3.61112 18.4259 4.24288 18.3837 4.65852 18.7474L4.74558 18.8236C5.69197 19.6517 7.17602 19.0176 7.23186 17.7613L7.62125 9H6C5.44772 9 5 8.55228 5 8C5 7.44772 5.44772 7 6 7H7.71014L7.7908 5.18509C7.9157 2.37483 11.1369 0.852675 13.3873 2.54049L13.6 2.69999C14.0418 3.03136 14.1314 3.65817 13.8 4.09999C13.4686 4.54182 12.8418 4.63136 12.4 4.29999L12.1873 4.14049Z" fill="#212121"/><path d="M13.082 13.0462C13.3348 12.9071 13.6525 13.0103 13.7754 13.2714L14.5879 14.9979L11.2928 18.2929C10.9023 18.6834 10.9023 19.3166 11.2928 19.7071C11.6834 20.0977 12.3165 20.0977 12.707 19.7071L15.493 16.9212L16.2729 18.5786C16.9676 20.0548 18.8673 20.4808 20.1259 19.4425L20.6363 19.0214C21.0623 18.6699 21.1228 18.0397 20.7713 17.6136C20.4198 17.1876 19.7896 17.1272 19.3636 17.4787L18.8531 17.8998C18.6014 18.1074 18.2215 18.0222 18.0825 17.727L16.996 15.4182L19.707 12.7071C20.0976 12.3166 20.0976 11.6834 19.707 11.2929C19.3165 10.9024 18.6834 10.9024 18.2928 11.2929L16.0909 13.4948L15.585 12.4198C14.9708 11.1144 13.3822 10.5985 12.1182 11.2937L11.518 11.6238C11.0341 11.89 10.8576 12.498 11.1237 12.982C11.3899 13.4659 11.998 13.6424 12.4819 13.3762L13.082 13.0462Z" fill="#212121"/></svg>',
    };
  }

  constructor({ data }) {
    this.data = data;
    this.wrapper = undefined;
  }

  render() {
    this.wrapper = document.createElement("math-field");
    this.wrapper.setValue(this.data.latex);
    this.wrapper.mathVirtualKeyboardPolicy = "sandboxed";
    this.wrapper.addEventListener("focusin", (evt) =>
      window.mathVirtualKeyboard.show()
    );
    this.wrapper.addEventListener("focusout", (evt) =>
      window.mathVirtualKeyboard.hide()
    );

    this.wrapper.addEventListener("keydown", (e) => {
      e.stopPropagation();
      e.preventDefault();
    });

    return this.wrapper;
  }

  save(blockContent) {
    return {
      latex: blockContent.value,
    };
  }
}

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
    const caption = document.createElement("div");

    image.src = url;
    caption.contentEditable = true;
    caption.innerHTML = captionText || "";

    this.wrapper.innerHTML = "";
    this.wrapper.appendChild(image);
    this.wrapper.appendChild(caption);
  }

  save(blockContent) {
    const image = blockContent.querySelector("img");
    const caption = blockContent.querySelector("[contenteditable]");

    return {
      url: image.src,
      caption: caption.innerHTML || "",
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
    image: {
      class: SimpleImage,
      inlineToolbar: true,
    },
    formula: Formula,
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
