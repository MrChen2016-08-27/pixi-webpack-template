class UserRole{
  constructor() {

  }
  // 获得消耗品
  /**
   * [getConsumables 获得消耗品]
   * @param  {Object} roleModel            [获取角色]
   * @param  {Consumables Object} consumables     [当前消耗品模型]
   */
  getConsumables(roleModel, consumables) {
    // 改变角色当前属性
    consumables.attrs.forEach((attr, index) => {
      // 消耗品改变后的数值
      const value = roleModel[attr] + consumables.value[index];
      // 最大值max后首字母一般转为大写，如hp， 如果存在最大hp 则为 maxHp
      const maxValue = roleModel[`max${attr.substring(0, 1).toUpperCase()}${attr.substring(1)}`];
      console.log(maxValue);
      // 如果存在最大值限制 消耗品的增加量不能超过最大值， 除非消耗品增加的就是最大值限制
      if (maxValue && attr.indexOf('max') === -1) {
        if (value < maxValue) {
          roleModel[attr] = value;
        } else {
          roleModel[attr] = maxValue;
        }
      } else {
        roleModel[attr] = value;
      }
    });
    // 移除消耗品
    consumables.sprite.visible = false;
  }
}

export default UserRole;