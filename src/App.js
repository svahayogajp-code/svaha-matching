import { useState } from "react";
import "./App.css";

const URLS = {
  hatha101: "https://www.svaha-yoga.com/service-page/101",
  hathaBasic: "https://www.svaha-yoga.com/service-page/basic",
  hathaForAll: "https://www.svaha-yoga.com/service-page/forall",
  flowMeditation: "https://www.svaha-yoga.com/service-page/meditation",
  gentleFlow: "https://www.svaha-yoga.com/service-page/gentleflow",
  breatheReset: "https://www.svaha-yoga.com/service-page/breathe-reset",
  groupLesson: "https://www.svaha-yoga.com/grouplesson",
  personal: "https://www.svaha-yoga.com/personal",
};

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

const ClassLink = ({ name, url }) => (
  <a href={url} target="_blank" rel="noreferrer" className="class-link">
    {name} →
  </a>
);

const results = {
  "result_a2-1": {
    msg1: `ヨガや運動経験があって「動きの質」と「心身の変化」に興味があるんですね！
これは最もハタヨガの本質に近い「動きを通じて心を整える」という思想に近しいチョイスですね👏
ハタヨガ系クラスがおすすめです！`,
    msg2: `SVAHAのハタヨガは解剖学や脳科学のエッセンスと機能改善ワークなども含めた現代的なものですが、同時に背後にあるヨガ哲学を大事にしています。

変化、質の向上には頻度も大事。まずは週１ペースを目指しましょう。とはいえ、無理は禁物。クラスを変えてコンディションに合わせるのも◎`,
    classes: [
      { label: "🧘Hatha Basic（ハタヨガ基礎）\n日11:00-12:15　運動量★★★☆☆", url: URLS.hathaBasic },
      { label: "🧘Hatha for All（みんなのハタヨガ）\n土9:00-10:15　運動量★★★★☆", url: URLS.hathaForAll },
    ],
    msg3: `😮‍💨ちょっとお疲れの日はこちらも`,
    classes2: [
      { label: "🧘Hatha 101（ハタヨガ入門）\n土11:00-12:00・木19:00-20:00（女性限定）\n運動量★★☆☆☆\n微細に身体を観察して動きやすさを作ります", url: URLS.hatha101 },
      { label: "🧘Flow & Meditation（フローヨガと瞑想）\n日15:00-16:00　運動量★☆☆☆☆\nアサナと瞑想が半分ずつなので、脳が疲れた、少しは動いておきたいそんな時にぴったりです", url: URLS.flowMeditation },
    ],
  },
  "result_a2-2": {
    msg1: `リセット願望がある多忙なあなたには以下のクラスがおすすめです。
体調や気分でクラスを使い分けるのが合っていそう🤔
自分のリズムを優先しながら、定期的に続けると心身の良い変化も感じやすくなります。`,
    classes: [
      { label: "🧘Hatha Basic（ハタヨガ基礎）\n日11:00-12:15　運動量★★★☆☆\nじっくり集中して動くならコレ！", url: URLS.hathaBasic },
      { label: "🧘Gentle Flow（やさしいフローヨガ）\n水19:30-20:30　運動量★★☆☆☆\n週の真ん中の夜、やりすぎたくないけど動きたいなら", url: URLS.gentleFlow },
    ],
    msg3: `😮‍💨お疲れ気味の日は`,
    classes2: [
      { label: "🧘Flow & Meditation（フローヨガと瞑想）\n日15:00-16:00\nアサナと瞑想が半分ずつ、無理なく動いて頭をリセット", url: URLS.flowMeditation },
    ],
    msg4: `💪週末いつもより動きたいなら`,
    classes3: [
      { label: "🧘Hatha for All（みんなのハタヨガ）\n土9:00-10:15　運動量★★★★☆\n呼吸と身体を整えて、チャレンジポーズに向います。ヨガの「楽しさ」を期待するならここ", url: URLS.hathaForAll },
    ],
  },
  "result_a2-3": {
    msg1: `運動経験あり、ヨガにはリラックスと回復を求めている方。
無理せず、でもちゃんと動く——そのバランスを大事にできるクラスをご提案します🌿
疲れ切る前に受講して、いつでもご機嫌で過ごしましょう。`,
    classes: [
      { label: "🧘Breathe & Reset（呼吸を深めるリセットヨガ）\n火18:30-19:30　運動量★☆☆☆☆\n呼吸を丁寧に使って、疲れた体をリセット", url: URLS.breatheReset },
      { label: "🧘Gentle Flow（やさしいフローヨガ）\n水19:30-20:30　運動量★★☆☆☆\n流れるように動きながら、心と体をほぐします", url: URLS.gentleFlow },
    ],
    msg3: `😮‍💨内側に向かいたい日は`,
    classes2: [
      { label: "🧘Flow & Meditation（フローヨガと瞑想）\n日15:00-16:00\n動いた後に静かに内側へ。頭と体のざわめきを鎮めたい日に", url: URLS.flowMeditation },
    ],
  },
  "result_a2-4": {
    msg1: `ヨガを深めるには質と量のバランスがとても大切。SVAHAでは単なるポーズの練習にとどまらず、身体の仕組みや哲学的背景も含めてヨガを探求できる環境を大切にしています。週1でも週2でも、自分なりの目標を持って続けることが一番の近道です。`,
    classes: [
      { label: "💪アサナにチャレンジしたい\n🧘Hatha for All（みんなのハタヨガ）\n土9:00-10:15　運動量★★★★☆\n幅広いレベルに対応、チャレンジポーズも", url: URLS.hathaForAll },
      { label: "🔬機能的な身体の使い方を学ぶなら\n🧘Hatha Basic（ハタヨガ基礎）\n日11:00-12:15　運動量★★★☆☆", url: URLS.hathaBasic },
      { label: "🧘Hatha 101（ハタヨガ入門）\n土11:00-12:00・木19:00-20:00（女性限定）\n運動量★★☆☆☆\n機能改善ワークを取り込んでいるので、アラインメントの原理を動きながら理解していけます", url: URLS.hatha101 },
      { label: "🧘瞑想・内観も経験したい\n🧘Flow & Meditation（フローヨガと瞑想）\n日15:00-16:00　運動量★☆☆☆☆\nヨガと瞑想が半々の構成。週替わりで色んな瞑想を経験します", url: URLS.flowMeditation },
    ],
    msg3: `📚ヨガの思想・哲学、背景にある脳科学などに興味がある方へ
定期的にコースやWSを準備しています。LINEや公式サイトをチェックしてお見逃しなく！`,
  },
  "result_b2-1": {
    msg1: `ヨガは続けるほどに身体の使い方が変わっていきます。まずは基礎から丁寧に取り組めるクラスをご提案します。週１〜２回を目安に続けていきましょう。`,
    classes: [
      { label: "🧘Hatha 101（ハタヨガ入門）\n土11:00-12:00・木19:00-20:00（女性限定）\n運動量★★☆☆☆\n機能改善ワークを取り込んでいるので、姿勢改善の原理を動きながら理解できます", url: URLS.hatha101 },
      { label: "🧘Hatha Basic（ハタヨガ基礎）\n日11:00-12:15　運動量★★★☆☆\n101に慣れてきたら、こちらへステップアップも", url: URLS.hathaBasic },
      { label: "🧘Gentle Flow（やさしいフローヨガ）\n水19:30-20:30　運動量★★☆☆☆\n無理なく流れるように動きながら、身体をほぐします", url: URLS.gentleFlow },
    ],
  },
  "result_b2-2": {
    msg1: `パフォーマンスアップは現代人の必須タスク。未経験でも適切な負荷をかけてあげれば十分に効果を見込めます。無理のない範囲で、でも定期的に行うのがおすすめです。`,
    classes: [
      { label: "🧘Hatha 101（ハタヨガ入門）\n土11:00-12:00・木19:00-20:00（女性限定）\n運動量★★☆☆☆\n機能改善ワークで身体の動かし方から見直します。まずここから！", url: URLS.hatha101 },
      { label: "🧘Flow & Meditation（フローヨガと瞑想）\n日15:00-16:00　運動量★☆☆☆☆\n集中力・内観を高めたい方に。101と組み合わせると効果的です", url: URLS.flowMeditation },
    ],
    msg3: `💪慣れてきたら`,
    classes2: [
      { label: "🧘Hatha Basic（ハタヨガ基礎）\n日11:00-12:15　運動量★★★☆☆", url: URLS.hathaBasic },
    ],
  },
  "result_b2-3": {
    msg1: `リラックスと回復はとても大切。SVAHAには無理なく続けられるクラスが揃っています🌿
心身が整ってくると、いつの間にか新しい自分に出会えることも。まずは自分のペースで続けてみてください。`,
    classes: [
      { label: "🧘Breathe & Reset（呼吸を深めるリセットヨガ）\n火18:30-19:30　運動量★☆☆☆☆\n呼吸を丁寧に使って、疲れた心身をリセット", url: URLS.breatheReset },
      { label: "🧘Gentle Flow（やさしいフローヨガ）\n水19:30-20:30　運動量★★☆☆☆\n無理なく気持ちよく動きたい日に", url: URLS.gentleFlow },
      { label: "🧘Flow & Meditation（フローヨガと瞑想）\n日15:00-16:00　運動量★☆☆☆☆\n動いた後に静かに内側へ。頭と体のざわめきを鎮めたい日に", url: URLS.flowMeditation },
    ],
  },
  "result_b2-4": {
    msg1: `未経験から講師を目指す人も増えています。SVAHAではヨガを探求できる環境を大切にしています。まずは基礎からしっかり積み上げるのが近道。週1から始めて、慣れたら月6回ほどに増やしても。積み重ねた分だけ、確実に深まります。`,
    classes: [
      { label: "🧘Hatha 101（ハタヨガ入門）\n土11:00-12:00・木19:00-20:00（女性限定）\n運動量★★☆☆☆\nアラインメントの原理を動きながら理解していけます。ここが全ての出発点です", url: URLS.hatha101 },
      { label: "＋内観・瞑想も経験したい方に\n🧘Flow & Meditation（フローヨガと瞑想）\n日15:00-16:00　運動量★☆☆☆☆", url: URLS.flowMeditation },
    ],
    msg3: `📚講師を目指している方へ
コースやWSの情報はLINEや公式サイトでお知らせしています。お見逃しなく！`,
  },
};

export default function App() {
  const [history, setHistory] = useState([]);
  const [current, setCurrent] = useState("q1");
  const [resultKey, setResultKey] = useState(null);
  const [hover, setHover] = useState(null);

  const currentQ = questions.find((q) => q.id === current);
  const result = resultKey ? results[resultKey] : null;
  const stepNum = history.length + 1;

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

  const ClassCards = ({ classes }) => (
    <div className="class-cards">
      {classes.map((c, i) => (
        <a key={i} href={c.url} target="_blank" rel="noreferrer" className="class-card">
          <span className="class-card-text">{c.label}</span>
          <span className="class-card-arrow">→</span>
        </a>
      ))}
    </div>
  );

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
                <button
                  key={i}
                  onClick={() => choose(opt)}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  className={`option-btn${hover === i ? " hovered" : ""}`}
                >
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

            {result.classes && <ClassCards classes={result.classes} />}
            {result.msg3 && <div className="msg msg3">{result.msg3}</div>}
            {result.classes2 && <ClassCards classes={result.classes2} />}
            {result.msg4 && <div className="msg msg3">{result.msg4}</div>}
            {result.classes3 && <ClassCards classes={result.classes3} />}

            <div className="cta-area">
              <a href={URLS.groupLesson} target="_blank" rel="noreferrer" className="cta-btn">
                グループレッスンのご予約はこちら
              </a>
              <a href={URLS.personal} target="_blank" rel="noreferrer" className="personal-link">
                パーソナルセッションについてはこちら
              </a>
            </div>
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
