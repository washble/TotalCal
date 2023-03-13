let orderCheck = document.getElementById("order-check");
let split = document.getElementById("split");
let message = document.getElementById("message");
let total = document.getElementById("total");
let btnCalculation = document.getElementById("btn-calculation");

const re = new RegExp(/[^0123456789.]/g);

btnCalculation.onclick = () => {
  if(!split.value) {
    total.value = `분리기준을 넣어주세요`;
    return;
  }

  if(!message.value) {
    total.value = `계산할 내용을 넣어주세요`;
    return;
  }

  let splitEnter = message_split(message.value, '\n');
  let splits = [];
  for(let i = 0; i < splitEnter.length; i++)
    splits.push(orderCheck.checked ? message_split(splitEnter[i], split.value).splice(1) : message_split(splitEnter[i], split.value));
  
  let split_check_result = split_correct_check(splits);
  if(split_check_result != -1) {
    total.value = `1번 항목 기준으로 ${split_check_result}번 항목이 맞지 않습니다.`;
    return;
  }
    
  let onlyNumSplits = remove_string(splits);
  console.log(onlyNumSplits);
  total.value = add_total(onlyNumSplits);
}

message_split = (data, split_syntax) => {
  return data.split(split_syntax);
}

split_correct_check = (splits) => {
  for(let i = 1; i < splits.length; i++) {
    if(splits[0].length != splits[i].length) {
      return i + 1;
    }
  }
  return -1;
}

remove_string = (splits) => {
  for(let i = 0; i < splits.length; i++) {
    for(let j = 0; j < splits[i].length; j++) {
      splits[i][j] = splits[i][j].replaceAll(re, '');
    }
  }
  return splits;
}

add_total = (data) => {
  let results = '';
  for(let i = 0; i < data[0].length; i++) {
    let result = 0;
    for(let j = 0; j < data.length; j++) {
      result += Number(data[j][i]);
    }
    results += result + '/';
  }
  return results.substring(0, results.length - 1);
}