let chatlogAfterArr = [];

btn1.onclick = () => {
  chatlogAfterArr = [];
  let chatlogBefore = document.getElementById("chatlog").value;
  let chatlogArr = chatlogBefore.split(/\r?\n/);

// Перебираем все строки

  chatlogArr.forEach(textRow => {
    // Внутри каждой строки удаляем отметки даты и времени в квадратных скобках
    // Выходим из цикла после первого нахождения квадратных скобок

    for (let elem in textRow) {
      let row = textRow[elem];
      if (row == "[") {
        let elemIndex = textRow.indexOf("]");

        textRow = textRow.slice(elemIndex + 1, textRow.length);

        break;
      };
    };

    // Внутри каждой строки удаляем отметки упоминания цветов, отрабатываем
    // пока не будут удалены все фигурные скобки

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
          elem = textRow.indexOf('!');
        };
      };
    };


    // Форматируем пробелы, оставшиеся после удаления фигурных скобок

    if(textRow[0]==' ') { textRow = textRow.substring(1); };

    // Добавляем в вывод обработчика только ис чаты, игнорируя /b и /ab

    if ((textRow[0] != '(' && textRow[1] != '(') || (textRow[0] != '>' &&
    textRow[1] != '(' && textRow[2] != '(')) {
      chatlogAfterArr.push(textRow + `\n`);
    };
  });

  // Удаляем в выводе запятые

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
    // Заменяем значения в блоке Изменения

    if (charName.includes(charNameBefore)) {
      charNameEdited = charName.replace(charNameBefore, charNameAfter);
    } else {
      charNameEdited = charName;
    };

    // Добавляем в новый массив измененные данные

    finaleArr.push(charNameEdited + `\n`);
  });

  // Удаляем в выводе запятые

  finaleArr = finaleArr.join('');

  document.getElementById("textarea2").value = finaleArr;

  chatlogAfterArr = finaleArr;
};