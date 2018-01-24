import UserRoleControl from '@/control/UserRole';
import Cat from '@/models/Cat';
import Water from '@/models/Water';
import Round from '@/round/Round';

class Round1 extends Round{
  constructor() {
    super('round1');
    this.map = new PIXI.Container();
    this.userRoleControl = new UserRoleControl();
    // 关卡总共水资源集合
    this.waters = [];
    this.cat = null;
    this.player
    this.initRound();
    this.initGameLoopList();

  }
  initRound() {
    // 关卡资源加载完成后初始化事件
    this.loader.load((loaderer, resources) => {
      const { textures } = resources.round1;
      for (let i = 0; i < 3; i++) {
        this.initWater(textures);
      }
      this.initCat(textures);
      this.loadHp(this.cat, this.map);
      game.stage.addChild(this.map);
      this.runGameLoop();
    })
  }
  initGameLoopList() {
    const self = this;
    this.gameLoopList = {
      isGetWater: () => { self.isGetWater(self.cat) },
    };
  }
  initWater(texture) {
    const water = new Water(texture);
    const waterSprite = water.sprite;
    const x = (game.renderer.width - waterSprite.width) * Math.random();
    const y = (game.renderer.height - waterSprite.height) * Math.random();
    waterSprite.position.set(x, y);
    waterSprite.pivot.set(0.5, 0.5);
    // 添加到容器
    this.map.addChild(waterSprite);
    this.waters.push(water);
  }
  // 动态运行事件循环
  runGameLoop() {
    game.ticker.add(() => {
      for (let action in this.gameLoopList) {
        this.gameLoopList[action]();
      }
    });
  }
  initCat(texture) {
    this.cat = new Cat(texture);
    this.cat.hp = 10;
    const { sprite } = this.cat;
    const x = sprite.width;
    const y = game.renderer.height - sprite.height;
    sprite.position.set(x, y);
    sprite.pivot.set(0.5, 0.5);
    sprite.vx = 2;
    sprite.vy = 2;
    this.map.addChild(sprite);
    // 添加键盘方向控制
    $global.methods.actionDirection(sprite);
  }
  // 判断对象是否获得水瓶
  isGetWater(model) {
    if (!model) {
      return;
    }
    const { sprite } = model;
    this.waters.forEach((water, index) => {
      const isImpact = $global.methods.hitTestRectangle(sprite, water.sprite);
      if (isImpact) {
        this.userRoleControl.getConsumables(model, water);
        this.waters.splice(index, 1);
      }
    });
  }

};

export default Round1;

