/**
 * [keyBoard 按键操作]
 * @param  {Number} keyCode [按键对应码]
 * @return {Object}         [一个包含了按键状态及信息的对象]
 */
function keyBoard(keyCode) {
  const key = {};
  key.code = keyCode;
  key.keydown = null;
  key.keyup = null;
  key.isUp = true;
  key.isDown = false;
  key.handleDown = function handledown(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.keydown) {
        key.keydown();
      }
      key.isUp = false;
      key.isDown = true;
    }
    event.preventDefault();
  },
  key.handleUp = function handledown(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.keyup) {
        key.keyup();
      }
      key.isUp = true;
      key.isDown = false;
    }
    event.preventDefault();
  },
  window.addEventListener('keydown', key.handleDown.bind(key), false);
  window.addEventListener('keyup', key.handleUp.bind(key), false);
  return key;
}

export default keyBoard;
