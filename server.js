const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

const users = {}; // Store user data
const celebrities = [
    "蝦餃",
    "燒賣",
    "燒賣",
    "牛肉球",
    "蝦餃",
    "牛肉球",
    "財神爺",
    "聖誕老人",
    "財神爺",
    "關公",
    "財神爺",
    "佛祖",
    "聖誕老人",
    "佛祖",
    "觀音",
    "佛祖",
    "旺角",
    "尖沙咀",
    "旺角",
    "中環",
    "冷氣",
    "風扇",
    "冷氣",
    "雪條",
    "糖水",
    "咖啡",
    "香港迪士尼樂園",
    "海洋公園",
    "石油煉製廠",
    "核電廠",
    "中式早茶",
    "西式早餐",
    "茶餐廳",
    "星巴克",
    "八達通",
    "信用卡",
    "小籠包",
    "鍋貼",
    "太極拳",
    "空手道",
    "港式奶茶",
    "泡沫紅茶",
    "酸梅湯",
    "椰汁",
    "港鐵",
    "巴士",
    "機場快線",
    "地鐵東鐵線",
    "麥當勞",
    "肯德基",
    "蘭桂坊",
    "紅磡",
    "旺角區",
    "尖沙咀區",
    "太空船地鐵",
    "東涌纜車",
    "蛋撻",
    "蛋散",
    "海南雞飯",
    "燒鵝飯",
    "鹹魚炒飯",
    "蝦仁炒飯",
    "國際學校",
    "補習社",
    "銅鑼灣",
    "尖沙咀",
    "煲仔飯",
    "炆蟹煲",
    "花生糖",
    "牛肉乾",
    "蘿蔔糕",
    "糯米糍",
    "糖醋排骨",
    "紅燒肉",
    "機器人",
    "外星人",
    "薯條",
    "炸魚",
    "風箏",
    "飛機",
    "運動會",
    "演唱會",
    "香港電台",
    "商業電台",
    "橄欖球",
    "足球",
    "藥物",
    "毒品",
    "千層酥",
    "酥皮蛋撻",
    "鹹魚茄子煲",
    "豆腐蝦仁煲",
    "鴛鴦奶茶",
    "白開水",
    "麵包店",
    "西餐廳",
    "港式糯米飯",
    "珍珠米飯",
    "燒味店",
    "粥店",
    "跑馬地",
    "沙田",
    "中環摩天輪",
    "太平山頂纜車",
    "螺蛳粉",
    "牛肉粉",
    "餃子",
    "湯包",
    "烤鴨",
    "燒鵝",
    "蘋果日報",
    "明報",
    "鴛鴦火鍋",
    "麻辣火鍋",
    "羽毛球",
    "乒乓球",
    "豬肉腸粉",
    "鮮蝦腸粉",
    "蜜糖蘆薈",
    "菠蘿冰",
    "西瓜汁",
    "椰青汁",
    "豬仔包",
    "蛋撻",
    "榴蓮千層糕",
    "芒果班戟",
    "荔枝",
    "芒果",
    "蝦餃粉腸",
    "牛肉腸粉",
    "檸檬茶",
    "冰紅茶",
    "木棍",
    "手榴彈",
    "旅行卡片",
    "紀念品",
    "劉德華",
    "郭富城",
    "電影",
    "電視劇",
    "中秋節",
    "端午節",
    "清明節",
    "重陽節",
    "健身房",
    "舞蹈室",
    "市場",
    "商場",
    "動物園",
    "海洋公園",
    "機場",
    "火車站",
    "美容院",
    "理髮店",
    "香港小姐",
    "模特兒",
    "飛行員",
    "潛水員",
    "牛仔褲",
    "短褲",
    "高跟鞋",
    "拖鞋",
    "足球隊",
    "籃球隊",
    "警車",
    "消防車",
    "電子琴",
    "吉他",
    "女傭",
    "司機",
    "狗仔隊",
    "新聞記者",
    "記者",
    "攝影師",
    "舞蹈家",
    "歌唱家",
    "音樂家",
    "畫家",
    "律師",
    "法官",
    "醫生",
    "護士",
    "博物館",
    "圖書館",
    "記者",
    "攝影師",
    "舞蹈家",
    "歌唱家",
    "音樂家",
    "畫家",
    "律師",
    "法官",
    "醫生",
    "護士",
    "商場",
    "街市",
    "燒烤",
    "火鍋",
    "李小龍",
    "成龍",
    "麻雀",
    "烏鴉",
    "肥佬",
    "肥肉",
    "狀元",
    "冠軍",
    "蜘蛛俠",
    "蜘蛛精",
    "牛奶",
    "豆漿",
    "保安",
    "保鏢",
    "白菜",
    "生菜",
    "辣椒",
    "芥末",
    "警察",
    "捕快",
    "大便",
    "臭豆腐",
    "魔術師",
    "魔法師",
    "茶餐廳",
    "茶樓",
    "售貨員",
    "收銀員",
    "推銷員",
    "客服",
    "律師",
    "法官",
    "警察",
    "消防",
    "無綫電視",
    "亞洲電視",
    "茶餐廳",
    "冰室",
    "大班",
    "美心",
    "燒烤",
    "火鍋",
    "八達通",
    "信用卡",
    "天星小輪",
    "港鐵",
    "香港仔",
    "赤柱",
    "叮叮車",
    "巴士",
    "香港國際機場",
    "啟德機場",
    "黃大仙祠",
    "天后廟",
    "復活節",
    "清明節",
    "情人節",
    "七夕",
    "天星碼頭",
    "天壇大佛",
    "香港會議展覽中心",
    "香港藝術館",
    "半山自動扶梯",
    "摩天輪",
    "新年煙花匯演",
    "元宵燈會",
    "香港電影節",
    "香港藝術節",
    "燒臘節",
    "美食博覽",
    "小巴",
    "大巴",
    "高鐵",
    "港鐵",
    "渡輪",
    "快艇",
    "鮮榨果汁",
    "氣泡水",
    "龍蝦湯",
    "海鮮粥",
    "豉油雞",
    "柱侯牛腩",
    "舞龍",
    "舞獅",
    "京劇",
    "粵劇",
    "詠春",
    "太極",
    "遠足",
    "野餐",
    "攝影",
    "畫畫",
    "梁朝偉",
    "劉嘉玲",
    "古天樂",
    "郭富城",
    "周星馳",
    "張學友",
    "太陽眼鏡",
    "防曬霜",
    "烤乳豬",
    "片皮鴨",
];

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Handle socket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Join the game room
  socket.join('gameRoom');

  // Handle username input
  socket.on('username', (payload) => {
    const username = payload.username;
    const clientId = payload.clientId;

    let oldUser = null;
    for (const userId in users) {
      let user = users[userId];
      if (user.clientId === clientId) {
        oldUser = users[userId];
        delete users[userId];
        break;
      }
    }

    for (const userId in users) {
      let user = users[userId];
      if (user.username === username) {
        io.to('gameRoom').emit('userList', Object.values(users));
        socket.emit("duplicated_username", true);
        return;
      }
    }

    if (oldUser !== null) {
      users[socket.id] = oldUser;
      users[socket.id].isActive = true;
    } else {
      users[socket.id] = { username: username, celebrity: null, isActive: true, clientId : clientId};
    }
    
    io.to('gameRoom').emit('userList', Object.values(users));
  });

  // Handle start game event
  socket.on('startGame', () => {
    // Assign random celebrities to users
    tmp_celebrities = [...celebrities];
    const shuffledCelebrities = shuffleArray(tmp_celebrities);
    for (const userId in users) {
      let user = users[userId];
      if (!user.isActive) {
          delete users[userId];
      }
  }
    for (const userId in users) {
      if (users.hasOwnProperty(userId)) {
        users[userId].celebrity = shuffledCelebrities.pop();
      }
    }

    // Emit updated user list with celebrities
    io.to('gameRoom').emit('userList', Object.values(users));
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected');
    if (users.hasOwnProperty(socket.id)) {
      users[socket.id].isActive = false;
    }
  });
});

// Helper function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

http.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});