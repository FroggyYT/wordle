const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

const { v4 } = require("uuid");

const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/dist`));

app.use(cookieParser());

function random(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

const WORD_LIST = ["Abuse","Adult","Agent","Anger","Apple","Award","Basis","Beach","Birth","Block","Blood","Board","Brain","Bread","Break","Brown","Buyer","Cause","Chain","Chair","Chest","Chief","Child","China","Claim","Class","Clock","Coach","Coast","Court","Cover","Cream","Crime","Cross","Crowd","Crown","Cycle","Dance","Death","Depth","Doubt","Draft","Drama","Dream","Dress","Drink","Drive","Earth","Enemy","Entry","Error","Event","Faith","Fault","Field","Fight","Final","Floor","Focus","Force","Frame","Frank","Front","Fruit","Glass","Grant","Grass","Green","Group","Guide","Heart","Henry","Horse","Hotel","House","Image","Index","Input","Issue","Japan","Jones","Judge","Knife","Laura","Layer","Level","Lewis","Light","Limit","Lunch","Major","March","Match","Metal","Model","Money","Month","Motor","Mouth","Music","Night","Noise","North","Novel","Nurse","Offer","Order","Other","Owner","Panel","Paper","Party","Peace","Peter","Phase","Phone","Piece","Pilot","Pitch","Place","Plane","Plant","Plate","Point","Pound","Power","Press","Price","Pride","Prize","Proof","Queen","Radio","Range","Ratio","Reply","Right","River","Round","Route","Rugby","Scale","Scene","Scope","Score","Sense","Shape","Share","Sheep","Sheet","Shift","Shirt","Shock","Sight","Simon","Skill","Sleep","Smile","Smith","Smoke","Sound","South","Space","Speed","Spite","Sport","Squad","Staff","Stage","Start","State","Steam","Steel","Stock","Stone","Store","Study","Stuff","Style","Sugar","Table","Taste","Terry","Theme","Thing","Title","Total","Touch","Tower","Track","Trade","Train","Trend","Trial","Trust","Truth","Uncle","Union","Unity","Value","Video","Visit","Voice","Waste","Watch","Water","While","White","Whole","Woman","World","Youth","Alcon","Aught","Hella","Ought","Thame","There","Thine","Thine","Where","Which","Whose","Whoso","Yours","Yours","Admit","Adopt","Agree","Allow","Alter","Apply","Argue","Arise","Avoid","Begin","Blame","Break","Bring","Build","Burst","Carry","Catch","Cause","Check","Claim","Clean","Clear","Climb","Close","Count","Cover","Cross","Dance","Doubt","Drink","Drive","Enjoy","Enter","Exist","Fight","Focus","Force","Guess","Imply","Issue","Judge","Laugh","Learn","Leave","Limit","Marry","Match","Occur","Offer","Order","Phone","Place","Point","Press","Prove","Raise","Reach","Refer","Relax","Serve","Shall","Share","Shift","Shoot","Sleep","Solve","Sound","Speak","Spend","Split","Stand","Start","State","Stick","Study","Teach","Thank","Think","Throw","Touch","Train","Treat","Trust","Visit","Voice","Waste","Watch","Worry","Would","Write","Above","Acute","Alive","Alone","Angry","Aware","Awful","Basic","Black","Blind","Brave","Brief","Broad","Brown","Cheap","Chief","Civil","Clean","Clear","Close","Crazy","Daily","Dirty","Early","Empty","Equal","Exact","Extra","Faint","False","Fifth","Final","First","Fresh","Front","Funny","Giant","Grand","Great","Green","Gross","Happy","Harsh","Heavy","Human","Ideal","Inner","Joint","Large","Legal","Level","Light","Local","Loose","Lucky","Magic","Major","Minor","Moral","Naked","Nasty","Naval","Other","Outer","Plain","Prime","Prior","Proud","Quick","Quiet","Rapid","Ready","Right","Roman","Rough","Round","Royal","Rural","Sharp","Sheer","Short","Silly","Sixth","Small","Smart","Solid","Sorry","Spare","Steep","Still","Super","Sweet","Thick","Third","Tight","Total","Tough","Upper","Upset","Urban","Usual","Vague","Valid","Vital","White","Whole","Wrong","Young","Afore","After","Bothe","Other","Since","Slash","Until","Where","While","Aback","Abaft","Aboon","About","Above","Accel","Adown","Afoot","Afore","Afoul","After","Again","Agape","Agogo","Agone","Ahead","Ahull","Alife","Alike","Aline","Aloft","Alone","Along","Aloof","Aloud","Amiss","Amply","Amuck","Apace","Apart","Aptly","Arear","Aside","Askew","Awful","Badly","Bally","Below","Canny","Cheap","Clean","Clear","Coyly","Daily","Dimly","Dirty","Ditto","Drily","Dryly","Dully","Early","Extra","False","Fatly","Feyly","First","Fitly","Forte","Forth","Fresh","Fully","Funny","Gaily","Gayly","Godly","Great","Haply","Heavy","Hella","Hence","Hotly","Icily","Infra","Jildi","Jolly","Laxly","Lento","Light","Lowly","Madly","Maybe","Never","Newly","Nobly","Oddly","Often","Other","Ought","Party","Piano","Plain","Plonk","Plumb","Prior","Queer","Quick","Quite","Ramen","Rapid","Redly","Right","Rough","Round","Sadly","Secus","Selly","Sharp","Sheer","Shily","Short","Shyly","Silly","Since","Sleek","Slyly","Small","Sound","Spang","Srsly","Stark","Still","Stone","Stour","Super","Tally","Tanto","There","Thick","Tight","Today","Tomoz","Truly","Twice","Under","Utter","Verry","Wanly","Wetly","Where","Wrong","Wryly","Abaft","Aboon","About","Above","Adown","Afore","After","Along","Aloof","Among","Below","Circa","Cross","Furth","Minus","Neath","Round","Since","Spite","Under","Until","Aargh","Adieu","Adios","Alack","Aloha","Avast","Bakaw","Basta","Begad","Bless","Blige","Brava","Bravo","Bring","Chook","Damme","Dildo","Ditto","Frick","Fudge","Golly","Gratz","Hallo","Hasta","Havoc","Hella","Hello","Howay","Howdy","Hullo","Huzza","Jesus","Kapow","Loose","Lordy","Marry","Mercy","Night","Plonk","Psych","Quite","Salve","Skoal","Sniff","Sooey","There","Thiam","Thwap","Tough","Twirp","Viola","Vivat","Wacko","Wahey","Whist","Wilma","Wirra","Woops","Wowie","Yecch","Yeeha","Yeesh","Yowch","Zowie"];

// let WORD = WORD_LIST[random(0, WORD_LIST.length)].toUpperCase();

const newWord = () => {
    return WORD_LIST[random(0, WORD_LIST.length)].toUpperCase();
}

let WORD_MAP = {}

app.get("/checkWord", ({ query, cookies }, res) => {
    let { word } = query;

    let cookie_id = null;

    if (cookies.uid == undefined) {
        cookie_id = v4();
        res.cookie("uid", cookie_id);
    }

    if (cookie_id != null) WORD_MAP[cookie_id] = newWord();
    if (WORD_MAP[cookies.uid] == undefined) WORD_MAP[cookies.uid] = newWord();

    let WORD = WORD_MAP[cookies.uid || cookie_id];

    let mapped = WORD.split("").map((v, i) => {
        return (v == word.charAt(i) ? "right" : (WORD.match(word.charAt(i)) ? "spot" : "wrong"));
    });
    
    // if (word == WORD) WORD_MAP[cookies.uid || cookie_id] = newWord();
    console.log(word, WORD);

    res.send(mapped);
});

app.get("/getWord", ({ cookies }, res) => {
    res.send(WORD_MAP[cookies.uid]);
})

app.get("/newWord", ({ cookies }, res) => {
    WORD_MAP[cookies.uid] = newWord();
    res.end();
});

app.listen(PORT, async () => {
    console.log(`Server started on http://localhost${PORT != 80 ? ":"+PORT : ""}/`);
});