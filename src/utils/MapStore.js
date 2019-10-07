
var mapStore = null;

var setMap = function(map) {
    mapStore = map;
};

var getMap = function() {
    return mapStore;
};

export default {getMap: getMap, setMap: setMap}