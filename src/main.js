/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/#installation/NodgNARATAdAHDKFIGYQjnEKCMA2ATgFYQAWbAlPPEKPU5CAUwDtkAGMYHMTzn/gF1IBAGZwcKJkwiCgA===
 */

import {
  ClassicEditor,
  Autosave,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Link,
  AutoLink,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

import "./style.css";

const editorConfig = {
  toolbar: {
    items: ["undo", "redo", "|", "bold", "italic", "|", "link"],
    shouldNotGroupWhenFull: false,
  },
  plugins: [AutoLink, Autosave, Bold, Essentials, Italic, Link, Paragraph],
  initialData: "Congratulations on setting up CKEditor 5! 🎉",
  licenseKey: "GPL", // or <YOUR_LICENSE_KEY>.
  link: {
    addTargetToExternalLinks: true,
    defaultProtocol: "https://",
    decorators: {
      toggleDownloadable: {
        mode: "manual",
        label: "Downloadable",
        attributes: {
          download: "file",
        },
      },
    },
  },
  placeholder: "Type or paste your content here!",
};

ClassicEditor.create(document.querySelector("#editor"), editorConfig);
