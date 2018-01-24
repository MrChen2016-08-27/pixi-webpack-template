class Round{
  constructor(name) {
    this.loader = $global.methods.addResource(name);
    this.progressListener(this.loader);
  }
  progressListener(loader) {
    loader.on('progress', (loader, res) => {
      console.log(`加载中...${res.url} ${loader.progress}%`);
    });
  }
  /**
   * [rangeMove 在指定范围内移动]
   * @param  {Sprite对象} sprite   [用于改变对象的移动属性]
   * @param  {Object} range    [限制移动范围，startX 开始移动x坐标, startY 开始移动Y坐标, endX 结束移动x坐标, endY 结束移动y坐标]
   * @return {Object}          [返回被移动后的Sprite对象]
   */
  rangeMove(sprite, range) {
    let distanceX = sprite.vx || 1;
    let distanceY = sprite.vy || 1;
    const xStartValidate = sprite.x < range.startX && distanceX < 0;
    const xEndValidate = sprite.x > range.endX && distanceX > 0;
    const yStartValidate = sprite.y < range.startY && distanceY < 0;
    const yEndValidate = sprite.y > range.endY && distanceY > 0;
    if (xStartValidate || xEndValidate) {
      distanceX = -distanceX;
    }
    if (yStartValidate || yEndValidate) {
      distanceY = -distanceY;
    }
    sprite.x += distanceX;
    sprite.y += distanceY;
    sprite.vx = distanceX;
    sprite.vy = distanceY;
    return sprite;
  }
  // 加载主角色血量条
  loadHp(roleModel, container) {
    const hpHeight = 30;
    const maxHp = new PIXI.Graphics();
    const nowHP = new PIXI.Graphics();
    container.addChild(maxHp);
    container.addChild(nowHP);
    game.ticker.add(() => {
      maxHp.clear();
      nowHP.beginFill(0x66CCFF);
      maxHp.beginFill(0xA52A2A);
      nowHP.drawRect(0, 0, roleModel.hp, hpHeight);
      maxHp.drawRect(0, 0, roleModel.maxHp, hpHeight);
    });
  }
}

export default Round;