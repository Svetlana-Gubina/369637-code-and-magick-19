'use strict';
(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var BAR_WIDTH = 40;
  var BAR_GAP = 50;
  var BAR_HEIGHT = 150;
  var HISTOGRAM_POSITION_Y = 90;
  var BAR_COLOR_HUE = 240;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };
  var drawMessage = function (ctx, message) {
    ctx.fillStyle = '#000000';
    ctx.font = '16px PT Mono';
    message.split('\n').forEach(function (line, i) {
      ctx.fillText(line, 120, 40 + 20 * i);
    });
  };
  var getMaxElement = function (arr) {
    var maxElement = arr[0];
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  };
  var setBarColor = function (ctx, name) {
    var barColor = 'hsl(' + BAR_COLOR_HUE + ',' + (25 + 70 * Math.random()) + '%,' + (85 + 10 * Math.random()) + '%)';
    var color = (name === 'Вы') ? 'rgba(255, 0, 0, 1)' : barColor;
    return color;
  };
  var drawHistogram = function (ctx, names, times) {
    var maxTime = Math.round(getMaxElement(times));
    for (var i = 0; i < names.length; i++) {
      ctx.fillStyle = '#000000';
      ctx.fillText(names[i], CLOUD_X + GAP * 3 + BAR_GAP * i + BAR_WIDTH * i, CLOUD_Y + CLOUD_HEIGHT - GAP * 2);
      var name = names[i];
      ctx.fillStyle = setBarColor(ctx, name);
      var time = Math.round(times[i]);
      ctx.fillRect(CLOUD_X + GAP * 3 + BAR_GAP * i + BAR_WIDTH * i, HISTOGRAM_POSITION_Y + HISTOGRAM_POSITION_Y * time / maxTime, BAR_WIDTH, BAR_HEIGHT - HISTOGRAM_POSITION_Y * time / maxTime);
      ctx.fillStyle = '#000000';
      ctx.fillText(time, CLOUD_X + GAP * 3 + BAR_GAP * i + BAR_WIDTH * i, BAR_HEIGHT + HISTOGRAM_POSITION_Y * time / maxTime - BAR_HEIGHT / 2);
    }
  };
  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');
    drawMessage(ctx, 'Ура вы победили!\nСписок результатов');
    drawHistogram(ctx, names, times);
  };
})();

