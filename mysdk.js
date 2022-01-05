// MySDK().init()
function MySDK() {
  return {
    init: function () {
      console.log("MySDK works");
    },
    yourName: function (name) {
        console.log("MySDK works", name);
      },
  };
}

function initV2(){
    return "new init works"
}