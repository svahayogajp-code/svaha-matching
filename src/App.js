import { useState } from "react";
import "./App.css";

const TEAL = "#6AACAA";
const LIGHT = "#EEF5F5";
const DARK = "#1C2E2E";
const MID = "#4A7A78";

const questions = [
  {
    id: "q1",
    text: "ヨガ・運動の経験を教えてください。",
    options: [
      { label: "ヨガを継続して練習している", next: "q2a" },
      { label: "運動習慣はあるがヨガは初めて・久しぶり", next: "q2a" },
      { label: "ほとんど運動していない", next: "q2b" },
    ],
  },
  {
    id: "q2a",
    text: "ヨガに求めるものを教えてください。",
    sub: "1つに収まりきらない場合はいちばん近いものをお答えください",
    options: [
      { label: "心身の変化・動きの質を高めたい", next: "result_a2-1" },
      { label: "心身を整えてリセットしたい", next: "result_a2-2" },
      { label: "リラックス・回復したい", next: "result_a2-3" },
      { label: "ヨガを深めたい・講師の指導に興味がある", next: "result_a2-4" },
    ],
  },
  {
    id: "q2b",
    text: "ヨガに求めるものを教えてください。",
    sub: "1つに収まりきらない場合はいちばん近いものをお答えください",
    options: [
      { label: "姿勢改善や不調の予防など", next: "result_b2-1" },
      { label: "心身の変化・パフォーマンスアップ", next: "result_b2-2" },
      { label: "リラックス・疲労回復", next: "result_b2-3" },
      { label: "ヨガを深く知りたい・講師を目指したい", next: "result_b2-4" },
    ],
  },
];

const results = {
  "result_a2-1": {
    msg1: "ヨガや運動経験があって「動きの質」と「心身の変化」に興味があるんですね！\nこれは最もハタヨガの本質に近い「動きを通じて心を整える」という思想に近しいチョイスですね👏\nハタヨガ系クラスがおすすめです！",
    msg2: `SVAHAのハタヨガは解剖学や脳科学のエッセンスと機能改善ワークなども含めた現代的なものですが、同時に背後にあるヨガ哲学を大事にしています。

🧘Hatha Basic（ハタヨガ基礎）
日11:00-12:15　運動量★★★☆☆

🧘Hatha for All（みんなのハタヨガ）
土9:00-10:15　運動量★★★★☆

😮‍💨ちょっとお疲れの日はこちらも
🧘Hatha 101（ハタヨガ入門）
土11:00-12:00・木19:00-20:00（女性限定）
運動量★★☆☆☆
微細に身体を観察して動きやすさを作ります

🧘Flow & Meditation（フローヨガと瞑想）
日15:00-16:00　運動量★☆☆☆☆
アサナと瞑想が半分ずつなので、ちょっと疲れたなという日にぴったりです`,
  },
  "result_a2-2": {
    msg1: "リセット願望がある多忙なあなたには以下のクラスがおすすめです。\n体調や気分でクラスを使い分けるのが合っていそう🤔",
    msg2: `🧘Hatha Basic（ハタヨガ基礎）
日11:00-12:15　運動量★★★☆☆
じっくり集中して動くならコレ！

🧘Gentle Flow（やさしいフローヨガ）
水19:30-20:30　運動量★★☆☆☆
週の真ん中の夜、やりすぎたくないけど動きたいなら

😮‍💨お疲れ気味の日は
🧘Flow & Meditation（フローヨガと瞑想）
日15:00-16:00
アサナと瞑想が半分ずつ、無理なく動いて頭をリセット

💪週末いつもより動きたいなら
🧘Hatha for All（みんなのハタヨガ）
土9:00-10:15　運動量★★★★☆
呼吸と身体を整えて、チャレンジポーズに向います。ヨガの「楽しさ」を期待するならここ`,
  },
  "result_a2-3": {
    msg1: "運動経験あり、ヨガにはリラックスと回復を求めている方。\n無理せず、でもちゃんと動く——そのバランスを大事にできるクラスをご提案します🌿",
    msg2: `🧘Breathe & Reset（呼吸を深めるリセットヨガ）
火18:30-19:30　運動量★☆☆☆☆
呼吸を丁寧に使って、疲れた体をリセット

🧘Gentle Flow（やさしいフローヨガ）
水19:30-20:30　運動量★★☆☆☆
流れるように動きながら、心と体をほぐします

😮‍💨内側に向かいたい日は
🧘Flow & Meditation（フローヨガと瞑想）
日15:00-16:00
動いた後に静かに内側へ。頭と体のざわめきを鎮めたい日に`,
  },
  "result_a2-4": {
    msg1: "ヨガをもっと深めたいんですね！とっても素晴らしいです✨\nSVAHAでは単なるポーズの練習にとどまらず、身体の仕組みや哲学的背景も含めてヨガを探求できる環境を大切にしています。",
    msg2: `💪アサナにチャレンジしたい
🧘Hatha for All（みんなのハタヨガ）
土9:00-10:15　運動量★★★★☆
幅広いレベルに対応、チャレンジポーズも

🔬機能的な身体の使い方を落ち着いて学ぶなら基礎クラスもおすすめ
🧘Hatha Basic（ハタヨガ基礎）
日11:00-12:15　運動量★★★☆☆

🧘Hatha 101（ハタヨガ入門）
土11:00-12:00・木19:00-20:00（女性限定）
運動量★★☆☆☆
機能改善ワークを取り込んでいるので、アラインメントの原理を動きながら理解していけます

🧘瞑想・内観も経験したい
🧘Flow & Meditation（フローヨガと瞑想）
日15:00-16:00　運動量★☆☆☆☆
ヨガと瞑想が半々の構成。週替わりで色んな瞑想を経験します

📚ヨガの思想・哲学、背景にある脳科学などに興味がある方へ
定期的にコースやWSを準備しています。LINEや公式サイトをチェックしてお見逃しなく！`,
  },
  "result_b2-1": {
    msg1: "姿勢や身体の不調が気になっているんですね。\nヨガは続けるほどに身体の使い方が変わっていきます。まずは基礎から丁寧に取り組めるクラスをご提案します。",
    msg2: `🧘Hatha 101（ハタヨガ入門）
土11:00-12:00・木19:00-20:00（女性限定）
運動量★★☆☆☆
機能改善ワークを取り込んでいるので、姿勢改善の原理を動きながら理解できます

🧘Hatha Basic（ハタヨガ基礎）
日11:00-12:15　運動量★★★☆☆
101に慣れてきたら、こちらへステップアップも

🧘Gentle Flow（やさしいフローヨガ）
水19:30-20:30　運動量★★☆☆☆
無理なく流れるように動きながら、身体をほぐします`,
  },
  "result_b2-2": {
    msg1: "パフォーマンスアップは現代人の必須タスク。\n未経験でも適切な負荷をかけてあげれば、十分に効果を見込めます✨",
    msg2: `🧘Hatha 101（ハタヨガ入門）
土11:00-12:00・木19:00-20:00（女性限定）
運動量★★☆☆☆
機能改善ワークで身体の動かし方から見直します。まずここから！

🧘Flow & Meditation（フローヨガと瞑想）
日15:00-16:00　運動量★☆☆☆☆
集中力・内観を高めたい方に。101と組み合わせると効果的です

💪慣れてきたら
🧘Hatha Basic（ハタヨガ基礎）
日11:00-12:15　運動量★★★☆☆`,
  },
  "result_b2-3": {
    msg1: "リラックスと回復を大切にしたいんですね。\nSVAHAには無理なく続けられるクラスが揃っています🌿",
    msg2: `🧘Breathe & Reset（呼吸を深めるリセットヨガ）
火18:30-19:30　運動量★☆☆☆☆
呼吸を丁寧に使って、疲れた心身をリセット

🧘Gentle Flow（やさしいフローヨガ）
水19:30-20:30　運動量★★☆☆☆
無理なく気持ちよく動きたい日に

🧘Flow & Meditation（フローヨガと瞑想）
日15:00-16:00　運動量★☆☆☆☆
動いた後に静かに内側へ。頭と体のざわめきを鎮めたい日に`,
  },
  "result_b2-4": {
    msg1: "未経験からヨガを深めたいとは素晴らしい！\nSVAHAでは身体の仕組みや哲学的背景も含めてヨガを探求できる環境を大切にしています。まずは基礎からしっかり積み上げていきましょう。",
    msg2: `🧘Hatha 101（ハタヨガ入門）
土11:00-12:00・木19:00-20:00（女性限定）
運動量★★☆☆☆
アラインメントの原理を動きながら理解していけます。ここが全ての出発点です

＋内観・瞑想も経験したい方に
🧘Flow & Meditation（フローヨガと瞑想）
日15:00-16:00　運動量★☆☆☆☆

📚講師を目指している方へ
コースやWSの情報はLINEや公式サイトでお知らせしています。お見逃しなく！`,
  },
};

export default function App() {
  const [history, setHistory] = useState([]);
  const [current, setCurrent] = useState("q1");
  const [resultKey, setResultKey] = useState(null);

  const currentQ = questions.find((q) => q.id === current);
  const result = resultKey ? results[resultKey] : null;
  const stepNum = history.length + 1;
  const totalSteps = 2;

  const choose = (option) => {
    setHistory([...history, current]);
    if (option.next.startsWith("result_")) {
      setResultKey(option.next);
      setCurrent(null);
    } else {
      setCurrent(option.next);
    }
  };

  const back = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setCurrent(prev);
    setResultKey(null);
  };

  const reset = () => {
    setHistory([]);
    setCurrent("q1");
    setResultKey(null);
  };

  return (
    <div className="app">
      <header>
        <p className="studio">SVAHA YOGA</p>
        <h1>CLASS MATCHING</h1>
        <div className="line" />
      </header>

      <main>
        {!result && (
          <div className="progress">
            {[1, 2].map((n) => (
              <div key={n} className={`bar ${n <= stepNum ? "active" : ""}`} />
            ))}
          </div>
        )}

        {currentQ && (
          <div className="question">
            <p className="q-num">Q{stepNum}</p>
            <h2>{currentQ.text}</h2>
            {currentQ.sub && <p className="sub">{currentQ.sub}</p>}
            <div className="options">
              {currentQ.options.map((opt, i) => (
                <button key={i} onClick={() => choose(opt)} className="option-btn">
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {result && (
          <div className="result">
            <p className="result-label">YOUR CLASS</p>
            <div className="msg msg1">{result.msg1}</div>
            <div className="msg msg2">{result.msg2}</div>
            <a
              href="https://svaha-yoga.com"
              target="_blank"
              rel="noreferrer"
              className="cta-btn"
            >
              ご予約・お問い合わせはこちら
            </a>
          </div>
        )}

        <div className="nav">
          {history.length > 0 && !result && (
            <button onClick={back} className="nav-btn">← 前に戻る</button>
          )}
          {result && (
            <button onClick={reset} className="nav-btn">最初からやり直す</button>
          )}
        </div>
      </main>
    </div>
  );
}
