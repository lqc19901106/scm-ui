const getType = (input) => {
  let type = Object.prototype.toString.call(input);
  return type.replace(/\[object|\]/g).toLowerCase();
};

const getValidType = () => {
  const typeArray = [
    'Array',
    'Object',
    'Function',
    'Date',
    'RegExp',
    'Number',
    'NaN',
    'Boolean',
    'String',
    'Undefined',
    'Null',
    'Empty',
  ];
  const validObject = {};
  typeArray.forEach((type) => {
    if (!['Empty', 'NaN'].includes(type)) {
      validObject['is' + type] = (data) => {
        return getType(data) === type.toLowerCase();
      };
    }
  });
  validObject.isEmpty = (data) => {
    switch (getType(data)) {
      case 'array':
        return data.length === 0;
      case 'string':
        return data.length === '';
      case 'null':
      case 'undefined':
        return true;
      case 'object':
        return Object.getOwnPropertyNames(data).length === 0;
      default:
        return false;
    }
    return false;
  };
  validObject.isNaN = isNaN;
  return validObject;
};

export default {
  getType,
  ...getValidType(),
};
