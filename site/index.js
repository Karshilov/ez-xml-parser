import init, { greet, gen_parent } from "ez-xml-parser";

const singleText = `<view id="container">
<text id="testText" class="redText" value="hello canvas"></text>
</view>`;

const fullText = new Array(100000)
  .fill(singleText)
  .reduce((pre, cur) => pre + cur);

async function run() {
  await init();
  const textarea = document.createElement("textarea");
  textarea.setAttribute("rows", 40);
  textarea.setAttribute("cols", 30);
  textarea.setAttribute("style", "margin: 20px; padding: 5px;");
  let cur = performance.now();
  let res = gen_parent(fullText);
  const t1 = document.createElement("span");
  t1.appendChild(document.createTextNode(performance.now() - cur));
  textarea.appendChild(document.createTextNode(JSON.stringify(res, null, 2)));
  const textarea2 = document.createElement("textarea");
  textarea2.setAttribute("rows", 40);
  textarea2.setAttribute("cols", 30);
  textarea2.setAttribute("style", "margin: 20px; padding: 5px;");
  textarea2.appendChild(document.createTextNode(fullText));
  const root = document.getElementById("root");
  root.appendChild(textarea2);
  root.appendChild(textarea);
  root.appendChild(t1);
}

run();
