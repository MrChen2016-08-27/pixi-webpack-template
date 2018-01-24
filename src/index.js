import 'pixi.js/dist/pixi';
import '@/global';
import './css/layout.css';
import Round1 from './round/Round1.js';

// 创建一个 Application， Application 将使用 webGL 创建一个渲染器, 如果不可以，则使用画布
const app = new PIXI.Application({
  width: 512,
  height: 512,
  antialias: false,
  transparent: false,
  resolution: 1,
});

window.game = app;
document.body.appendChild(app.view);


// 第一关
const r = new Round1();


