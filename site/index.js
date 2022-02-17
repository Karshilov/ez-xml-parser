import init, { greet, gen_parent } from "ez-xml-parser";

async function run() {
  await init();
  const textarea = document.createElement("textarea");
  textarea.setAttribute("rows", 40);
  textarea.setAttribute("cols", 30);
  textarea.setAttribute("style", "margin: 20px; padding: 5px;")
  textarea.appendChild(
    document.createTextNode(
      JSON.stringify(
        gen_parent(`<view id="container">
      <text id="testText" class="redText" value="hello canvas"></text>
    </view>`),
        null,
        2
      )
    )
  );
  const textarea2 = document.createElement("textarea");
  textarea2.setAttribute("rows", 40);
  textarea2.setAttribute("cols", 30);
  textarea2.setAttribute("style", "margin: 20px; padding: 5px;")
  textarea2.appendChild(
    document.createTextNode(
      `<view id="container">
      <text id="testText" class="redText" value="hello canvas"></text>
    </view>`
    )
  );
  const root = document.getElementById("root");
  root.appendChild(textarea2);
  root.appendChild(textarea)
}

run();
