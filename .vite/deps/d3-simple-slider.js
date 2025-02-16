import {
  axisBottom,
  axisLeft,
  axisRight,
  axisTop,
  dispatch_default,
  drag_default,
  linear2 as linear,
  max,
  min,
  quadOut,
  scan,
  select_default,
  src_exports,
  time
} from "./chunk-K7HBCA7D.js";

// node_modules/d3-simple-slider/src/d3-compat.js
var prop = "event";
function adaptListener(listener) {
  var isv6 = !(prop in src_exports);
  return function(a, b) {
    if (isv6) {
      listener.call(this, a, b);
    } else {
      listener.call(this, src_exports[prop], a);
    }
  };
}

// node_modules/d3-simple-slider/src/slider.js
var UPDATE_DURATION = 200;
var SLIDER_END_PADDING = 8;
var KEYBOARD_NUMBER_STEPS = 100;
var top = 1;
var right = 2;
var bottom = 3;
var left = 4;
function translateX(x) {
  return "translate(" + x + ",0)";
}
function translateY(y) {
  return "translate(0," + y + ")";
}
function slider(orientation, scale) {
  scale = typeof scale !== "undefined" ? scale.copy() : null;
  var value = [0];
  var defaultValue = [0];
  var domain = [0, 10];
  var width = 100;
  var height = 100;
  var displayValue = true;
  var handle = "M-5.5,-5.5v10l6,5.5l6,-5.5v-10z";
  var step = null;
  var tickValues = null;
  var tickPadding = 3;
  var marks = null;
  var tickFormat = null;
  var ticks = null;
  var displayFormat = null;
  var fill = null;
  var listeners = dispatch_default("onchange", "start", "end", "drag");
  var selection = null;
  var identityClamped = null;
  var handleIndex = null;
  var k = orientation === top || orientation === left ? -1 : 1;
  var j = orientation === left || orientation === right ? -1 : 1;
  var x = orientation === left || orientation === right ? "y" : "x";
  var y = orientation === left || orientation === right ? "x" : "y";
  var transformAlong = orientation === top || orientation === bottom ? translateX : translateY;
  var transformAcross = orientation === top || orientation === bottom ? translateY : translateX;
  var axisFunction = null;
  switch (orientation) {
    case top:
      axisFunction = axisTop;
      break;
    case right:
      axisFunction = axisRight;
      break;
    case bottom:
      axisFunction = axisBottom;
      break;
    case left:
      axisFunction = axisLeft;
      break;
  }
  var handleSelection = null;
  var fillSelection = null;
  var textSelection = null;
  if (scale) {
    domain = [min(scale.domain()), max(scale.domain())];
    if (orientation === top || orientation === bottom) {
      width = max(scale.range()) - min(scale.range());
    } else {
      height = max(scale.range()) - min(scale.range());
    }
    scale = scale.clamp(true);
  }
  function slider2(context) {
    selection = context.selection ? context.selection() : context;
    if (!scale) {
      scale = domain[0] instanceof Date ? time() : linear();
      scale = scale.domain(domain).range(
        orientation === top || orientation === bottom ? [0, width] : [height, 0]
      ).clamp(true);
    }
    identityClamped = linear().range(scale.range()).domain(scale.range()).clamp(true);
    value = value.map(function(d) {
      return linear().range(domain).domain(domain).clamp(true)(d);
    });
    tickFormat = tickFormat || scale.tickFormat();
    displayFormat = displayFormat || tickFormat || scale.tickFormat();
    var axis = selection.selectAll(".axis").data([null]);
    axis.enter().append("g").attr("transform", transformAcross(k * 7)).attr("class", "axis");
    var sliderSelection = selection.selectAll(".slider").data([null]);
    var sliderEnter = sliderSelection.enter().append("g").attr("class", "slider").attr(
      "cursor",
      orientation === top || orientation === bottom ? "ew-resize" : "ns-resize"
    ).call(
      drag_default().on("start", adaptListener(dragstarted)).on("drag", adaptListener(dragged)).on("end", adaptListener(dragended))
    );
    sliderEnter.append("line").attr("class", "track").attr(x + "1", scale.range()[0] - j * SLIDER_END_PADDING).attr("stroke", "#bbb").attr("stroke-width", 6).attr("stroke-linecap", "round");
    sliderEnter.append("line").attr("class", "track-inset").attr(x + "1", scale.range()[0] - j * SLIDER_END_PADDING).attr("stroke", "#eee").attr("stroke-width", 4).attr("stroke-linecap", "round");
    if (fill) {
      sliderEnter.append("line").attr("class", "track-fill").attr(
        x + "1",
        value.length === 1 ? scale.range()[0] - j * SLIDER_END_PADDING : scale(value[0])
      ).attr("stroke", fill).attr("stroke-width", 4).attr("stroke-linecap", "round");
    }
    sliderEnter.append("line").attr("class", "track-overlay").attr(x + "1", scale.range()[0] - j * SLIDER_END_PADDING).attr("stroke", "transparent").attr("stroke-width", 40).attr("stroke-linecap", "round").merge(sliderSelection.select(".track-overlay"));
    handleSelection = sliderEnter.selectAll(".parameter-value").data(
      value.map(function(d, i) {
        return { value: d, index: i };
      })
    );
    var handleEnter = handleSelection.enter().append("g").attr("class", "parameter-value").attr("transform", function(d) {
      return transformAlong(scale(d.value));
    }).attr("font-family", "sans-serif").attr(
      "text-anchor",
      orientation === right ? "start" : orientation === left ? "end" : "middle"
    );
    handleEnter.append("path").attr("transform", "rotate(" + (orientation + 1) * 90 + ")").attr("d", handle).attr("class", "handle").attr("aria-label", "handle").attr("aria-valuemax", domain[1]).attr("aria-valuemin", domain[0]).attr("aria-valuenow", function(d) {
      return d.value;
    }).attr(
      "aria-orientation",
      orientation === left || orientation === right ? "vertical" : "horizontal"
    ).attr("focusable", "true").attr("tabindex", 0).attr("fill", "white").attr("stroke", "#777").on(
      "keydown",
      adaptListener(function(event, datum) {
        var change = step || (domain[1] - domain[0]) / KEYBOARD_NUMBER_STEPS;
        var index = marks ? scan(
          marks.map(function(d) {
            return Math.abs(value[datum.index] - d);
          })
        ) : null;
        function newValue(adjustedValue) {
          return value.map(function(d, j2) {
            if (value.length === 2) {
              return j2 === datum.index ? datum.index === 0 ? Math.min(adjustedValue, alignedValue(value[1])) : Math.max(adjustedValue, alignedValue(value[0])) : d;
            } else {
              return j2 === datum.index ? adjustedValue : d;
            }
          });
        }
        switch (event.key) {
          case "ArrowLeft":
          case "ArrowDown":
            if (marks) {
              slider2.value(newValue(marks[Math.max(0, index - 1)]));
            } else {
              slider2.value(newValue(+value[datum.index] - change));
            }
            event.preventDefault();
            break;
          case "PageDown":
            if (marks) {
              slider2.value(newValue(marks[Math.max(0, index - 2)]));
            } else {
              slider2.value(newValue(+value[datum.index] - 2 * change));
            }
            event.preventDefault();
            break;
          case "ArrowRight":
          case "ArrowUp":
            if (marks) {
              slider2.value(
                newValue(marks[Math.min(marks.length - 1, index + 1)])
              );
            } else {
              slider2.value(newValue(+value[datum.index] + change));
            }
            event.preventDefault();
            break;
          case "PageUp":
            if (marks) {
              slider2.value(
                newValue(marks[Math.min(marks.length - 1, index + 2)])
              );
            } else {
              slider2.value(newValue(+value[datum.index] + 2 * change));
            }
            event.preventDefault();
            break;
          case "Home":
            slider2.value(newValue(domain[0]));
            event.preventDefault();
            break;
          case "End":
            slider2.value(newValue(domain[1]));
            event.preventDefault();
            break;
        }
      })
    );
    if (displayValue) {
      handleEnter.append("text").attr("font-size", 10).attr(y, k * (24 + tickPadding)).attr(
        "dy",
        orientation === top ? "0em" : orientation === bottom ? ".71em" : ".32em"
      ).attr("transform", value.length > 1 ? "translate(0,0)" : null).text(function(d, idx) {
        return displayFormat(value[idx]);
      });
    }
    context.select(".track").attr(x + "2", scale.range()[1] + j * SLIDER_END_PADDING);
    context.select(".track-inset").attr(x + "2", scale.range()[1] + j * SLIDER_END_PADDING);
    if (fill) {
      context.select(".track-fill").attr(x + "2", value.length === 1 ? scale(value[0]) : scale(value[1]));
    }
    context.select(".track-overlay").attr(x + "2", scale.range()[1] + j * SLIDER_END_PADDING);
    context.select(".axis").call(
      axisFunction(scale).tickFormat(tickFormat).ticks(ticks).tickValues(tickValues).tickPadding(tickPadding)
    );
    selection.select(".axis").select(".domain").remove();
    context.select(".axis").attr("transform", transformAcross(k * 7));
    context.selectAll(".axis text").attr("fill", "#aaa").attr(y, k * (17 + tickPadding)).attr(
      "dy",
      orientation === top ? "0em" : orientation === bottom ? ".71em" : ".32em"
    ).attr(
      "text-anchor",
      orientation === right ? "start" : orientation === left ? "end" : "middle"
    );
    context.selectAll(".axis line").attr("stroke", "#aaa");
    context.selectAll(".parameter-value").attr("transform", function(d) {
      return transformAlong(scale(d.value));
    });
    fadeTickText();
    function computeDragNewValue(pos) {
      var adjustedValue = alignedValue(scale.invert(pos));
      return value.map(function(d, i) {
        if (value.length === 2) {
          return i === handleIndex ? handleIndex === 0 ? Math.min(adjustedValue, alignedValue(value[1])) : Math.max(adjustedValue, alignedValue(value[0])) : d;
        } else {
          return i === handleIndex ? adjustedValue : d;
        }
      });
    }
    function dragstarted(event) {
      select_default(this).classed("active", true);
      var pos = identityClamped(
        orientation === bottom || orientation === top ? event.x : event.y
      );
      if (value[0] === domain[0] && value[1] === domain[0]) {
        handleIndex = 1;
      } else if (value[0] === domain[1] && value[1] === domain[1]) {
        handleIndex = 0;
      } else {
        handleIndex = scan(
          value.map(function(d) {
            return Math.abs(d - alignedValue(scale.invert(pos)));
          })
        );
      }
      var newValue = value.map(function(d, i) {
        return i === handleIndex ? alignedValue(scale.invert(pos)) : d;
      });
      updateHandle(newValue);
      listeners.call(
        "start",
        sliderSelection,
        newValue.length === 1 ? newValue[0] : newValue
      );
      updateValue(newValue, true);
    }
    function dragged(event) {
      var pos = identityClamped(
        orientation === bottom || orientation === top ? event.x : event.y
      );
      var newValue = computeDragNewValue(pos);
      updateHandle(newValue);
      listeners.call(
        "drag",
        sliderSelection,
        newValue.length === 1 ? newValue[0] : newValue
      );
      updateValue(newValue, true);
    }
    function dragended(event) {
      select_default(this).classed("active", false);
      var pos = identityClamped(
        orientation === bottom || orientation === top ? event.x : event.y
      );
      var newValue = computeDragNewValue(pos);
      updateHandle(newValue);
      listeners.call(
        "end",
        sliderSelection,
        newValue.length === 1 ? newValue[0] : newValue
      );
      updateValue(newValue, true);
      handleIndex = null;
    }
    textSelection = selection.selectAll(".parameter-value text");
    fillSelection = selection.select(".track-fill");
  }
  function fadeTickText() {
    if (selection) {
      if (displayValue) {
        var indices = [];
        value.forEach(function(val) {
          var distances = [];
          selection.selectAll(".axis .tick").each(function(d) {
            distances.push(Math.abs(d - val));
          });
          indices.push(scan(distances));
        });
        selection.selectAll(".axis .tick text").attr("opacity", function(d, i) {
          return ~indices.indexOf(i) ? 0 : 1;
        });
        if (textSelection && value.length > 1) {
          var rect;
          var shift;
          var pos = [];
          var size = [];
          textSelection.nodes().forEach(function(d, i) {
            rect = d.getBoundingClientRect();
            shift = d.getAttribute("transform").split(/[()]/)[1].split(",")[x === "x" ? 0 : 1];
            pos[i] = rect[x] - parseFloat(shift);
            size[i] = rect[x === "x" ? "width" : "height"];
          });
          if (x === "x") {
            shift = Math.max(0, (pos[0] + size[0] - pos[1]) / 2);
            textSelection.attr("transform", function(d, i) {
              return "translate(" + (i === 1 ? shift : -shift) + ",0)";
            });
          } else {
            shift = Math.max(0, (pos[1] + size[1] - pos[0]) / 2);
            textSelection.attr("transform", function(d, i) {
              return "translate(0," + (i === 1 ? -shift : shift) + ")";
            });
          }
        }
      }
    }
  }
  function alignedValue(newValue) {
    if (marks) {
      var index = scan(
        marks.map(function(d) {
          return Math.abs(newValue - d);
        })
      );
      return marks[index];
    }
    if (step) {
      var valueModStep = (newValue - domain[0]) % step;
      var alignValue = newValue - valueModStep;
      if (valueModStep * 2 > step) {
        alignValue += step;
      }
      return newValue instanceof Date ? new Date(alignValue) : alignValue;
    }
    return newValue;
  }
  function updateValue(newValue, notifyListener) {
    if (value[0] !== newValue[0] || value.length > 1 && value[1] !== newValue[1]) {
      value = newValue;
      if (notifyListener) {
        listeners.call(
          "onchange",
          slider2,
          newValue.length === 1 ? newValue[0] : newValue
        );
      }
      fadeTickText();
    }
  }
  function updateHandle(newValue, animate) {
    if (selection) {
      animate = typeof animate !== "undefined" ? animate : false;
      if (animate) {
        selection.selectAll(".parameter-value").data(
          newValue.map(function(d, i) {
            return { value: d, index: i };
          })
        ).transition().ease(quadOut).duration(UPDATE_DURATION).attr("transform", function(d) {
          return transformAlong(scale(d.value));
        }).select(".handle").attr("aria-valuenow", function(d) {
          return d.value;
        });
        if (fill) {
          fillSelection.transition().ease(quadOut).duration(UPDATE_DURATION).attr(
            x + "1",
            value.length === 1 ? scale.range()[0] - k * SLIDER_END_PADDING : scale(newValue[0])
          ).attr(
            x + "2",
            value.length === 1 ? scale(newValue[0]) : scale(newValue[1])
          );
        }
      } else {
        selection.selectAll(".parameter-value").data(
          newValue.map(function(d, i) {
            return { value: d, index: i };
          })
        ).attr("transform", function(d) {
          return transformAlong(scale(d.value));
        }).select(".handle").attr("aria-valuenow", function(d) {
          return d.value;
        });
        if (fill) {
          fillSelection.attr(
            x + "1",
            value.length === 1 ? scale.range()[0] - k * SLIDER_END_PADDING : scale(newValue[0])
          ).attr(
            x + "2",
            value.length === 1 ? scale(newValue[0]) : scale(newValue[1])
          );
        }
      }
      if (displayValue) {
        textSelection.text(function(d, idx) {
          return displayFormat(newValue[idx]);
        });
      }
    }
  }
  slider2.min = function(_) {
    if (!arguments.length) return domain[0];
    domain[0] = _;
    if (scale) {
      scale.domain(domain);
    }
    return slider2;
  };
  slider2.max = function(_) {
    if (!arguments.length) return domain[1];
    domain[1] = _;
    if (scale) {
      scale.domain(domain);
    }
    return slider2;
  };
  slider2.domain = function(_) {
    if (!arguments.length) return domain;
    domain = _;
    if (scale) {
      scale.domain(domain);
    }
    return slider2;
  };
  slider2.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    if (scale) {
      scale.range([scale.range()[0], scale.range()[0] + width]);
    }
    return slider2;
  };
  slider2.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    if (scale) {
      scale.range([scale.range()[0], scale.range()[0] + height]);
    }
    return slider2;
  };
  slider2.tickFormat = function(_) {
    if (!arguments.length) return tickFormat;
    tickFormat = _;
    return slider2;
  };
  slider2.displayFormat = function(_) {
    if (!arguments.length) return displayFormat;
    displayFormat = _;
    return slider2;
  };
  slider2.ticks = function(_) {
    if (!arguments.length) return ticks;
    ticks = _;
    return slider2;
  };
  slider2.value = function(_) {
    if (!arguments.length) {
      if (value.length === 1) {
        return value[0];
      }
      return value;
    }
    var toArray = Array.isArray(_) ? _ : [_];
    toArray.sort(function(a, b) {
      return a - b;
    });
    if (scale) {
      var pos = toArray.map(scale).map(identityClamped);
      var newValue = pos.map(scale.invert).map(alignedValue);
      updateHandle(newValue, true);
      updateValue(newValue, true);
    } else {
      value = toArray;
    }
    return slider2;
  };
  slider2.silentValue = function(_) {
    if (!arguments.length) {
      if (value.length === 1) {
        return value[0];
      }
      return value;
    }
    var toArray = Array.isArray(_) ? _ : [_];
    toArray.sort(function(a, b) {
      return a - b;
    });
    if (scale) {
      var pos = toArray.map(scale).map(identityClamped);
      var newValue = pos.map(scale.invert).map(alignedValue);
      updateHandle(newValue, false);
      updateValue(newValue, false);
    } else {
      value = toArray;
    }
    return slider2;
  };
  slider2.default = function(_) {
    if (!arguments.length) {
      if (defaultValue.length === 1) {
        return defaultValue[0];
      }
      return defaultValue;
    }
    var toArray = Array.isArray(_) ? _ : [_];
    toArray.sort(function(a, b) {
      return a - b;
    });
    defaultValue = toArray;
    value = toArray;
    return slider2;
  };
  slider2.step = function(_) {
    if (!arguments.length) return step;
    step = _;
    return slider2;
  };
  slider2.tickValues = function(_) {
    if (!arguments.length) return tickValues;
    tickValues = _;
    return slider2;
  };
  slider2.tickPadding = function(_) {
    if (!arguments.length) return tickPadding;
    tickPadding = _;
    return slider2;
  };
  slider2.marks = function(_) {
    if (!arguments.length) return marks;
    marks = _;
    return slider2;
  };
  slider2.handle = function(_) {
    if (!arguments.length) return handle;
    handle = _;
    return slider2;
  };
  slider2.displayValue = function(_) {
    if (!arguments.length) return displayValue;
    displayValue = _;
    return slider2;
  };
  slider2.fill = function(_) {
    if (!arguments.length) return fill;
    fill = _;
    return slider2;
  };
  slider2.on = function() {
    var value2 = listeners.on.apply(listeners, arguments);
    return value2 === listeners ? slider2 : value2;
  };
  return slider2;
}
function sliderHorizontal(scale) {
  return slider(bottom, scale);
}
function sliderVertical(scale) {
  return slider(left, scale);
}
function sliderTop(scale) {
  return slider(top, scale);
}
function sliderRight(scale) {
  return slider(right, scale);
}
function sliderBottom(scale) {
  return slider(bottom, scale);
}
function sliderLeft(scale) {
  return slider(left, scale);
}
export {
  sliderBottom,
  sliderHorizontal,
  sliderLeft,
  sliderRight,
  sliderTop,
  sliderVertical
};
//# sourceMappingURL=d3-simple-slider.js.map
