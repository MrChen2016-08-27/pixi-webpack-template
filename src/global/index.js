// 预备资源列表
import resourceList from '@/resources/resourceList';
// 键盘控制
import keyBoard from './keyBoard';

const methods = {
  keyBoard,
  // 批量加载资源
  addResource(...names) {
    const loader = new PIXI.loaders.Loader();
    names.forEach((name) => {
      resourceList.some((obj) => {
        if (obj.name === name) {
          loader.add(name, obj.path);
          return true;
        }
        return false;
      });
    });
    return loader;
  },
  /**
   * [actionDirection 对一个 sprite 添加方向操作]
   * @param  {Object} sprite [一个 Sprite 对象， 必须]
   * @param  {Object} range [移动的范围限制， 可选, 默认限制范围可渲染区域]
   * @return {[]}        [无]
   */
  actionDirection(sprite, range = {}) {
    const left = keyBoard(37),
      up = keyBoard(38),
      right = keyBoard(39),
      down = keyBoard(40);

    game.ticker.add(() => {
      const maxX = range.endX || game.renderer.width - sprite.width;
      const minX = range.startX || 0;
      const maxY = range.endY || game.renderer.height - sprite.height;
      const minY = range.startY || 0;
      const isMoveX = (sprite.x === maxX && sprite.vx < 0) || (sprite.x === minX && sprite.vx > 0);
      const isMoveY = (sprite.y === maxY && sprite.vy < 0) || (sprite.y === minY && sprite.vy > 0);
      // x 范围控制
      if (sprite.x > maxX) {
        sprite.x = maxX;
      } else if (sprite.x < minX) {
        sprite.x = minX;
      } else if (isMoveX) {
        sprite.x += sprite.vx;
      }
      // y范围控制
      if (sprite.y > maxY) {
        sprite.y = maxY;
      } else if (sprite.y < minY) {
        sprite.y = minY;
      } else if (isMoveY) {
        sprite.y += sprite.vy;
      }
      // 按键控制
      if (left.isDown && sprite.x > minX) {
        sprite.x -= sprite.vx;
      }
      if (right.isDown && sprite.x < maxX) {
        sprite.x += sprite.vx;
      }
      if (up.isDown && sprite.y > minY) {
        sprite.y -= sprite.vy;
      }
      if (down.isDown && sprite.y < maxY) {
        sprite.y += sprite.vy;
      }
    });
  },
  // 碰撞检测
  hitTestRectangle(sprite1, sprite2) {
    const validateX = sprite2.x + sprite2.width > sprite1.x && sprite2.x < sprite1.x + sprite1.width;
    const validateY = sprite2.y + sprite2.height > sprite1.y && sprite2.y < sprite1.y + sprite1.height;
    if (validateX && validateY) {
      return true;
    }
    return false;
  },
};

window.$global = {
  methods,
};