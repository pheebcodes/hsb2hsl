import React, {useState} from 'react';
import ReactDOM from 'react-dom';

function random(min = 0, max = 1) {
  return Math.floor(Math.random() * (max - min) + min);
}

function hsb2hsl([h, s, b]) {
  s = s / 100;
  b = b / 100;

  const l = b / 2 * (2 - s);
  const s2 = l && l < 1 ? s * b / (l < 0.5 ? l * 2 : 2 - l * 2) : 0;
  return [h, Math.round(s2 * 100), Math.round(l * 100)];
}

function range(set) {
  return e => {
    const n = parseInt(e.target.value, 10);

    set(n);
  };
}

function text(set) {
  return e => {
    const v = e.target.value.trim();
    const [s] = v.match(/\d{1,3}/) || ['0'];
    const n = parseInt(s, 10);

    if (n < 361 && n >= 0) {
      set(n);
    }
  };
}

function copy(s) {
  return () => {
    navigator.clipboard.writeText(s);
  };
}

function App() {
  const [h, setH] = useState(random(0, 361));
  const [s, setS] = useState(random(25, 76));
  const [b, setB] = useState(random(25, 76));

  const hsl = hsb2hsl([h, s, b]);

  const hslString = `hsl(${hsl[0]}deg, ${hsl[1]}%, ${hsl[2]}%)`;

  return (
    <React.Fragment>
      <div>
        <div>
          <label htmlFor="hue">Hue
            <input type="range" name="hue" min="0" max="359" step="1" onChange={range(setH)} value={h} />
            <input type="text" onChange={text(setH)} value={h} />
          </label>
        </div>
        <div>
          <label htmlFor="saturation">Saturation
            <input type="range" name="saturation" min="0" max="100" step="1" onChange={range(setS)} value={s} />
            <input type="text" onChange={text(setS)} value={s} />
          </label>
        </div>
        <div>
          <label htmlFor="brightness">Brightness
            <input type="range" name="brightness" min="0" max="100" step="1" onChange={range(setB)} value={b} />
            <input type="text" onChange={text(setB)} value={b} />
          </label>
        </div>
        <p style={{cursor: 'pointer'}} onClick={copy(hslString)}><code>{hslString}</code> (Click to copy)</p>
      </div>
      <div style={{height: '100px', width: '100px', backgroundColor: hslString, marginLeft: '2rem'}}></div>
    </React.Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById('__react-root'));
