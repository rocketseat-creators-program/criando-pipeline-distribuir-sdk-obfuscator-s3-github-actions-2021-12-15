// MySDK().init()
function MySDK() {
  return {
    init: function () {
      return `MySDK works`
    },
    yourName: function (name) {
      return `works ${name}`
    },
  };
}

function initV2() {
  return "new init works";
}
