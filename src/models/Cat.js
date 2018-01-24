
class Cat{
  constructor(texture) {
    // 等级
    this.level = 1;
    // 生命值
    this.hp = 100;
    // 魔法值
    this.mp = 100;
    this.maxHp = 100;
    // sprite
    this.sprite = new PIXI.Sprite(texture['cat.png']);
  }
}

export default Cat;