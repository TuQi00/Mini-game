const body = document.getElementById("body");
const currentQuestion = document.getElementById("current-question");
const guessInput = document.getElementById("guessInput");
const message = document.getElementById("message");
const player_name = document.getElementsByClassName("player-name");
const player_container = document.getElementsByClassName("player-container")[0];
const randomScore = document.getElementById('random-Score')
const guessButton = document.getElementById("guess-button");
const luotChoi = document.getElementsByClassName('luotChoi-player')
const playerScore = document.getElementsByClassName('player-score')

let tuKhoa2 = ['DANANG', 'PHUQUOC', 'GIAYVESINH', 'UONGNUOCNGOTCOGA', 'TRANQUOCTUAN']
let Cauhoi2 =
    ['Quần đảo Hoàng Sa thuộc tỉnh/thành phố nào nước ta?',
        'Đảo nào lớn nhât nước ta?',
        'Vào tháng 3/2023, tờ New York Post đã cảnh báo vật dụng này có những tạp chất có khả năng gây ung thư ?',
        'Theo nghiên cứu được công bố trên tạp chí Stroke, nếu làm hành động này mỗi ngày có thể tăng gấp 3 lần nguy cơ mắc chứng suy giảm trí nhớ ?',
        '"Nếu bệ hạ muốn hàng giặc thì trước hãy chém đầu thần rồi hãy hàng" là câu nói của ai ?']

let players = [createPlayer("Tứ Quý"), createPlayer("Đạt"), createPlayer("Huy"), createPlayer("Long")]
let index_cauhoi = 0
let cauhoi = Cauhoi2[index_cauhoi]
let tuKhoa = tuKhoa2[index_cauhoi];
let score = 0

function createPlayer(name) {
    return {
        name: name,
        score: 0,
        remainingGuesses: 3
    };
}

function displayPlayer(players) { // Tạo Player
    for (let i = 0; i < players.length; i++) {
        let player = document.createElement('div')
        player.className = 'player'
        let divName = document.createElement('div')
        divName.className = `luotChoi-player`;
        divName.innerHTML = `Lượt: ${players[i].remainingGuesses}`
        let h3 = document.createElement('h3')
        h3.className = 'player-name'
        h3.innerHTML = players[i].name
        let divScore = document.createElement('div')
        divScore.className = 'player-score'
        divScore.innerHTML = `Điểm: ${players[i].score}`

        player.appendChild(divName)
        player.appendChild(h3)
        player.appendChild(divScore)
        player_container.appendChild(player)
    }
}

function random_Score() { // Random điểm ngẫu nhiên
    let number = 0;// mặc định điểm là 0
    // Hàm random điểm và lưu điểm vào number sau mỗi lần chạy
    function updateScore() {
        let randomNumber = Math.random();
        if (randomNumber < 0.2) {
            number = "Mất lượt";
            randomScore.innerHTML = "Mất lượt"
            score = 0;
        } else {
            let randomScoreNumber = Math.floor(Math.random() * 10) * 10;
            number = randomScoreNumber;
            score = randomScoreNumber;
            randomScore.innerHTML = randomScoreNumber
        }
    }
    //random điểm sau mỗi 0,2s
    const interval = setInterval(updateScore, 200);

    //set dừng việc random sau 2s
    setTimeout(() => { // lấy được kết quả cuối cùng sau khi random
        clearInterval(interval);

        if (score == 0) {
            luotChoi[currentPlayerIndex].style.backgroundColor = '#fff'
            currentPlayer.remainingGuesses--
            displayScores()
            message.innerHTML = (`${currentPlayer.name} đã mất lượt.`);
            currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
            currentPlayer = players[currentPlayerIndex]
            luotChoi[currentPlayerIndex].style.backgroundColor = '#c57575'
        }
    }, 2000);


}

function createWord() { // Tạo ô chữ
    const ketQua = document.getElementById("ketQua");
    for (let i = 0; i < tuKhoa.length; i++) {
        let td = document.createElement(`td`);
        td.id = `kq${i}`
        td.innerText = '?';
        ketQua.appendChild(td);
    }
    currentQuestion.innerHTML = cauhoi
}

function displayScores() { // Cật nhật điểm ng chơi hiện tại
    luotChoi[currentPlayerIndex].innerHTML = `Lượt: ${currentPlayer.remainingGuesses}`
    playerScore[currentPlayerIndex].innerHTML = `Điểm: ${currentPlayer.score}`
}

function guess() { // Kiểm tra lượt đoán còn lại và số lựng chữ cái nhập
    const letter = guessInput.value.toUpperCase()
    guessInput.value = '';

    if (!letter.match(/[A-Z]/) || letter.length !== 1) {
        alert("Vui lòng chỉ nhập một chữ cái A-Z!");
        return;
    }

    if (currentPlayer.remainingGuesses == 0) {
        alert(`${currentPlayer.name} đã hết lượt đoán`);
        return;
    }


    checkGuess(letter);
}

function checkGuess(letter) { // Kiểm tra chữ cái đoán với ô chữ
    let ketqua = "";
    let doan = 0;

    for (let i = 0; i < tuKhoa.length; i++) {
        if (tuKhoa[i] == letter) {
            doan++;
            const kq = document.getElementById(`kq${i}`);
            if (kq) {
                kq.innerHTML = letter
            }
            currentPlayer.score += score
            displayScores();
        }
        const temp = document.getElementById(`kq${i}`);
        ketqua += temp.textContent;
    }

    if (doan == 0) {
        luotChoi[currentPlayerIndex].style.backgroundColor = '#fff'
        currentPlayer.remainingGuesses--
        displayScores();
        message.innerHTML = (`${currentPlayer.name} đã đoán sai.`);

        if (currentPlayer) {
            currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
            currentPlayer = players[currentPlayerIndex]
            luotChoi[currentPlayerIndex].style.backgroundColor = '#c57575'
        } else {
            currentPlayer = currentPlayer
        }

    } else {
        message.innerHTML = (`${currentPlayer.name} đã đoán đúng chữ cái ${letter}. Tiếp tục đoán!`);
    }

    if (tuKhoa == ketqua) {
        alert('Bạn đã hoàn thành ô chữ!!!')
    }

}

function startGame() { // Start
    currentPlayerIndex = 0;
    currentPlayer = players[currentPlayerIndex]
    createWord();
    displayPlayer(players)
    luotChoi[currentPlayerIndex].style.backgroundColor = '#c57575'
}

function resetGame() { // Reset
    removeAnswer()

    index_cauhoi = (index_cauhoi + 1) % Cauhoi2.length;
    tuKhoa = tuKhoa2[index_cauhoi]
    cauhoi = Cauhoi2[index_cauhoi]

    for (let i = 0; i < players.length; i++) {
        players[i].score = 0
        playerScore[i].innerHTML = `Điểm: ${players[i].score}`
        players[i].remainingGuesses = 3
        luotChoi[i].innerHTML = `Lượt: ${players[i].remainingGuesses}`
        luotChoi[i].style.backgroundColor = '#fff';
    }

    currentPlayerIndex = 0;
    currentPlayer = players[currentPlayerIndex];
    luotChoi[currentPlayerIndex].style.backgroundColor = '#c57575'
    createWord();
    displayScores();
    message.innerHTML = '';
    guessInput.value = '';
}

function removeAnswer() { // xóa ô chữ 
    let result = document.getElementsByTagName('tr')
    for (let i = 0; i < result.length; i++) {
        result[i].remove()
    }
    let tr = document.createElement(`tr`);
    tr.id = `ketQua`
    body.appendChild(tr);
}

startGame()
