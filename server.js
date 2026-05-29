const express = require('express');
const fs = require('fs');
const app = express();

app.listen(process.env.PORT || 8080, function(){
    console.log('listening on 8080')
});

// 안내 화면
app.get('/mind', function(요청, 응답){
    응답.send('심리 상태 자가진단');
});

// 질문지 화면
app.get('/mind.que', function(요청, 응답){
    응답.send('심리 상태 자가진단 질문');
});

// 저장
app.get('/save', function(요청, 응답){

    const result = 요청.query.result;

    fs.readFile('results.json', 'utf8', function(err, data){
        let results = JSON.parse(data);

        results.push({
            result: result
        });

        fs.writeFile('results.json', JSON.stringify(results, null, 2), function(){
            응답.send('저장 완료!');
        });
    });
});

// 메인 화면
app.get('/', function(요청, 응답){
    응답.sendFile(__dirname + '/index.html');
});