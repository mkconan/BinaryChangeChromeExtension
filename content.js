// window.alert("成功したよ!")

// ページにウィジェットを追加する
const widget = document.createElement('div');
widget.id = 'custom-widget';
widget.innerHTML = `
  <table class="input-table">
      <tr>
        <th><label>2進数入力</label></th>
        <td><input type="text" class="custom-input" id="custom-input-binary" placeholder="ここに2進数を入力..."></td>
      </tr>
      <tr>
        <th><label>8進数入力</label></th>
        <td><input type="text" class="custom-input" id="custom-input-octary" placeholder="ここに8進数を入力..."></td>
      </tr>
      <tr>
        <th><label>タイマー時間入力（分数）</label></th>
        <td><input type="number" class="custom-input" id="custom-input-waittime" placeholder="ここに待ち時間を入力...（分数）"></td>
      </tr>
      <tr>
        <th></th>
        <td><button id="custom-button">OK</button></td>
      </tr>
    </table>
`;

document.body.appendChild(widget);

document.getElementById("custom-button").addEventListener("click", () => {
  const inputBinary = document.getElementById("custom-input-binary").value.trim();
  const inputOctary = document.getElementById("custom-input-octary").value.trim();
  const inputWaitTime = document.getElementById("custom-input-waittime").value.trim();
  if (inputBinary && inputOctary && inputWaitTime) {
      console.log("入力されたテキスト:", inputBinary);
      // 入力されたテキストを基に拡張機能の処理を実行
      executeExtensionFunction(inputBinary, inputOctary, inputWaitTime);
  } else {
      alert("選択された要素がありません");
  }
});

function fillForm(xpath, fill_value) {
  // 指定した要素に、指定した値を入力する
  const textResult = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  const textElement = textResult.singleNodeValue;

  if (textElement) {
    console.log("要素がありました。");
    textElement.value = fill_value;
  } else {
    console.log("指定した要素が見つかりませんでした。");
  }
}

// 拡張機能の処理を定義
function executeExtensionFunction(binary, octary, waitTime) {
  const binaryInputXpath = '//*[@id="n2"]';
  const octaryInputXpath = '//*[@id="n8"]';
  fillForm(binaryInputXpath, binary);
  fillForm(octaryInputXpath, octary);

  const buttonXpath = '//*[@id="input-area"]/form[1]/button';
  const buttonResult = document.evaluate(buttonXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  const targetElement = buttonResult.singleNodeValue;

  if (targetElement) {
    console.log(`${waitTime}分後に実行開始します...`);

    setTimeout(() => {
      targetElement.click();
      console.log("クリックしました！");
    }, Math.floor(waitTime * 60 * 1000));
  } else {
    console.log("指定した要素が見つかりませんでした。");
  }
}



