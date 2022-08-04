let chatlogAfterArr = [];

btn1.onclick = () => {
  chatlogAfterArr = [];
  let chatlogBefore = document.getElementById("chatlog").value;
  let chatlogArr = chatlogBefore.split(/\r?\n/);

  chatlogArr.forEach(textRow => {
    for (let elem in textRow) {
      let row = textRow[elem];
      if (row == "[") {
        let elemIndex = textRow.indexOf("]");
        textRow = textRow.slice(elemIndex + 1, textRow.length - 1);
      };
    };
  
    for (let elem in textRow) {
      let row = textRow[elem];
      if (row == "!") {
        for (let elem2 in textRow) {
          if (textRow[elem2] == "}") {
            let arr = Array.from(textRow);
            for (let i = elem; i <= elem2; i++) {
              textRow = delete arr[i];
              textRow = arr.filter((value, index) => {
                return value != undefined;
              });
              textRow = textRow.join("");
            };
            break;
          };
        };
      };
    };

    if(textRow[0]==' ') { textRow = textRow.substring(1); };

    if (textRow[0] != '(' && textRow[1] != '(') {
      chatlogAfterArr.push(textRow + `\n`);
    };
  });

  chatlogAfterArr = chatlogAfterArr.join('');

  document.getElementById("textarea2").value = chatlogAfterArr;
};

swapbtn.onclick = () => {
  let charNameBefore = document.getElementById("text1").value;
  let charNameAfter = document.getElementById("text2").value;
  let chatlogArr = chatlogAfterArr.split(/\r?\n/);
  let charNameEdited =  0;
  let finaleArr = [];

  chatlogArr.forEach(charName => {
    if (charName.includes(charNameBefore)) {
      charNameEdited = charName.replace(charNameBefore, charNameAfter);
    } else {
      charNameEdited = charName;
    };

    finaleArr.push(charNameEdited + `\n`);
  });

  finaleArr = finaleArr.join('');

  document.getElementById("textarea2").value = finaleArr;

  chatlogAfterArr = finaleArr;
};