import Consumables from './Consumables';
class Water extends Consumables{
  constructor(texture) {
    super();
    this.type = 'GainGoods';
    this.attrs = ['hp'];
    this.value = [40];
    this.sprite = new PIXI.Sprite(texture['water.png']);
  }
}

export default Water;