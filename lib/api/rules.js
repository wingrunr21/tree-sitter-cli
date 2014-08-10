function blank() {
  return {
    type: "BLANK"
  };
}

function keyword(value) {
  return {
    type: (value instanceof RegExp) ? "KEYPATTERN" : "KEYWORD",
    value: value
  };
}

function choice() {
  return {
    type: "CHOICE",
    members: normalizeList(arguments)
  };
}

function error(value) {
  return {
    type: "ERROR",
    value: value
  };
}

function pattern(value) {
  return {
    type: "PATTERN",
    value: value
  };
}

function repeat(rule) {
  return {
    type: "REPEAT",
    value: normalize(rule)
  };
}

function seq() {
  return {
    type: "SEQ",
    members: normalizeList(arguments)
  };
}

function string(value) {
  return {
    type: "STRING",
    value: value
  };
}

function sym(name) {
  return {
    type: "SYMBOL",
    name: name
  };
}

function token(value) {
  return {
    type: "TOKEN",
    value: value
  };
}

function optional(value) {
  return choice(value, blank());
}

function normalizeList(list) {
  var result = [];
  for (var i = 0; i < list.length; i++) {
    result.push(normalize(list[i]));
  }
  return result;
}

function normalize(value) {
  if (typeof value == "undefined")
    throw new Error("Undefined symbol");

  switch (value.constructor) {
  case String:
    return string(value);
  case RegExp:
    return pattern(value.toString().slice(1, -1));
  default:
    return value;
  }
};

module.exports = {
  blank: blank,
  choice: choice,
  error: error,
  keyword: keyword,
  normalize: normalize,
  optional: optional,
  repeat: repeat,
  seq: seq,
  sym: sym,
  token: token
};